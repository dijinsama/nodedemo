var express = require('express');
var router = express.Router();
var con= require("../control/user");

// /* GET home page. */   访问register.js
// /* GET home page. */   访问register.js
router.post('/register',con.register);
router.post('/login',con.login);
// 这段业务逻辑层需要通过control层自己写所以不需要
//     function(req, res, next) {
//   res.render('index', { title: 'Express' });
// }

module.exports = router;
