const { getUser } = require('../services/auth');

function restrictedToLoggedInUsers(req, res, next) {
    // 1. Get token from cookies
    
    const token = req.cookies.uid;
    
    if (!token) {
        return res.status(401).json({ msg: "Unauthorized - No token provided" });
    }

    // 2. Verify token
    const payload = getUser(token);
    
    if (!payload) {
        return res.status(401).json({ msg: "Unauthorized - Invalid token" });
    }

    // 3. Attach user to request
    req.userId = payload.userId;
    next();
}

module.exports = {
    restrictedToLoggedInUsers
};