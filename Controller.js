const express = require('express');
//const cors = require('cors');
const bodyParser = require('body-parser');
const { restart } = require('nodemon');
const models =  require('./models');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
// app.use(cors)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// the tables 
let user=models.User;
let tracking=models.Tracking;
let car=models.Car;

// receive the user and match with the table, and if find return the user
app.post('/login', async(req, res)=>{
    let resp = await user.findOne({
        where:{name: req.body.name, password: req.body.password}
    })
    
    if(resp === null){
        res.send(JSON.stringify("error"));
    }else{
        res.send(resp)
    }
})

// verify if the old password is the same
app.post('/verifyPass', async(req,res)=>{
    let response = await user.findOne({
        where:{id: req.body.id, password: req.body.oldPassword}
    })
    
    if(response === null){
        
        res.send(JSON.stringify("Senha Antiga errada"));
    }else{
        response.password=req.body.newPassword;
        response.save();
        res.send(JSON.stringify("Senha Atualizada com sucesso!"))
    }

})

// create new car in the database
app.post('/create', async (req,res)=>{
    let trackingId='';
    await tracking.create({
        userId: req.body.userId,
        code: req.body.code,
        local: req.body.address
    }).then((response)=>{
        trackingId+=response.id
    })

    await car.create({
        trackingId: trackingId,
        name: req.body.car,
    })
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