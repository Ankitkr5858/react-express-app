var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
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
    }
});

module.exports = mongoose.model('user', userSchema);
