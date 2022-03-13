# BetChat
 An api for a betchat web application
 <hr>
 
 <p>
  Simple RESTful API built with Node.js, MongoDB, and Express. The API handles user registration, loggin in, token authorization and blog post posting and reading 
 </p>
 <hr>
 
## Install

This is application can cloned directly or run the command

```sh
$ git clone https://github.com/kingjokes/BetChat.git
```

When Cloning is done, use the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```sh
$ npm install 
```
this is to install all dependencies

## Starting Application
 To start the application run the below command
 
 ```sh
 $ npm run serve
 
 ```
 ## Directory setup
  * config : folder containers the following files
    * dbConfig.js: mongodb setup
    * userSchema.js: mongodb schema for user
    * postSchema.js: mongodb blog post schema
  * controller: folder contains the following file
    * userController.js: contains all actions performed by user
  
  * middleware : folder containers the following files
    * verifyUser.js: handles token verification on authorized routes

  * models: folder contains the following file
    * user.js: contains all database query by user
 
  * routes: folder contains the following file
    * userRoutes.js: contains all user routes


## Demo
 The live demo link: [`BetChat`](https://betchatapp.herokuapp.com)
 <br>
 For api testing, click on the following [`Api Testing`](https://betchatapp.herokuapp.com/api-docs/)
 
