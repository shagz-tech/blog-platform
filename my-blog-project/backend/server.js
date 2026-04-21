const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db'); // 1. DB function import karein

dotenv.config();

// 2. Database connect karein
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Backend API is running successfully with DB!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
// ... existing imports
const userRoutes = require('./routes/userRoutes');

// ... existing code (after app.use(express.json()))
app.use('/api/users', userRoutes);

const { protect } = require('./middleware/authMiddleware');

// Protected test route
app.get('/api/protected', protect, (req, res) => {
    res.json({ 
        message: 'Yeh protected route hai!',
        user: req.user.name 
    });
});