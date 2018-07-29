const jwt = require('jsonwebtoken');
const models  = require('../../models/index');
const PassportLocalStrategy = require('passport-local').Strategy;

module.exports = new PassportLocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false,
    passReqToCallback: true
}, (req, email, password, done) => {
    const userData = {
        email: email.trim(),
        password: password.trim()
    };
    models.User.findOne({ where: { email: userData.email } }).then((user) => {
        if (!user || !user.validPassword(password)) {
            return done('Incorrect email or password');
        }
        const payload = {
            id: user.id
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        const data = {
            email: user.email
        };
        
        return done(null, token, data);
    });
});
