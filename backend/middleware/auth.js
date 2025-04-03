const jwt = require('jsonwebtoken');


const adminAuth = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Access Denied: No Token Provided' });
  }

  try {
    const verified = await jwt.verify(token, process.env.JWT_SECRET || 'defaultSecretKey'); 

   
    if (verified.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized: Admin Access Required' });
    }

  
    req.admin = verified;
    next(); 
  } catch (err) {
   
    res.status(401).json({ error: 'Invalid or Expired Token' });
  }
};

module.exports = adminAuth;
