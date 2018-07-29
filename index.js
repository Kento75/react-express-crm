require('dotenv').config()

// Express setup
const   express = require('express'),
        path = require('path'),
        bodyParser = require('body-parser'),
        app = express();

app.use(express.static('./server/static/'));
app.use(express.static('./client/dist/'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Passport setup
const   passport = require('passport'),
        session = require('express-session'),
        localSignupStrategy = require('./server/passport/local-signup'),
        localLoginStrategy = require('./server/passport/local-login');

app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// Routes setup
const   authCheckMiddleware = require('./server/middleware/auth-check'),
        authRoutes = require('./server/routes/auth'),
        apiRoutes = require('./server/routes/api');

app.use('/api', authCheckMiddleware);
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

// Serve the React app to all requests
app.get('*', (req, res) => {
    res.sendFile((path.join(__dirname+'/server/static/index.html')));
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Server is running on port',port);
});

module.exports = app;
