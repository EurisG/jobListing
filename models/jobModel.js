const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
    }, 
    Company: {
        type: String,
    },
    location: {
        type: String,
    },
    salary: {
        type: String,
    },
    description: {
        type: String,
    },
    complete: {
        type: Boolean,
    }
});

const Jobs = mongoose.model('Jobs', jobSchema);

module.exports = Jobs;