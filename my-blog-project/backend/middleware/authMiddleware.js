const jwt = require('jsonwebtoken');
const User = require('../models/user');

const protect = async (req, res, next) => {
    let token;

    // Header mein token check karo
    if (req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')) {
        
        try {
            // Token extract karo "Bearer <token>" se
            token = req.headers.authorization.split(' ')[1];

            // Token verify karo
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // User database se dhundo aur req mein attach karo
            req.user = await User.findById(decoded.id).select('-password');

            next(); // Aage jaane do

        } catch (error) {
            res.status(401).json({ message: 'Token galat hai, access nahi milega' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Token nahi hai, access nahi milega' });
    }
};

module.exports = { protect };