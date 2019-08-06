const express = require('express');
const mongoose = require('mongoose');
const admin = require('./routes/admin');
const path = require('path');
const app = express();
const config = require('./config/config');
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;

mongoose.connect(config.database, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('connected')
    }
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'client/build')));

//admin route
app.use('/admin', admin);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
})

app.listen(3000, (err) => {
    if (err) console.log("err");

    console.log("port started");
})