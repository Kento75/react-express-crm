const express = require('express');
const validator = require('validator');
const passport = require('passport');

const router = new express.Router();

router.post('/signup', (req, res, next) => {
    const validationResult = validateSignupForm(req.body);

    if (!validationResult.success) {
        return res.status(400).json({
            status: 400,
            data: {
                errors: validationResult.errors
            },
            message: validationResult.message,
        });
    }
    
    return passport.authenticate('local-signup', (err, token, userData) => {
        if (err) {
            return res.status(409).json({
                status: 409,
                data: {},
                message: err
            });
        }
        return res.status(200).json({
            status: 200,
            data: {
                token,
                user: userData
            },
            message: 'You have successfully signed up!'
        });
    })(req, res, next);
});

router.post('/login', (req, res, next) => {
    const validationResult = validateLoginForm(req.body);
    if (!validationResult.success) {
        return res.status(400).json({
            status: 400,
            data: {
                errors: validationResult.errors
            },
            message: validationResult.message,
        });
    }
    return passport.authenticate('local-login', (err, token, userData) => {
        if (err) {
            return res.status(400).json({
                status: 400,
                data: {},
                message: err,
            });
        }
        
        return res.status(200).json({
            status: 200,
            data: {
                token,
                user: userData
            },
            message: 'You have successfully logged in!',
        });
    })(req, res, next);
});

function validateSignupForm(payload) {
    const errors = {};
    let isFormValid = true;
    let message = '';

    if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
        isFormValid = false;
        errors.email = 'Please provide a correct email address.';
    }

    if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 8) {
        isFormValid = false;
        errors.password = 'Password must have at least 8 characters.';
    }

    if (!isFormValid) {
        message = 'Check the form for errors.';
    }

    return {
        success: isFormValid,
        message,
        errors
    };
}

function validateLoginForm(payload) {
    const errors = {};
    let isFormValid = true;
    let message = '';

    if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email) || payload.email.trim().length === 0) {
        isFormValid = false;
        errors.email = 'Please enter your email address.';
    }

    if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
        isFormValid = false;
        errors.password = 'Please enter your password.';
    }

    if (!isFormValid) {
        message = 'Check the form for errors.';
    }

    return {
        success: isFormValid,
        message,
        errors
    };
}

module.exports = router;
