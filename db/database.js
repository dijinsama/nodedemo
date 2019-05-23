const mongoose= require("mongoose");
const db_url="mongodb://127.0.0.1:27017/xa1901";
//链接数据库
mongoose.connect(db_url);
//导出模块
module.exports={
    mongoose
}
//导出去之后在model层使用