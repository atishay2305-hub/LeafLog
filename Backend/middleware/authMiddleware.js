const jwt = require('jsonwebtoken');
const Cookies = require('js-cookie');

const authMiddleware = (secret) => (req, res, next) => {
    const token = Cookies.get('token');

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = authMiddleware;
