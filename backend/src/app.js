// create server 
const express = require('express');
// cookie-parser 
const cookieParser = require('cookie-parser');//  for saving tokens of user
const authRoutes = require('./routes/auth.routes');
const foodRoutes = require('./routes/food.routes');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
// small sanitizer to remove MongoDB operator keys from body/params
function sanitize(obj) {
    if (!obj || typeof obj !== 'object') return;
    for (const key of Object.keys(obj)) {
        if (key.startsWith('$') || key.includes('.')) {
            delete obj[key];
        } else {
            sanitize(obj[key]);
        }
    }
}

const app = express();

// Security middlewares
app.use(helmet());
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter);
// apply custom sanitizer to body and params (avoid touching req.query)
app.use((req, res, next) => {
    sanitize(req.body);
    sanitize(req.params);
    next();
});

app.use(cors({
    origin: 'http://localhost:5173',    
    credentials: true // Replace
})); 
// cross origin resource sharing is used for frontend and backend communication

// body parsing with limit
app.use(express.json({ limit: '10mb' }));

app.use(cookieParser());   // cookie parser is created in middleware
app.use('/api/auth',authRoutes);
app.use('/api/food',foodRoutes);



app.get("/",(req,res) =>  //api created here <<---
{
    res.send("Hello world");
})

// centralized error handler
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    if (err && err.name === 'MulterError') {
        return res.status(400).json({ message: err.message });
    }
    res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

module.exports = app;
