const express = require('express')
const route = express.Router()
const userController = require('../controller/userController')
const verifyToken = require('../middleware/verifyUser')

route.post('/login', userController.login)
route.post('/register',userController.signup)
route.get('/posts',verifyToken,userController.getPosts)
route.get('/profile/:id',verifyToken,userController.getProfile)
route.post('/new-post',verifyToken,userController.submitPost)


module.exports=route

