const mongoose = require('mongoose')

//define user schema
const userSchema = new mongoose.Schema(
    {
        firstname: {
            type:String,
            required:true
        },
        lastname:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        phone:{
            type:String,
            required:true
        },
        interests:{
            type:[String],
            required:true
        },
        password:{
            type:String,
            required:true
        },

    },
    {
        timestamps:true
    }
)

//define user model
const User = mongoose.model('users',userSchema)


module.exports=User