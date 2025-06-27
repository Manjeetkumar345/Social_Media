const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_TOKEN_KEY || "fallback_secret"


function setUser(user){
    return  jwt.sign({
        userId : user._id
    },SECRET_KEY,
    {expiresIn:'7d'});
}

function getUser(token){
    try{
        return jwt.verify(token,SECRET_KEY)
    }catch(error){
        return null;
    }
}

module.exports = {
    setUser,getUser,
}