
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { restart } = require('nodemon');

const app = express();
//app.use(cors)
app.use(bodyParser.urlencoded({extended: false}));

app.get('/',(req,res)=>{
    console.log(cors)
    res.send('Aumento peniano gratis')
})

let port = 3000;
app.listen(port,(req,res)=>{
    console.log('servidor rodando');
})
