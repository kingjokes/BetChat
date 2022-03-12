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

Cloning is done using the
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
    * dbConfig: mongodb setup
    * userSchema: mongodb schema for user
    * postSchema: mongodb blog post schema
  * controller: folder contains the following file
    * userController: contains all actions performed by user
  
  * middleware : folder containers the following files
    * verifyUser: handles token verification on authorized routes

  * models: folder contains the following file
    * user: contains all database query by user
 
  * routes: folder contains the following file
    * userRoutes: contains all user routes


## Demo
 The live demo link: [`BetChat`](https://betchatapp.herokuapp.com)
 <br>
 For api testing, click on the following [`Api Testing`](https://betchatapp.herokuapp.com/api-docs/)
 
