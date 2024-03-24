import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/saaqi_db', { useNewUrlParser: true, useUnifiedTopology: true });


const UserSchema = new mongoose.Schema({
    fullname:  {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    confirmpassword: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String, 
        default: "https://images.unsplash.com/photo-1513569771920-c9e1d31714af?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    bio: {
        type: String,
        default: "I am a good person, right?"
    },
    likes: [
        {
            post: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Post',
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    posts:[
        {
            post: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Post',
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
        }
    ],
    followers: {
        type: Number,
        default: 0
    },
    followings: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
