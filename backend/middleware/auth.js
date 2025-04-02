const jwt = require('jsonwebtoken');

// Admin authentication middleware
const adminAuth = async (req, res, next) => {
  const token = req.header('Authorization');

  // Check if token is provided
  if (!token) {
    return res.status(401).json({ error: 'Access Denied: No Token Provided' });
  }

  try {
    // Verify token with secret key from environment variable
    const verified = await jwt.verify(token, process.env.JWT_SECRET || 'defaultSecretKey'); // Use environment variable for secret key

    // Check if the user has the 'admin' role
    if (verified.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized: Admin Access Required' });
    }

    // Attach admin information to request object
    req.admin = verified;
    next();  // Continue to the next middleware or route handler
  } catch (err) {
    // If there's an error during token verification
    res.status(401).json({ error: 'Invalid or Expired Token' });
  }
};

module.exports = adminAuth;
