const UserModel = require('../models/user-registration-and-login.model');
const bcrypt = require('bcrypt');

// Create a new user
exports.createUser = async ({ email, password, role }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({ email, password: hashedPassword, role });
    return await user.save();
};

// Find user by email
exports.findUserByEmail = async (email) => {
    return await UserModel.findOne({ email });
};