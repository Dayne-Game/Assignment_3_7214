const express = require('express');
const app = express();
const cors = require('cors');
const config = require('config')

const PORT = 5000;

const mongoose = require('mongoose');
const bodyparser = require('body-parser')

const postsroute = require('./routes/api/postsroute');
const usersroute = require('./routes/api/usersroute');

app.use(cors())
app.use(bodyparser.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/api/posts', postsroute);
app.use('/api/users', usersroute);
app.use('/api/auth', require('./routes/api/auth'))

const db = config.get('mongoURI');

mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(function() {
        console.log('MongoDB Connected...');
    })
    .catch(function(err) {
        console.log(err)
    });

app.get('/', (req, res) => {
    res.join({reply: 'Route for HOME Path.'});
});

app.listen(PORT, () => {
    console.log(`App Listening on Port ${PORT}`);
});