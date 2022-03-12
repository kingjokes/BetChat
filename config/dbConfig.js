const mongoose = require('mongoose')
require('dotenv').config()

const password= process.env.DBPASS
const db= process.env.DBTABLE
const username = process.env.DBUSERNAME

const connect = async () => {
    try{

        await mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.ljkkl.mongodb.net/${db}?retryWrites=true&w=majority`).then(
            ()=>{
                return console.log("db connected")
            },
            err=>{
                return console.log(err)
            }
        )
    }catch (e){
        return console.log(e)
    }
}

module.exports= connect()