// Serveur du site du Tennessee Bowling (version de départ)
const http = require('node:http');

const PORT = process.env.PORT || 3000;

const serveur = http.createServer((req, res) => {
  // Contrôle de santé : Docker, le pipeline et la supervision s'en servent pour savoir si le site est vivant
  if (req.url === '/api/sante') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ statut: 'ok', version: process.env.VERSION || 'dev' }));
  }

  // Page d'accueil provisoire
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    return res.end('<h1>Tennessee Bowling</h1><p>Site en construction.</p>');
  }

  // Toute autre adresse : page introuvable
  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Page introuvable');
});

serveur.listen(PORT, () => console.log(`Serveur lancé sur http://localhost:${PORT}`));

// Arrêt propre quand Docker arrête le conteneur
process.on('SIGTERM', () => serveur.close(() => process.exit(0)));
