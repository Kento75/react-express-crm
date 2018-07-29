/*

Auth check middleware
Returns 401 if unauthorized (no auth header or invalid token)
Returns next() if authorized and passes the user's information

*/

const jwt = require('jsonwebtoken');
const models  = require('../../models/index');

module.exports = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({status: 401, data: {}, message: 'Unauthorized.'});
    }

    const token = req.headers.authorization.split(' ')[1];

    return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) { return res.status(401).json({status: 401, data: {}, message: 'Unauthorized.'}); }

        const userId = decoded.id;

        return models.User.findById(userId).then(
            (user) => {
                res.locals.user = user;
                res.locals.token = token;
                return next();
            },
            () => {
                return res.status(401).json({status: 401, data: {}, message: 'Unauthorized.'});
            }
        );
    });
};
