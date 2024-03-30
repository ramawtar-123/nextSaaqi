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
        required: false,
    },
    email: {
        type: String,
        unique: true,
        required: false,
    },
    password: {
        type: String,
        required: false,
    },
    confirmpassword: {
        type: String,
        required: false,
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
    stories: [
        {
            story: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Story',
            },
            createdAt: {
                type: Date,
                default: Date.now()
            }
        },
        
    ],
    followers: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
        }
    ],
    followings: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
