const jwt = require("jsonwebtoken");

const createToken = (tokenInfo,secret)=>{
   return jwt.sign(tokenInfo,secret, { expiresIn: 60 * 60 });
}


//从客户端获取到的cookie值   secret  
const tokenVerify = (token,secret,cb)=>{
    jwt.verify(token, secret,function(err, decoded) {
        cb(err);
    });
}


module.exports ={
    createToken,
    tokenVerify
}