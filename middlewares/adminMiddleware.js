const adminMiddleware = (req, res, next) => {
    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({ 
        error: 'Access denied. Admin rights required.' 
      });
    }
    next();
  };
  
  module.exports = adminMiddleware;