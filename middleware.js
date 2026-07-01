// ── Accès réservé via connexion Google @lfjpsaly.org (Vercel Edge Middleware) ──
// S'exécute CÔTÉ SERVEUR avant de servir le moindre fichier. Le site complet
// (noms + notes détaillées) n'est accessible qu'après connexion avec un compte
// Google du domaine de l'école. Aucun mot de passe à diffuser, accès traçable.
//
// Variables d'environnement Vercel requises (jamais écrites dans le code) :
//   GOOGLE_CLIENT_ID     — identifiant OAuth créé dans Google Cloud Console
//   GOOGLE_CLIENT_SECRET — secret associé
//   SESSION_SECRET       — clé aléatoire pour signer le cookie de session
// Si l'une manque, l'accès est refusé par défaut (« fail closed »).

const ALLOWED_DOMAIN = 'lfjpsaly.org';
const SESSION_TTL_MS = 8 * 60 * 60 * 1000;   // 8 heures
const STATE_TTL_MS = 10 * 60 * 1000;          // 10 minutes
const SESSION_COOKIE = '__lfjp_session';
const STATE_COOKIE = '__lfjp_oauth_state';

export const config = {
  matcher: '/((?!_vercel|favicon.png|favicon.ico).*)',
};

export default async function middleware(request) {
  const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
  const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
  const SECRET = process.env.SESSION_SECRET;

  if (!CLIENT_ID || !CLIENT_SECRET || !SECRET) {
    return new Response(
      'Accès non configuré (GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET / SESSION_SECRET).',
      { status: 503 },
    );
  }

  const url = new URL(request.url);
  const cookies = parseCookies(request.headers.get('cookie'));
  const redirectUri = `${url.origin}/__auth/callback`;

  // ── Déconnexion ─────────────────────────────────────────────────────────────
  if (url.pathname === '/__auth/logout') {
    return redirectWithCookies(url.origin + '/', [clearCookie(SESSION_COOKIE)]);
  }

  // ── Démarrage de la connexion ───────────────────────────────────────────────
  if (url.pathname === '/__auth/login') {
    const returnTo = sanitizePath(url.searchParams.get('returnTo'));
    const state = await sign(JSON.stringify({ returnTo, exp: Date.now() + STATE_TTL_MS }), SECRET);
    const auth = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    auth.searchParams.set('client_id', CLIENT_ID);
    auth.searchParams.set('redirect_uri', redirectUri);
    auth.searchParams.set('response_type', 'code');
    auth.searchParams.set('scope', 'openid email');
    auth.searchParams.set('hd', ALLOWED_DOMAIN);          // n'invite que le domaine de l'école
    auth.searchParams.set('prompt', 'select_account');
    auth.searchParams.set('state', state);
    return redirectWithCookies(auth.toString(), [
      setCookie(STATE_COOKIE, state, STATE_TTL_MS / 1000),
    ]);
  }

  // ── Retour de Google ────────────────────────────────────────────────────────
  if (url.pathname === '/__auth/callback') {
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    if (!code || !state || state !== cookies[STATE_COOKIE] || !(await verify(state, SECRET))) {
      return deny('Connexion invalide ou expirée. Réessayez.');
    }
    let returnTo = '/';
    try {
      const parsed = JSON.parse(await unsignToString(state, SECRET));
      if (parsed.exp > Date.now()) returnTo = sanitizePath(parsed.returnTo);
    } catch { /* défaut '/' */ }

    // Échange du code contre les jetons (canal serveur ↔ Google, en TLS).
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });
    if (!tokenRes.ok) return deny('Échec de l\'échange avec Google.');
    const tokens = await tokenRes.json();
    const claims = decodeJwtPayload(tokens.id_token);
    if (!claims) return deny('Jeton Google illisible.');

    const emailLower = typeof claims.email === 'string' ? claims.email.toLowerCase() : '';
    const emailVerified = claims.email_verified === true;

    // Récupération et parsing des emails personnels autorisés
    const personalEmailsStr = process.env.ALLOWED_PERSONAL_EMAILS || '';
    const personalEmails = new Set(
      personalEmailsStr
        .split(',')
        .map(e => e.trim().toLowerCase())
        .filter(Boolean)
    );

    const isOrgEmail = emailLower.endsWith('@' + ALLOWED_DOMAIN) && claims.hd === ALLOWED_DOMAIN;
    const isAllowedPersonalEmail = personalEmails.has(emailLower);

    const userAuthorized = emailVerified && (isOrgEmail || isAllowedPersonalEmail);
    const audOk = claims.aud === CLIENT_ID;
    const notExpired = typeof claims.exp === 'number' && claims.exp * 1000 > Date.now();

    if (!(userAuthorized && audOk && notExpired)) {
      return deny(`Accès réservé aux comptes @${ALLOWED_DOMAIN} ou adresses autorisées.`, 403);
    }

    const session = await sign(JSON.stringify({ email: claims.email, exp: Date.now() + SESSION_TTL_MS }), SECRET);
    return redirectWithCookies(url.origin + returnTo, [
      setCookie(SESSION_COOKIE, session, SESSION_TTL_MS / 1000),
      clearCookie(STATE_COOKIE),
    ]);
  }

  // ── Toute autre requête : exiger une session valide ─────────────────────────
  const session = cookies[SESSION_COOKIE];
  if (session && (await verify(session, SECRET))) {
    try {
      const data = JSON.parse(await unsignToString(session, SECRET));
      if (data.exp > Date.now()) return; // session valide → on laisse passer
    } catch { /* session illisible → reconnexion */ }
  }

  // Pas de session : rediriger vers la connexion Google (en mémorisant la page).
  return Response.redirect(
    `${url.origin}/__auth/login?returnTo=${encodeURIComponent(url.pathname + url.search)}`,
    302,
  );
}

