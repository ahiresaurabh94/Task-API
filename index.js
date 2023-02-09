const express = require("express");

const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1/taskApi")
mongoose.set('strictQuery', true)

const app = express();

const taskRoute = require('./routes/taskRoute')

app.use('/v1/tasks' , taskRoute)

app.listen( 5000 , ()=>{
    console.log('Server is up at port 5000');
})