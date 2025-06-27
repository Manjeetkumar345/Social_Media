const mongoose = require("mongoose");

const useSchema = new mongoose.Schema({
    email: { type: String, required: true },
    username: { type: String, required: true },
    profile_name: { type: String },
    password: { type: String, required: true },
    profile_photo: { type: String },
    description: { type: String },
    follower: { type: Number, default: 0 },
    following: { type: Number, default: 0 },
}, { timestamps: true });

const postSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'user',
        index: true
    },
    caption: {
        type: String,
        trim: true,
    },
    hashtags: [{
        type: String,
        lowercase: true,
        trim: true
    }],
    media: {
        url: { type: String, required: true },
        type: {
            type: String,
            enum: ['image', 'video'],
            required: true
        }
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],

    comments: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
        text: String,
        createdAt: { type: Date, default: Date.now }
    }],

    // FIXED: Changed from array to single value
    engagementScore: {
        type: Number,
        default: 0
    }

}, { timestamps: true });

// Valid indexes (only one array field per compound index)
postSchema.index({ hashtags: 1, createdAt: -1 });
postSchema.index({ hashtags: 1, engagementScore: -1 });

postSchema.virtual('media_url').get(function() {
    return `/media/${this.media.url.replace(/\\/g, '/')}`;
});

const connectionSchema = new mongoose.Schema({
    follower:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'USER',
        required:true,
        index:true,
    },
    following:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'USER',
        required:true,
        index:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

connectionSchema.index({ follower:1, following:1},{unique:true})

const USER = mongoose.model('user',useSchema)
const POSTS = mongoose.model('posts',postSchema)
const CONNECT = mongoose.model('connect',connectionSchema)

module.exports = {
    USER,POSTS,CONNECT
}