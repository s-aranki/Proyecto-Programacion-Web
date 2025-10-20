const jwt = require('jsonwebtoken');

function authRequired(req, res, next) {
  const h = req.headers.authorization || '';
  const token = h.startsWith('Bearer ') ? h.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'No token' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET); // { id, usuario, correo }
    next();
  } catch {
    res.status(401).json({ message: 'Token inválido' });
  }
}

module.exports = { authRequired };
