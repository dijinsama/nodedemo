const path = require("path");
const jobModel = require("../model/job");
const Cookie = require("../utils/getCookie");
const JwtToken = require("../utils/token");
const addjob = (req,res)=>{
    const {jobName,jobPrice,jobAsk,companyName} = req.body;
    const jobLogo = req.files.jobLogo[0].path;
    const url = "http://127.0.0.1:3000/img/"+path.parse(jobLogo).base;

    //获取客户端的cookie
    const token = Cookie.getCookie(req,"token");

    //token校验
    JwtToken.tokenVerify(token,"1901",function(err){
        if(err){
            //没有登录
            res.json({
                state:false,
                info:"token过期,请重新登录"
            })
        }else{
            jobModel.jobSave({jobName,jobPrice,jobAsk,companyName,jobLogo:url},()=>{
                res.json({
                    state:true,
                    info:"添加成功"
                })
            })
        }
    })

}

const jobList = (req,res)=>{

    //获取客户端的cookie
    const token = Cookie.getCookie(req,"token");

    //token的校验
    JwtToken.tokenVerify(token,"1901",function(err){
        if(!err){
            jobModel.jobFind((data)=>{
                res.json({
                    state:true,
                    data,
                    info:"OK"
                })
            })
        }

    })
}

const Jobdelete = (req,res)=>{
    const {id} = req.query;

    //获取客户端的cookie
    const token = Cookie.getCookie(req,"token");
    //token的校验
    JwtToken.tokenVerify(token,"1901",function(err){
        if(!err){
            jobModel.jobDelete({_id:id},()=>{
                res.json({
                    state:true,
                    info:"删除成功"
                })
            })
        }

    })

}


const updateJob = (req,res)=>{
    const {jobName,jobPrice,jobAsk,companyName,id} = req.body;
    const jobLogo = req.files.jobLogo[0].path;
    const url = "http://127.0.0.1:3000/img/"+path.parse(jobLogo).base;


    //获取客户端的cookie
    const token = Cookie.getCookie(req,"token");

    //token的校验
    JwtToken.tokenVerify(token,"1901",function(err){
        if(!err){
            jobModel.jobModify({_id:id},{jobName,jobPrice,jobAsk,companyName,jobLogo:url},(result)=>{
                if(result.ok){
                    res.json({
                        state:true,
                        info:"修改成功"
                    })
                }
            })
        }
    })


}

module.exports = {
    addjob,
    jobList,
    Jobdelete,
    updateJob
}