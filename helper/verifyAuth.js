const jwt = require('jsonwebtoken')
const verifyAuth = (req, res, next)=> {
    if(!req.headers.authorization) {
        return res.status(401).send({message: "Unauthorized user, Token Required"})
    } else {
        jwt.verify(req.headers.authorization, process.env.JWT_SECRET_KEY, function(err, decoded){
            if(err)  {
                return res.status(403).send({message: "Access Forbidden"})
            }
            console.log(decoded, 'hai han')
            if (decoded.role === process.env.ROLE_ADMIN){
                next()
                console.log("hi hahaha")
            } else if (decoded.role === process.env.ROLE_USER){
                return res.status(403).send({message: "Access Forbidden"})
            } else{
                return res.status(403).send({message: "Access Forbidden"})
            }
        });
    }
}

module.exports = verifyAuth