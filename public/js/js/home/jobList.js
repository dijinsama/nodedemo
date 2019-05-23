function JobList(container){
    this.container = container;
}


JobList.prototype = {
    init:function(){
        this.createPage()
        this.modifyJobClick();
    },
    createPage:function(){
        $.ajax({
            type:"get",
            url:"/job/jobList",
            success:this.handleCreatePageCb.bind(this)
        })
    },
    handleCreatePageCb(data){
        var str = "";
        for(var i=0;i<data.data.length;i++){
            str+=`<div class="list_job">
            <div class="job_des">
                 <div class="job_name">${data.data[i].jobName}</div>
                 <div class="job_price">${data.data[i].jobPrice}</div>
                 <div class="job_ex">${data.data[i].jobAsk}</div>
            </div>
            <div class="com_des">
                <div class="company_logo">
                    <img src="${data.data[i].jobLogo}"/>
                </div>
                <div class="company_name">${data.data[i].companyName}</div>
            </div>
            <div class="operation" data-id="${data.data[i]._id}">
                <button class="btn btn-danger job_delete">删除</button>
                <button class="btn btn-info job_model" data-toggle="modal" data-target="#jobModel">修改</button>
            </div>
         </div>`
        }

        this.container.html(str);
        this.jobDelete();
        this.model()
    },
    jobDelete:function(){
        $(".job_delete").on("click",this.deleteCb.bind(this))
    },
    deleteCb(e){
        var id = $(e.target).parent().attr("data-id");

        $.ajax({
            type:"get",
            url:"/job/Jobdelete",
            data:{
                id
            },
            success:this.handleDeleteSucc.bind(this)
        })
    },
    handleDeleteSucc(data){
        if(data.state){
            alert("删除成功");
            this.createPage()
        };
    },
    model:function(){
        $(".job_model").on("click",this.handleModelCb.bind(this))
    },
    handleModelCb(e){
        var id = $(e.target).parent().attr("data-id");
        var parentNode = $(e.target).parent().parent();

        var jobName = parentNode.find(".job_name").text();
        var jobPrice = parentNode.find(".job_price").text();
        var jobAsk = parentNode.find(".job_ex").text();
        var companyName = parentNode.find(".company_name").text();


        

        $("#job_modify_name").val(jobName);
        $("#job_modify_price").val(jobPrice);
        $("#job_modify_ask").val(jobAsk);
        $("#company_modify_name").val(companyName);
        $("#modifyJob").attr("data-id",id);

    },
    modifyJobClick:function(){
        $("#modify_btn").on("click",this.modifyCb.bind(this))
    },
    modifyCb(){
        var jobName = $("#job_modify_name");
        var jobPrice =  $("#job_modify_price");
        var jobAsk =$("#job_modify_ask");
        var companyName = $("#company_modify_name");
        var jobLogo = $("#logo_modify");
        var modifyJob = $("#modifyJob");

        //如何ajax模拟form表单

        var formData = new FormData();
         formData.append("jobName",jobName.val());
         formData.append("jobPrice",Number(jobPrice.val()));
         formData.append("jobAsk",jobAsk.val());
         formData.append("companyName",companyName.val());
         formData.append("id",modifyJob.attr("data-id"));
         formData.append("jobLogo",jobLogo[0].files[0]);
       

        $.ajax({
            type:"post",
            url:"/job/updateJob",
            data:formData,
            cache:false,
            contentType:false, 
            processData:false,
            success:this.handleupdateSucc.bind(this)
        })
    },
    handleupdateSucc(data){
        if(data.state){
            this.createPage();
        }
    }
}
