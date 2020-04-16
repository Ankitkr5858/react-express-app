const express = require('express');
const asyncHandler = require('express-async-handler');

const UserService = require('../services/UserService');

const router = express.Router();

router.get('/profile', asyncHandler(async (req, res, next) => {
    const user = await UserService.findById(req.user.userId);
    return res.send(user);
}));

router.patch('/profile', asyncHandler(async (req, res, next) => {
    const user = await UserService.findById(req.user.userId);
    const payload = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        invitedByReferralCode: req.body.invitedByReferralCode
    };
    await UserService.update(user, payload);
    return res.send(user);
}));

module.exports = router;
