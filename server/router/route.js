const express = require('express');
const router = express.Router();
const { userLogin, userRegistration, upload } = require("../controller/CRUD"); // Import upload middleware
const { Connection } = require("../controller/microservices/followservice")
const { createPost,uploadPost } = require('../controller/microservices/postservices');
const { restrictedToLoggedInUsers } = require('../middleware/auth');

// Apply Multer only to registration route
router.post("/register", upload.single("profileMedia"), userRegistration);


// Login route doesn't need file upload
router.post("/login", userLogin);

// router.post('/connection', Connection);

router.post('/media', restrictedToLoggedInUsers, uploadPost.single('postMedia'), createPost);

module.exports = router;