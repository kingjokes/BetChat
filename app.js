const db = require("./config/dbConfig") //database config file
const userRoute = require('./routes/userRoutes')
const express = require('express')
const xss = require('xss-clean')
const cors = require('cors')
const bodyParser = require('body-parser')
const compression = require('compression')
require('dotenv').config()
const app = express()


app.use(cors()) // for cors permission
app.use(xss()) //prevents cross site scripting
app.use(compression()) //compressing api responses

app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json()) //parses request body as json
app.use(bodyParser.urlencoded({ extended: true })) //allows express post & delete requests


app.get('/',(req,res)=>{
    res.send('Welcome 🙌')
})

app.use('/user',userRoute)

app.use('*',(req,res)=>{
    return res.status(404).send('Route not found')
})

//make a connection to database
db.then(response=>{
    app.listen(process.env.PORT, ()=>{
        console.log('connected')
    })
})



