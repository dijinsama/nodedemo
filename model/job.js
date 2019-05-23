const mongoose = require("../db/database").mongoose;

const Job = mongoose.model("job",{
    jobName:String,
    jobPrice:Number,
    jobAsk:String,
    companyName:String,
    jobLogo:String
})


const jobSave = (jobInfo,cb)=>{
   
    const job = new Job(jobInfo);
    job.save().then(()=>{
        cb();
    })
}

const jobFind = (cb)=>{
    Job.find().then((result)=>{
        cb(result)
    })
}

const jobDelete = (jobInfo,cb)=>{
    Job.remove(jobInfo).then((result)=>{
        cb(result)
    })
}


const jobModify = (jobId,jobInfo,cb)=>{
    Job.update(jobId,{$set:jobInfo}).then((result)=>{
        cb(result)
    })
}


module.exports = {
    jobSave,
    jobFind,
    jobDelete,
    jobModify
}