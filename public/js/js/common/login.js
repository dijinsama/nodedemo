function Login(container){
    this.container=container;
    this.init();
}

Login.template=`
    <div class="sign-content">
        <div class="logo">
            <img src="img/logo.png" alt="千锋教育">
        </div>
        <form id="login-form">
            <div class="form-group">
                <label for="sign-login-username">用户名</label>
                <input type="text" class="form-control" id="sign-login-username" placeholder="请输入用户名">
            </div>
            <div class="form-group">
                <label for="sign-login-password">密码</label>
                <input type="password" class="form-control" id="sign-login-password" placeholder="请输入密码">
            </div>
            <p class="bg-info" id="toggle">立即注册</p>
            <button type="submit" class="btn btn-default sign-btn btn btn-primary">登陆</button>
        </form>
    </div>
`
Login.prototype={
    init:function(){
        this.create();
        this.toggleSign();
        this.loginClick();
    },
    create:function(){
        this.container.html("");
        this.el=$("<div></div>");
        this.el.append(Login.template);
        this.container.append(this.el);
    },
    toggleSign:function(){
        this.el.find("#toggle").on("click",this.handleToggleSignCb.bind(this))
    },
    handleToggleSignCb(){
        new Page().createContent(false);
    },
    loginClick:function(){
        this.el.find("#login-form").on("submit",this.handleLoginCb.bind(this))
    },
    handleLoginCb(e) {
        e.preventDefault();
        var username=this.el.find("#sign-login-username").val();
        var password=this.el.find("#sign-login-password").val();

        $.ajax({
            type:"post",
            url:"/users/login",
            data:{
                username,
                password
            },
            success:this.handleLoginSucc.bind(this)
        })
    },
    handleLoginSucc(data) {
        console.log(data);
        if(data.state){
            alert("登陆成功");
            location.href="http://localhost:3000/html/home.html";
            console.log(data);
        }else{
            alert("登陆失败");
        }
    }
};