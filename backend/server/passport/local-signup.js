require('dotenv').config()
const jwt = require('jsonwebtoken');
const models  = require('../../models/index');
const PassportLocalStrategy = require('passport-local').Strategy;

module.exports = new PassportLocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false,
    passReqToCallback: true
}, (req, email, password, done) => {
    models.User.findOne({ where: { email: email }}).then(user => {
        if (user) {
            return done('This email is already registered.');
        } else {
            const userData = {
                email: email.trim(),
                password: models.User.generateHash(password.trim()),
            };
            
            const newUser = models.User.build(userData);
            newUser.save().then(
                (user) => {
                    const payload = {
                        id: user.id
                    };
                    const token = jwt.sign(payload, process.env.JWT_SECRET);
                    const data = {
                        email: user.email
                    };
                    return done(null, token, data);
                },
                (err) => { return done(err); }
            );
        }
    });
});
