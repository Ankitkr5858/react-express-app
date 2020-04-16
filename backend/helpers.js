const generateOTP = () => {
    return Math.random().toString().slice(2,7);
};

const generateReferralCode = () => {
    return Math.random().toString(36).substring(7);
};


module.exports = {generateOTP, generateReferralCode};
