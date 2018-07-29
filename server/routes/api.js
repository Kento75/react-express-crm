const express = require('express');
const router = new express.Router();

router.get('/protected', (req, res) => {
    res.status(200).json({
        status: 200,
        data: {
              secretMessage: "This is a secret message from the API."
        },
        message: {},
    });
});

router.get('/me', (req, res) => {
    res.status(200).json({
        status: 200,
        data: {
            token: res.locals.token,
            user: {
                email: res.locals.user.email
            }
        },
        message: {},
    });
});

module.exports = router;
