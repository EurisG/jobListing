const dotenv = require('dotenv');

const mongoose = require('mongoose');



dotenv.config({
    path: './config.env',
});

const DB = mongoose.connect(process.env.DATABASE.replace("<password>", process.env.PASSWORD), {
    // useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false
}).then(() => {
    console.log('DATABASE IS RUNNING...')
}).catch((error) => {
    console.log(error.message);
});

const app = require('./app');
const PORT = process.env.PORT;

app.listen( PORT, () => {
    console.log(`Server started on port ${process.env.PORT}...`);
});