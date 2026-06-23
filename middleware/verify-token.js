const jwt = require("jsonwebtoken");
const {decode} = require("jsonwebtoken");





module.exports = (req, res, next) => {

    const token =
        req.headers.authorization?.split(" ")[1] ||
        req.headers["x-access-token"] ||
        req.query.token ||
        req.body.accessToken;

    if (!token) {
        return res.status(401).json({
            status: false,
            message: "No token provided."
        });
    }

    jwt.verify(token, req.app.get('JWT_SECRET'), (err, decoded) => {

        if (err) {
            return res.status(401).json({
                status: false,
                message: "Failed Authenticate."
            });
        }

        req.decoded = decoded;
        next();
    });
};