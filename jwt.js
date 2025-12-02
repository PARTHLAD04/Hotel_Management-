const jwt = require('jsonwebtoken');

const jwtMiddleware = (req, res, next) => {

    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).json({ message: 'No token provided' });
    }

    // Get token from headers
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Verify token
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        console.error('JWT verification error:', error);
        res.status(401).json({ message: 'Invalid token' });
    }
}

// Function to generate JWT token
const generateToken = (user) => {
    return jwt.sign(user, process.env.JWT_SECRET);
}

module.exports = {jwtMiddleware,generateToken};