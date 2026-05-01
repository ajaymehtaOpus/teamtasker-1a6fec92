const UserService = require('../services/user-registration-and-login.service');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Register a new user
exports.registerUser = async (req, res) => {
    const { email, password, role } = req.body;
    try {
        const user = await UserService.createUser({ email, password, role });
        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Log in a user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserService.findUserByEmail(email);
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, refreshToken });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};