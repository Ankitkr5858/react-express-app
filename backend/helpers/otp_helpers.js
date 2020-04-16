const generateOTP = () => {
    return Math.random().toString().slice(2,7);
};

module.exports = {generateOTP};
