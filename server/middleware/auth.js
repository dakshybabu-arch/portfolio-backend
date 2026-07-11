// Authentication middleware (placeholder for JWT implementation)
const auth = (req, res, next) => {
  // TODO: Implement JWT verification
  // const token = req.header('Authorization')?.replace('Bearer ', '');
  // if (!token) {
  //   return res.status(401).json({ success: false, error: 'No token provided' });
  // }
  // try {
  //   const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //   req.user = decoded;
  //   next();
  // } catch (error) {
  //   res.status(401).json({ success: false, error: 'Invalid token' });
  // }
  
  // For now, just pass through
  next();
};

module.exports = auth;
