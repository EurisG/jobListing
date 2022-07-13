// IMPORTED EXPRESS TO CREATE EXPRESS APP
const express = require('express');

const jobRouter = require('./routes/jobRoutes');

const app = express();

app.use(express.urlencoded({
    extended: false,
}));

app.use(express.json());

app.use(express.static('public'));

app.use('/jobs', jobRouter);


module.exports = app;