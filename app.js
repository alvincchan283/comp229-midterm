const express = require('express');
const bodyParser = require('body-parser');

function startAppServer() {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    
    app.get('/', (req, res) => {
        res.json({ 'message': 'The server is running and accepting requests.' });
    });
    
    app.use('/students', require('./app/routes/student.routes'));
    
    app.listen(4000, () => {
        console.log('The Student Information System is now initialized.');
    });
}

// MongoDB connection here
const dbConfig = require('./config/database.config');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, { 
    useNewUrlParser: true
}).then(() => {
    console.log('Connection to the database completed successfully.');
    startAppServer();
}).catch(err => {
    console.log('An error occurred when connecting to the database');
    console.error(err);
});
