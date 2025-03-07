const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

const authentication = (req, res, next) => {
  // Check for authorization token in request header
  if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer")) {
    return res.status(401).json({ error: "Missing or invalid token" });
  }

  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(403).json({ error: "No token, authorization denied" });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token, authorization denied" });
    }
    req.user = user.id; // Attach user info to request object
    next(); // Proceed to the next middleware (userRole)
  });
};

const userRole = (roles = []) => {
  return async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try {
        token = req.headers.authorization.split(' ')[1]; // Extract token

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use JWT_SECRET from env
        const user = await User.findById(decoded.id);

        if (!user) {
          return res.status(401).json({ message: 'User not found' });
        }

        // Check if the user has one of the required roles
        if (!roles.includes(user.role)) {
          return res.status(403).json({ message: 'Access denied' });
        }

        req.user = user; // Attach user to request object
        next(); // Allow access to the next middleware or route handler
      } catch (err) {
        console.error(err);
        return res.status(401).json({ message: 'Not authorized, token failed' });
      }
    }

    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }
  };
};

module.exports = { authentication, userRole };
