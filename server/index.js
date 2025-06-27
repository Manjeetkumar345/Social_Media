const express = require('express');
const app = express();
const PORT = 8000;
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
const authRoutes = require('./router/route');
const { restrictedToLoggedInUsers } = require("./middleware/auth");
const { USER  } = require("./model/database");

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/Social-Media')
.then(() => console.log('MongoDB Connected'))
.catch(error => console.error("MongoDB connection failed:", error));

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/uploads', express.static('uploads')); // Serve uploaded files
app.use('/media',express.static('media'))

// CORS configuration
app.use(cors({
    origin: 'http://localhost:5173', // Single origin is safer
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// server static file 

// Public API routes (login/register)
app.use("/api", authRoutes);


// Protected routes
app.use("/user/me", restrictedToLoggedInUsers, async (req,res)=>{
    try{
        const user = await USER.findById(req.userId)
        if(!user){
            res.clearCookie('uid');
            return res.status(404).json({msg:"User Not Found"})
        }

        return res.json({ user:{
            id: user._id,
            username: user.username,
            profileName: user.profile_name,
            profilePhoto: user.profile_photo  ? `/uploads/${user.profile_photo}` // Full path
            : null,
            description: user.description
        }});
    }catch(error){
        res.status(500).json({ msg: "Server error" });
    }
})

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack , "Error some where ");
    res.status(500).json({ msg: "Internal server error" });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});