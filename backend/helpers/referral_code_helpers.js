const generateReferralCode = () => {
    return Math.random().toString(36).substring(7);
};

module.exports = {generateReferralCode};
