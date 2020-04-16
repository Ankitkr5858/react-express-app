const {ServiceError} = require('../errors');

const User = require('../models/User');

/**
 * Service for all logic, relates to User model.
 *
 * @class UserService
 * @constructor
 */
class UserService {
    /**
     * Creates user with a given email
     * @param {string} email - user email.
     * @return {mongoose.Model}
     */
    async create(email) {
        return User.create({email: email});
    }

    /**
     * Finds user by database ID
     * @param {string} id - database ID.
     * @return {mongoose.Model}
     */
    async findById(id) {
        return User.findById(id);
    }

    /**
     * Finds user by email
     * @param {string} email
     * @return {mongoose.Model}
     */
    async findByEmail(email) {
        return User.findOne({email: email});
    }

    /**
     * Finds user by OTP code
     * @param {string} otp - user's OTP code
     * @return {mongoose.Model}
     */
    async findByOTP(otp) {
        return User.findOne({otp: otp});
    }

    /**
     * Finds user by referral code
     * @param {string} code - referral code
     * @return {mongoose.Model}
     */
    async findByReferralCode(code) {
        return User.findOne({referralCode: code});
    }

    /**
     * Updates user with new attributes
     * @param {mongoose.Model} user.
     * @param {object} data - new user attributes
     * @return {mongoose.Model}
     */
    async update(user, data) {
        if (data.invitedByReferralCode && data.invitedByReferralCode !== '') {
            const inviter = await this.findByReferralCode(data.invitedByReferralCode.trim());
            if (!inviter) {
                throw new ServiceError('Invalid referral code');
            }
        }

        for (const [key, value] of Object.entries(data)) {
            user[key] = value;
        }

        user.save();
    }
}

module.exports = new UserService();
