import mongoose from 'mongoose';
const { Schema } = mongoose;

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: false
    },
    userName: {
        type: String,
        required: true,
    },
    category: {
        type: Array,
        required: false
    },
},
    {
        timestamps: true
    }

);

const Post = mongoose.model("Post", postSchema)
export default Post; 


