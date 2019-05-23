const userModel = require("../model/user");
//引入核心模块 加密
const crypto = require('crypto');
const utils = require("../utils/token")
const register = (req,res)=>{
    const {username,password} = req.body;
    //查用户名称是否存在
    userModel.findUser({username},(result)=>{
        if(result){
            res.json({
                state:false,
                info:"用户名存在"
            })
        }else{
            //创建sha256算法
            const hash = crypto.createHash('sha256');

            //需要加密的文件
            hash.update(password);

            //得到加密的文件
            //hash.digest('hex')

            userModel.saveUser({username,password:hash.digest('hex')},()=>{
                res.json({
                    state:true,
                    info:"注册成功"
                })
            })
        }
    })

}




const login = (req,res)=>{
    const {username,password} = req.body;
    userModel.findUser({username},(result)=>{
        if(result){
            //创建sha256算法
            const hash = crypto.createHash('sha256');

            //需要加密的文件
            hash.update(password);

            //得到加密的文件
            //hash.digest('hex')
            if(result.password == hash.digest('hex')){
                const token = utils.createToken({user:username},"1901")
                res.cookie("token",token);
                res.cookie("user",username);

                res.json({
                    state:true,
                    info:"登陆成功"
                })
            }else{
                res.json({
                    state:false,
                    info:"密码错误"
                })
            }
        }else{
            res.json({
                state:false,
                info:"用户名不存在"
            })
        }
    })

}




module.exports ={
    register,
    login
}



