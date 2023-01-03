
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { restart } = require('nodemon');
const models =  require('./models');

const app = express();
// app.use(cors)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

let user=models.User;
let tracking=models.Tracking;
let car=models.Car;

app.post('/login', (req, res)=>{
    console.log(req.body)
})

let port = process.env.PORT || 3000;
app.listen(port, (req,res)=>{
    console.log('servidor rodando');
})


// junky code
/* 
app.get('/create', async(req,res)=>{
    let create = await user.create({ 
        name: "Joana", 
        password: "senha",
        createdAt: new Date(),
        updatedAt: new Date()
    });
    res.send('User created Successfully')
})

app.get('/read', async(req, res)=>{
    let read = await user.findAll({
        raw: true
    });
    console.log(read);
})

app.get('/update', async(req, res)=>{
    let update = await user.findByPk(1, {include:[{all:true}]}).
        then(response =>{
            console.log(response);
            //response.save();
    });
  
})

app.get('/delete', async(req, res)=>{
    user.destroy({
        where:{
            id:3
        }
    })
})

*/