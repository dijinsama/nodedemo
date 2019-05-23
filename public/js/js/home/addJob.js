function AddJob(container){
    this.container = container;
}

addJob.template = `
<div class="addJob-body">
        <form id="addForm">
            <div class="form-group">
                <label for="job_addJob_name">职位名称</label>
                <input type="text" class="form-control" id="job_addJob_name" placeholder="请输入职位名称">
            </div>
            <div class="form-group">
                <label for="job_addJob_price">薪资</label>
                <input type="text" class="form-control" id="job_addJob_price" placeholder="薪资范围">
            </div>
            <div class="form-group">
                <label for="job_addJob_ask">要求</label>
                <input type="text" class="form-control" id="job_addJob_ask" placeholder="招聘要求">
            </div>
            <div class="form-group">
                <label for="company_addJob_name">公司名称</label>
                <input type="text" class="form-control" id="company_addJob_name" placeholder="请输入公司名称">
            </div>
            <div class="form-group">
                <label for="logo_addJob">上传公司logo</label>
                <input type="file" id="logo_addJob" multiple>
            </div>
            <button type="submit" class="btn btn-primary">添加职位</button>
        </form>
</div>
`


AddJob.prototype = {
    init:function(){
        this.createPage()
        this.addjobClick();
    },
    createPage:function(){
        this.el = $("<div></div>");
        this.el.append(addJob.template)
        this.container.append(this.el);
    },
    addjobClick:function(){
        this.el.find("#addForm").on("submit",this.handleAddjobCb.bind(this))
    },
    handleAddjobCb(e){
        e.preventDefault();
        var jobName = this.el.find("#job_addJob_name");
        var jobPrice = this.el.find("#job_addJob_price");
        var jobAsk = this.el.find("#job_addJob_ask");
        var companyName = this.el.find("#company_addJob_name");
        var jobLogo = this.el.find("#logo_addJob");

        //如何ajax模拟form表单

        var formData = new FormData();
         formData.append("jobName",jobName.val());
         formData.append("jobPrice",Number(jobPrice.val()));
         formData.append("jobAsk",jobAsk.val());
         formData.append("companyName",companyName.val());
         formData.append("jobLogo",jobLogo[0].files[0]);
       

        $.ajax({
            type:"post",
            url:"/job/addjob",
            data:formData,
            cache:false,
            contentType:false, 
            processData:false,
            success:this.handleAddSucc.bind(this)
        })
       
        
    },
    handleAddSucc(data){
       if(data.state){
            alert("添加成功");
            new Page().renderSwitch(1);
            new Page().tabbarActive(1);
       }else{
           alert("添加失败");
       }
    }
}


