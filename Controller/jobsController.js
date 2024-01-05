const { Jobs, Student } = require("../Models")
const { responseMessage } = require("../config")



// Function : Save jobs
const saveJobs = async(req, res)=>{
    try{
   
        
        const job = await Jobs.create(req.body)
        return res.status(201).send({
            hasError:false,
            job
        })

    }catch(err){
        console.log(err)
        return res.status(404).send({
            hasError: true,
            message: err
        })

    }
}

// Function: get all jobs
const getJobs = async(req, res)=>{
    try{

        const jobs = await Jobs.find()
        return res.status(200).send({
            hasError: true, 
            count: jobs.length,
            data: {
                jobs
            }
        })
    }catch(err){
        return res.status(404).send({
            hasError:true,
            message: err
        })
    }

}

// Function:  Apply for job
const applyJob = async(req, res)=>{
try{

    const jobId = req.params.jobId;
    const studentId = req.body.studentId

    console.log("Job Id: ", jobId),
    console.log("Student Id: ",studentId)

    const student = await Student.findById(studentId);
    const jobs = await Jobs.findById(jobId)

    console.log("Student: ", student),
    console.log("Jobs:", jobs)

    if(!jobs || !student){
       return res.status(404).send({
        hasError: true,
        message: responseMessage.USER_NOT_FOUND
       }) 
    }

    if(student.appliedJobs.includes(jobId)){
        return res.status(400).send({
            hasError: false,
            message: responseMessage.EMAIL_EXISTS 
        })
    }

    student.appliedJobs.push(jobId);
    jobs.applicants.push(studentId)

    await student.save();
    await jobs.save()

    return res.status(200).json({
        hasError: false,
        message: responseMessage.SUCCESS
    })



}catch(err){
    return res.status(500).send({
        hasError: true,
        message: err
    })
}
}



module.exports ={
    saveJobs,
    getJobs,
    applyJob
}