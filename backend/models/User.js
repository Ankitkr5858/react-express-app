const mongoose = require('mongoose');
const {generateReferralCode} = require('../helpers/referral_code_helpers');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    referralCode: {
        type: String,
        required: true
    },
    invitedByReferralCode: {
        type: String
    },
    otp: {
        type: String
    }
});

userSchema.pre('validate', function(next) {
    if (this.isNew) this.referralCode = generateReferralCode();
    next();
});

module.exports = mongoose.model('user', userSchema);
