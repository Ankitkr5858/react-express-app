const User = require('../models/User');

class UserService {
    async create(email) {
        return User.create({email: email});
    }

    async findById(id) {
        return User.findById(id);
    }

    async findByEmail(email) {
        return User.findOne({email: email});
    }

    async findByOTP(otp) {
        return User.findOne({otp: otp});
    }

    async update(user, data) {
        for (const [key, value] of Object.entries(data)) {
            user[key] = value;
        }

        user.save();
    }
}

module.exports = new UserService();
