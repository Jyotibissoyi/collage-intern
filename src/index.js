const express = require('express');
const mongoose = require('mongoose');
const route = require('./Routes/route.js');
const multer= require('multer')
const app = express();


app.use(multer().any())

app.use(express.json());


mongoose.connect('mongodb+srv://bloggingSite:project123@project-01-group-3.2zpxn0w.mongodb.net/Project-02-Interns', {
    useNewUrlParser: true
}).then(() => console.log('MongoDB connected😎😎'))
    .catch(err => console.log(err.message))

app.use('/', route);

app.listen(3001, function () {
    console.log('Server Running On Port Number' + 3001)
});


