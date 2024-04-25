const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    nickname:String,
    username:String,
    bio:String,
    password:String,
    followers:Number,
    following:Number
});

module.exports= mongoose.model('userdetails',userSchema);