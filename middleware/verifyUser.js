const jwt = require('jsonwebtoken')

require('dotenv').config()

//token verify  middleware
const verifyToken = async (req, res, next)=>{
    const token = req.body.token || req.query.token || req.headers["x-access-token"];

    //return if  token header  is not found
    if(!token) {
        return res.status(403).send({
            status: false,
            message: 'Unauthorized access'
        })
    }

    //verify user token
    jwt.verify(
        token,
        process.env.USER_ACCESS_TOKEN,
        (err,decoded)=>{
            //invalid token found
            if(err) return res.status(401).send({
                status: false,
                message: 'Invalid Token'
            })
            //send user id  to the next request
            req.id = decoded.id
            next()
        }
    )




}


module.exports= verifyToken