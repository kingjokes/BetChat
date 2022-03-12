const User = require('../config/userSchema')
const Post = require('../config/postSchema')


//add new user to db
const createUser = (userData)=>{
    const user = new User(userData)
    return user.save()


}

//find user using their email in db
const findUser=  (email)=>{
    return  User.findOne({email:email})
}

//fetch all post in order of created time
const posts =  ()=>{
   return  Post.find().sort({createdAt:-1})
}

//fetch user detail using id
const profile=  (id)=>{
    return  User.findById(id).then(result=>{
        //if a user is found
        if(result !== null){
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            return result;
        }

        return result //else return result

    })
}

//save new post
const newPost =  (userPost)=>{
    const post = new Post(userPost)
    return post.save()
}


module.exports = {
    createUser,
    findUser,
    posts,
    profile,
    newPost
}