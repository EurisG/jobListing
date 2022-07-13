const { json } = require('body-parser');
const Jobs = require('./../models/jobModel');

exports.getIndex = (req,res) => {
    res.send('Index homepage');
}

// GET ALL JOBS
exports.getJobs = async (req, res) => {
    try{
        const jobs = await Jobs.find();
        res.status(200).json({
            status: 'success',
            results: jobs.length,
            data: {
                jobs,
            }
        })
    }catch(error) {
        res.status(500).json({
            status: "error",
            data: {
                error: error.message
            }
        })
    }
};

// CREATE NEW JOB
exports.createJob = async (req,res) => {
    try{
        const newJob = await Jobs.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                newJob,
            }
        })
    }catch(error) {
        res.status(500).json({
            status: "error",
            error: error.message
        })
    }
};

// GET JOB BY ID
exports.getOneJob = async (req,res) => {
    try{
        const job = await Jobs.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                job,
            }
        })
    }catch(error) {
        res.status(500).json({
            status: 'error',
            error: error.message
        })
    }
};

// DELETE JOB POST
exports.deleteJob = async (req,res) => {
    try{
        await Jobs.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'success',
            data: {}
        });
    }catch(error) {
        res.status(500).json({
            status: 'error',
            error: error.message
        });
    }
};

// UPDATE JOB POST
exports.updateJob = async (req,res) => {
    try{
        const updatedJob = await Jobs.findByIdAndUpdate(req.params.id,
            req.body, {new: true});
            res.status(204).json({
                status: 'success',
                data: {}
            })
    }catch(error) {
        res.status(500).json({
            status: 'error',
            error: error.message
        })
    }
};