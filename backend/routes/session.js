const express = require('express');
const asyncHandler = require('express-async-handler');

const SessionService = require('../services/SessionService');

const router = express.Router();

router.post('/login', asyncHandler(async (req, res, next) => {
    const user = await SessionService.login(req.body.email);
    return res.send(user);
}));

router.post('/otp', asyncHandler(async (req, res, next) => {
    const user = await SessionService.loginWithOTP(req.body.otp);
    return res.send(user);
}));

module.exports = router;
