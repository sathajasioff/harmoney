const jwt = require('jsonwebtoken');

const adminAuth = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) return res.status(401).json({ error: 'Access Denied' });

  try {
    const verified = jwt.verify(token, 'secretKey');
    if (verified.role !== 'admin') return res.status(403).json({ error: 'Unauthorized' });

    req.admin = verified;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid Token' });
  }
};

module.exports = adminAuth;
