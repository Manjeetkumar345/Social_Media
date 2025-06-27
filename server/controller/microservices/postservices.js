const {USER,POSTS} = require('../../model/database');
const mongoose = require('mongoose');
const crypto = require('crypto');
const fs = require('fs')
const multer  = require('multer');
const  path  = require('path');

// Construct encryted  filename
const generateHashedFileName = (file) =>{
    const hash = crypto.createHash('sha256');  // (Secure Hash Algorithm 256-bit) is a cryptographic hash
    hash.update(Date.now() + file.originalname);
    return hash.digest('hex')+ path.extname(file.originalname) // Produces the hash output as a hexadecimal string (a common format for representing hash values).
}

// Create A directory 

const ensureDirectoryExists = (dirPath) =>{
    if(!fs.existsSync(dirPath)) fs.mkdirSync(dirPath,{ recursive: true}); 
}

//Configure Storage Proparly 

const storage = multer.diskStorage({

    // destination assign
    destination:(req,file,cb)=> {

        // Get the userID for the dir 
        const userId = req.userId.toString(); 

        const useDir = path.join('media','users',userId);

        const subDir = file.filename ==='status' ? 'status' :'posts';

        const finalDir = path.join(useDir,subDir);

        ensureDirectoryExists(finalDir);

        cb(null,finalDir);
    },
    filename:(req,file,cb)=>{
        cb(null,generateHashedFileName(file))
    }
    
},console.log('multer storage'));

// upload in the storage

const uploadPost = multer({
    storage,
    limits:{fileSize: 25 * 1024* 1024 }  // 25 MB  limit
})

async function createPost(req,res) {
    try{
        const {caption,hashtags} = req.body;
        const mediaFile = req.file; 

        console.log(caption, hashtags ,"IN the backend");

        if(!mediaFile) return res.status(400).json({msg:"No file Uploaded"})
        
          // Create the URL path (matches schema)
        const mediaUrl = path.join(
            'users',
            req.userId.toString(),
            'posts',
            mediaFile.filename
        ).replace(/\\/g, '/');

        // FIXED: Match the schema structure
        await POSTS.create({
            userId: req.userId,
            caption,
            hashtags: JSON.parse(hashtags),
            media: {
                url: mediaUrl,  // Use 'url' field as defined in schema
                type: mediaFile.mimetype.startsWith('image') ? 'image' : 'video'
            }
        });

        return res.status(200).json({msg:"Uploaded"})

    }catch (error) {
        console.error('Error in createPost:', error);
        // Cleanup uploaded file on error
        if (req.file) fs.unlinkSync(req.file.path);
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createPost,uploadPost
}