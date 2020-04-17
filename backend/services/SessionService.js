const jwt = require('jsonwebtoken');
const {generateOTP} = require('../helpers');
const {AuthenticationError} = require('../errors');

const emailValidator = require('email-validator');

const UserService = require('./UserService');
const EmailService = require('./EmailService');

/**
 * Service for all authentication logic.
 *
 * @class SessionService
 * @constructor
 */
class SessionService {
    /**
     * Initiates login process
     * @param {string} email - user email.
     * @return {mongoose.Model}
     */
    async login(email) {
        if (!emailValidator.validate(email)) {
            throw new AuthenticationError('Email is invalid');
        }

        email = email.trim();
        let user = await UserService.findByEmail(email);

        if (!user) {
            user = await UserService.create(email);
        }

        this._sendOTP(user);
        return user;
    }

    /**
     * Returns user access token if OTP code is correct and it matches email
     * @param {string} email
     * @param {string} otp
     * @return {string} access token
     */
    async loginWithOTP(email, otp) {
        if (!otp || otp === '') {
            throw new AuthenticationError('Please, provide OTP');
        }

        if (!email || email === '') {
            throw new AuthenticationError('Please, provide email address');
        }

        const user = await UserService.findByEmailAndOTP(email.trim(), otp.trim());
        if (!user) {
            throw new AuthenticationError('Invalid OTP');
        }
        await UserService.update(user, {otp: null});
        return jwt.sign({userId: user._id}, process.env.JWT_SECRET);
    }

    /**
     * Generates OTP code for user and sends it in an email
     * @param {mongoose.Model} user.
     * @return {mongoose.Model}
     */
    async _sendOTP(user) {
        await UserService.update(user, {otp: generateOTP()});
        EmailService.otp(user);
        return user;
    }
}

module.exports = new SessionService();
