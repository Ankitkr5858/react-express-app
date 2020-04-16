const mongoose = require('mongoose');
const {generateReferralCode} = require('../helpers');

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
    }, {
        toJSON: {
            virtuals: true
        }
    }
);

userSchema.pre('validate', function (next) {
    if (this.isNew) this.referralCode = generateReferralCode();
    next();
});

userSchema.virtual('isProfileComplete').get(function () {
    return (this.firstName !== undefined && this.lastName !== undefined);
});

module.exports = mongoose.model('user', userSchema);
