const express = require('express');

const jobController = require('./../controllers/jobController');

const jobRouter = express.Router();

jobRouter
.route('/')
.get(jobController.getJobs)
.post(jobController.createJob);

jobRouter
.route('/:id')
.get(jobController.getOneJob)
.delete(jobController.deleteJob)
.put(jobController.updateJob)

module.exports = jobRouter;