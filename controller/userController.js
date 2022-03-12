const userModel = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//handles user login
const login = async (req,res)=>{
    try{
        //validate user input
        if(!(req.body.email && req.body.password)){
            return res.status(400).send({
                status:false,
                message:"All input are required"
            });
        }
        //find user using email
       await userModel.findUser(req.body.email).then(async result=> {
           //user not found
            if(result === null){
                return res.send({
                    status:false,
                    message:'User not found'
                }).status(404)
            }

            //if user is found, verify password
            let checker = await bcrypt.compare(req.body.password,result.password)

           //if password matches
           if(checker) {
               //create an access token for user
               const accessToken = jwt.sign(
                   {
                       id: result._id
                   },
                   process.env.USER_ACCESS_TOKEN,
                   {expiresIn: '2h'}
               )



               //return response with user token
               return res.send({
                   message: 'success',
                   status: true,
                   token: accessToken
               }).status(200)
           }

           //if password does not match
           return res.send({
               status:false,
               message:'Invalid password supplied'
           }).status(401)



        }).catch(e=>console.log(e.message))
    }catch (e) {

        return res.send({
            status:false,
            message:`An error has occurred: ${e}`
        }).status(500)
    }


}

//handles user registration
const signup = async (req,res)=>{


    try{

        //find user using email
      await  userModel.findUser(req.body.email).then(async result=>{
          //if user email already exist
          if(result !== null){
              return res.send({
                  status:false,
                  message:'User Already Exist. Please Login'
              }).status(409)
          }

          //if user email does not exist
          let hashedPassword = await bcrypt.hash(req.body.password,8) //hash user password
          await userModel.createUser({
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              email: req.body.email.toLowerCase(),
              phone: req.body.phone,
              interests: req.body.interests.split(','), //convert user selected interest to array
              password: hashedPassword,
          }).then(result=>{

              //generate an access token for user
              const token = jwt.sign(
                  {
                      id: result._id
                  },
                  process.env.USER_ACCESS_TOKEN,
                  {expiresIn: '2h'}
              )
              return res.send({
                  status:true,
                  message:'User created successfully',
                  token:token
              }).status(201)
          }).catch(e=>console.log(e.message))


      })
    } catch (e) {
        return res.send({
            status:false,
            message:`An error has occurred: ${e}`
        }).status(500)
    }

}

//fetch user profile data
const getProfile= async (req,res)=>{
    try{
        await userModel.profile(req.params.id).then(result=>{
            if(result===null){ //if user id does not exist
             return  res.send({
                    status:false,
                    message:"user not found"
                }).status(400)
            }
           return  res.status(200).send(result);
        }).catch(e=>console.log(e))
    }catch (e) {
        return res.send({
            status:false,
            message:`An error has occurred: ${e}`
        }).status(500)
    }

}

//get all post
const getPosts = async (req,res)=>{
    try{
        await userModel.posts().then(result=>{
            return res.send({
                status:true,
                posts:result
            }).status(200)
        }).catch(e=>console.log(e))
    }catch(e){
        return res.send({
            status:false,
            message:`An error has occurred: ${e}`
        }).status(500)
    }


}

//submit a new post
const submitPost = async(req,res)=>{

    try{
        await userModel.newPost({
            title:req.body.title,
            body:req.body.body,
            user_id:req.id,
        }).then(result=>{
            return res.send({
                status:true,
                message:"Post created successfully"
            }).status(201)
        }).catch(e=>console.log(e))
    }catch (e) {
        return res.send({
            status:false,
            message:`An error has occurred: ${e}`
        }).status(500)
    }
}

module.exports={
    login,
    signup,
    getProfile,
    getPosts,
    submitPost
}