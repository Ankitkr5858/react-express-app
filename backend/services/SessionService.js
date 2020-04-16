const {generateOTP} = require('../helpers/otp_helpers');
const {AuthenticationError} = require('../errors');

const emailValidator = require('email-validator');
const User = require('../models/User');

class SessionService {
    async login(email) {
        if (!emailValidator.validate(email)) {
            throw new AuthenticationError('Email is invalid');
        }

        email = email.trim();
        let user = await User.findOne({email: email});

        if (!user) {
            user = await User.create({email: email});
        }

        this.sendOTP(user);
        return user;
    }

    async loginWithOTP(otp) {
        if (otp !== null && otp.trim() !== '') {
            const user = await User.findOne({otp: otp.trim()});
            if (!user) {
                throw new AuthenticationError('Invalid OTP');
            }
            user.otp = null;
            await user.save();
            return user;
        } else {
            throw new AuthenticationError('Please, provide OTP');
        }
    }

    async sendOTP(user) {
        user.otp = generateOTP();
        return await user.save((err) => {
            if (err) {
                throw err;
            }
            // TODO: send OTP
        })
    }
}

module.exports = new SessionService();
