var express = require('express');
var router = express.Router();
var jobControl = require("../control/job")

//引入multer模块
var multer  = require('multer');

//文件上传的配置项
var storage = multer.diskStorage({
    //当文件上传完毕以后存储在服务器的那个位置
    destination: function (req, file, cb) {
        cb(null, './public/img')
    },
    //文件上传后的文件名称
    filename: function (req, file, cb) {
        cb(null,  Date.now()+"-"+file.originalname)
    }
})

var upload = multer({ storage: storage })
//限定当前的key值能够上传多少张图片
var cpUpload = upload.fields([{ name: 'jobLogo', maxCount: 1 }])


//添加职位
router.post('/addjob', cpUpload,jobControl.addjob);

//查
router.get('/jobList',jobControl.jobList);

//删
router.get('/Jobdelete',jobControl.Jobdelete);

//改
router.post('/updateJob', cpUpload,jobControl.updateJob);
module.exports = router;