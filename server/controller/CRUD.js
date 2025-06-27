const { USER,CONNECT } = require('../model/database');
const bcrypt = require('bcryptjs');
const { setUser } = require("../services/auth");
const multer = require('multer');
const path = require('path');

// Configure storage properly
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  // Add trailing slash
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // uniquename + file Extension name 
    }
});



const upload = multer({ storage });


async function userLogin(req, res) {
    console.log("Login Start from server");
    try {
        const { username, password } = req.body;

        // 1. Trim and normalize input
        const normalizedUsername = username.trim();
        
        // 2. Validate input
        if (!normalizedUsername || !password) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        // 3. Find user with case-insensitive search
        const user = await USER.findOne({ 
            username: { $regex: new RegExp(`^${normalizedUsername}$`, 'i') } 
        });
        
        if (!user) {
            return res.status(401).json({ msg: "Invalid credentials" });
        }

        // 4. Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ msg: "Invalid credentials" });
        }

        // 5. Generate token
        const token = setUser(user);
        
        // 6. Set secure cookie
        res.cookie("uid", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7* 24 * 60 * 60 * 1000 // 1 day
        });
        
        // 7. Return user data to frontend
        return res.status(200).json({ 
            msg: "Login successful",
            user: {
                id:user._id,
                username: user.username,
                profileName: user.profile_name,
                profilePhoto: user.profile_photo? `/uploads/${user.profile_photo}`: null,
                description: user.description,
            }
        });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
}

async function userRegistration(req, res) {
    try {
        const { username, email, password, profileName, description } = req.body;
        const profileMedia = req.file;  

        // Validate required fields
        if (!username || !email || !password || !profileName) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        // Efficient duplicate check - both username and email
        const existingUser = await USER.findOne({ 
            $or: [{ username }, { email }] 
        });

        if (existingUser) {
            const field = existingUser.username === username ? 'username' : 'email';
            return res.status(409).json({
                field,
                msg: `${field === 'username' ? 'Username' : 'Email'} already exists`
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user with profile data
         // Create user
    const newUser = await USER.create({
      username,
      password: hashedPassword,
      email,
      profile_name: profileName,
      description,
      profile_photo: profileMedia ? profileMedia.filename : null
    });

    // Generate token for automatic login
    const token = setUser(newUser);
    
    // Set cookie for automatic login
    res.cookie("uid", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    // Return user data with profile photo URL
    return res.status(201).json({ 
      msg: "Registration successful",
      user: {
        id: newUser._id,
        username: newUser.username,
        profileName: newUser.profile_name,
        profilePhoto: newUser.profile_photo 
          ? `/uploads/${newUser.profile_photo}`
          : null,
        description: newUser.description
      }
    });

  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
}



module.exports = {
    userLogin,
    userRegistration,
    upload,
};