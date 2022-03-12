const mongoose = require('mongoose')

//define post schema
const postSchema = new mongoose.Schema(
    {
        title: {
            type:String,
            required:true
        },
        body:{
            type:String,
            required:true
        },
        user_id:{
            type:String,
            required:true
        }

    },
    {
        timestamps:true
    }
)

//define post model
const Post = mongoose.model('posts',postSchema)

module.exports=Post