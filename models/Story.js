import mongoose, { mongo } from 'mongoose'

mongoose.connect('mongodb+srv://DEV:devanand@saaqi.hk5f3oi.mongodb.net/?retryWrites=true&w=majority&appName=Saaqi', { useNewUrlParser: true, useUnifiedTopology: true })

const storySchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    story: {
        type: String,
        required: true
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            createdAt: {
                type: Date,
                default: Date.now()
            }
        },
        
    ],
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

let Story;

try{
    Story = mongoose.model('Story')
}catch{
    Story = mongoose.model('Story', storySchema)
}

export default Story;