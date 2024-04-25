const express = require('express');
const mongoose = require('mongoose');
const jwt=require('jsonwebtoken');
require('./db/connectDb');

const jwtKey='user-auth';
const userModel=require('./db/shcema/userSchema');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/signup', async (req, res) => {
    try {
        let t= await userModel.find({username:req.body.username}).select('-password');
        if(t.length===0){
        let insert = userModel(req.body);
        let result = await insert.save();
        jwt.sign({result},jwtKey,{expiresIn:'1h'},(err,token)=>{
            if(err)res.send({msg:'jwt err'})
            res.send({usernameExists:0,token:`bearer ${token}`});
        });
        
        }
        else res.send({usernameExists:1});
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/signin', async (req, res) => {
    try {
    let check= await userModel.find({username:req.body.username,password:req.body.password}).select('-password');
    if(check.length>=1 ){
        jwt.sign({check},jwtKey,{expiresIn:'1h'},(err,token)=>{
            if(err)res.send({isvalid:0,err:'jwt error'});
            else res.send({
                isvalid:1,
                username:check[0].username,
                nickname:check[0].nickname,
                bio:check[0].bio,
                follower:check[0].followers,
                following:check[0].following,
                token:`bearer ${token}`
            });
        });
    }
    else res.send({isvalid:0});
    // res.send(check);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/',(req,res)=>{
    res.send('working');
})

app.listen(4000);