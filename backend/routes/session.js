const express = require('express');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const SessionService = require('../services/SessionService');

const router = express.Router();

router.post('/login', asyncHandler(async (req, res, next) => {
    const user = await SessionService.login(req.body.email);
    return res.send(user);
}));

router.post('/otp', asyncHandler(async (req, res, next) => {
    const user = await SessionService.loginWithOTP(req.body.otp);
    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.send({accessToken});
}));

module.exports = router;
