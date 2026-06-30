// ── Protection par mot de passe — espace réservé (Vercel Edge Middleware) ──────
// S'exécute CÔTÉ SERVEUR à chaque requête, avant de servir le moindre fichier.
// Le site complet (noms + notes détaillées) n'est accessible qu'après saisie du
// mot de passe. Le mot de passe est lu depuis la variable d'environnement Vercel
// SITE_PASSWORD (jamais écrit dans le code). Si elle est absente, l'accès est
// refusé par défaut (« fail closed ») — aucune exposition possible par oubli.
//
// Le nom d'utilisateur n'est pas vérifié : les familles saisissent ce qu'elles
// veulent comme identifiant, seul le mot de passe (« le code ») compte.

export const config = {
  // S'applique à tout, sauf le favicon et les assets internes Vercel.
  matcher: '/((?!_vercel|favicon.png|favicon.ico).*)',
};

export default function middleware(request) {
  const PASS = process.env.SITE_PASSWORD;

  // Fail closed : pas de mot de passe configuré ⇒ tout est bloqué.
  if (!PASS) {
    return new Response(
      'Accès non configuré. Définir la variable SITE_PASSWORD dans Vercel.',
      { status: 503 }
    );
  }

  const header = request.headers.get('authorization') || '';
  const [scheme, encoded] = header.split(' ');

  if (scheme === 'Basic' && encoded) {
    let decoded = '';
    try { decoded = atob(encoded); } catch { decoded = ''; }
    const sep = decoded.indexOf(':');
    const password = sep >= 0 ? decoded.slice(sep + 1) : '';
    if (password === PASS) {
      return; // mot de passe correct → on laisse passer la requête
    }
  }

  return new Response('Authentification requise', {
    status: 401,
    headers: {
      'WWW-Authenticate':
        'Basic realm="Resultats LFJP Saly - espace reserve", charset="UTF-8"',
    },
  });
}