// ── Outils ────────────────────────────────────────────────────────────────────

function parseCookies(header) {
  const out = {};
  if (!header) return out;
  for (const part of header.split(';')) {
    const i = part.indexOf('=');
    if (i < 0) continue;
    out[part.slice(0, i).trim()] = part.slice(i + 1).trim();
  }
  return out;
}

function setCookie(name, value, maxAgeSec) {
  return `${name}=${value}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${Math.floor(maxAgeSec)}`;
}
function clearCookie(name) {
  return `${name}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`;
}

function redirectWithCookies(location, cookieStrings) {
  const headers = new Headers({ Location: location });
  for (const c of cookieStrings) headers.append('Set-Cookie', c);
  return new Response(null, { status: 302, headers });
}

function deny(message, status = 400) {
  return new Response(message, { status, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}

function sanitizePath(p) {
  // N'accepte qu'un chemin relatif interne (évite les redirections ouvertes).
  if (!p || typeof p !== 'string' || !p.startsWith('/') || p.startsWith('//')) return '/';
  return p;
}

// Signature : valeur => "<payloadB64url>.<hmacB64url>"
async function sign(payloadStr, secret) {
  const payload = b64urlEncode(payloadStr);
  const sig = await hmac(payload, secret);
  return `${payload}.${sig}`;
}
async function verify(token, secret) {
  const [payload, sig] = (token || '').split('.');
  if (!payload || !sig) return false;
  const expected = await hmac(payload, secret);
  return timingSafeEqual(sig, expected);
}
async function unsignToString(token, secret) {
  const [payload] = token.split('.');
  return b64urlDecodeToString(payload);
}

async function hmac(data, secret) {
  const key = await crypto.subtle.importKey(
    'raw', new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data));
  return b64urlEncode(String.fromCharCode(...new Uint8Array(sig)));
}

function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function b64urlEncode(str) {
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
function b64urlDecodeToString(s) {
  s = s.replace(/-/g, '+').replace(/_/g, '/');
  while (s.length % 4) s += '=';
  return atob(s);
}

function decodeJwtPayload(jwt) {
  if (!jwt || typeof jwt !== 'string') return null;
  const parts = jwt.split('.');
  if (parts.length < 2) return null;
  try { return JSON.parse(b64urlDecodeToString(parts[1])); } catch { return null; }
}
