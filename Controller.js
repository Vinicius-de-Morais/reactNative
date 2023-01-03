
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { restart } = require('nodemon');
const models =  require('./models');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));



let port = 3000;
app.listen(port,(req,res)=>{
    console.log('servidor rodando');
})