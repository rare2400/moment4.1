const jwt = require("jsonwebtoken");


//validate token
function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == 0) return res.status(401).json({ error: "No token provided" });

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, username) => {
        if (err) return res.status(403).json({ error: "Invalid token" });

        req.username = username;
        next();
    });
}

module.exports = authenticateToken;