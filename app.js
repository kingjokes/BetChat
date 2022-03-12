const db = require("./config/dbConfig") //database config file
const userRoute = require('./routes/userRoutes')
const express = require('express')
const xss = require('xss-clean')
const cors = require('cors')
const bodyParser = require('body-parser')
const compression = require('compression')
require('dotenv').config()
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')
const app = express()
const port = process.env.PORT || 3000

app.use(cors()) // for cors permission
app.use(xss()) //prevents cross site scripting
app.use(compression()) //compressing api responses

app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json()) //parses request body as json
app.use(bodyParser.urlencoded({ extended: true })) //allows express post & delete requests

const swaggerOptions={
    swaggerDefinition:{
        components:{
            securitySchemes:{
                type: "apiKey",
                description: "API token to authorize requests.",
                name: "token" ,
                in: "header"
            }

        },
        // ADD THIS LINE!!!
        info:{
            title:'BetChat API',
            description:'BetChat API Information',
            version:'1.0.0',
            contact:{
                name:'Paul Jokotagba'
            },
            servers:["http://localhost:3000"]
        },

    },
    apis:["app.js",'./routes/*.js'],
    authAction :{ authentication: {name: "authentication", schema: {type: "apiKey", in: "header", name: "Authorization", description: ""}, value: "Bearer <JWT>"} }
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use('/api-docs', swaggerUI.serve,swaggerUI.setup(swaggerDocs))



app.get('/',(req,res)=>{
    res.send('Welcome 🙌')
})

app.use('/user',userRoute)

app.use('*',(req,res)=>{
    return res.status(404).send('Route not found')
})

//make a connection to database
db.then(response=>{
    app.listen(port, ()=>{
        console.log('connected')
    })
})


//Documentation using swagger UI
/**
 * @swagger
 *
 *
 * paths:
 *   /user/posts:
 *     get:
 *       security:
 *         - token: []
 *       summary: Gets all post by users
 *       responses:
 *         '200':    # status code
 *           description: A JSON array of user posts
 *           contents:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: boolean
 *                     example: true
 *                   posts:
 *                     type:array
 *
 *         '403': #status code
 *           description: Unauthorized access, user needs to log in to access this path
 *
 *         '500': #status code
 *           description: Internal server error
 *
 * /user/profile/{id}:
 *     get:
 *       summary: get user details by id
 *       security:
 *         - token: []
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: The ID of the user to return.
 *           schema:
 *             type: string
 *             minLength: 12
 *             maxLength: 12
 *             example: 622ca2822d11abb017ea291d
 *       responses:
 *         '200':    # status code
 *           description: User was found using id
 *           contents:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   user:
 *                     type: array
 *                     example: true
 *
 *
 *         '400': #status code
 *           description: User not found
 *
 *         '403': #status code
 *           description: Unauthorized access, user needs to log in to access this path
 *
 *         '500': #status code
 *           description: Internal server error
 *
 * /user/login:
 *     post:
 *       summary: end point to log user in
 *       consumes:
 *         - application/json
 *       parameters:
 *         - in: body
 *           name: user
 *           description: The user to log in.
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: pauljokotagba@gmail.com
 *               password:
 *                 type: string
 *                 example: 12345
 *
 *
 *       responses:
 *         '200':    # status code
 *           description: User logged successfully
 *           contents:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: boolean
 *                     example: true
 *                   message:
 *                     type: string
 *                     example: user logged in successfully
 *                   token:
 *                     type:string
 *         '400': #status code
 *           description: All input form are required
 *
 *         '401': #status code
 *           description: Invalid password supplied
 *
 *         '404': #status code
 *           description: User not found
 *
 *         '500': #status code
 *           description: Internal server error
 *
 * /user/register:
 *     post:
 *       summary: end point to register users
 *       consumes:
 *         - application/json
 *       parameters:
 *         - in: body
 *           name: userData
 *           description: The user to create.
 *           schema:
 *             type: object
 *             required:
 *               - firstname
 *               - lastname
 *               - phone
 *               - email
 *               - password
 *               - interests
 *
 *             properties:
 *               firstname:
 *                 type: string
 *                 example: John
 *
 *               lastname:
 *                 type: string
 *                 example: Doe
 *
 *               phone:
 *                 type: string
 *                 example: +2347036292257
 *
 *
 *               email:
 *                 type: string
 *                 example: johndoe@gmail.com
 *
 *               password:
 *                 type: string
 *                 example: 123456
 *
 *               interests:
 *                 type: string
 *                 example: Football, Sport
 *
 *
 *
 *       responses:
 *         '200':    # status code
 *           description: User created successfully
 *
 *         '201': #status code
 *           description: User created successfully
 *
 *
 *         '409': #status code
 *           description: User Already Exist
 *
 *         '500': #status code
 *           description: Internal server error
 *
 *
 * /user/new-post:
 *     post:
 *       security:
 *         - token: []
 *
 *       summary: end point for a user to submit a blog post
 *
 *       consumes:
 *         - application/json
 *       parameters:
 *         - in: body
 *           name: blogPost
 *           description: The blog post to create.
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - body
 *               - user_id
 *
 *
 *             properties:
 *               title:
 *                 type: string
 *                 example: My blog post
 *
 *
 *               body:
 *                 type: string
 *                 example: this is a good life for a blogger
 *
 *
 *               user_id:
 *                 type: string
 *                 example: 622ca2822d11abb017ea291d
 *
 *
 *
 *
 *
 *       responses:
 *         '200':    # status code
 *           description: User created successfully
 *
 *         '201': #status code
 *           description: User created successfully
 *
 *         '403': #status code
 *           description: Unauthorized access, user needs to log in to access this path
 *
 *         '500': #status code
 *           description: Internal server error
 *

 */
