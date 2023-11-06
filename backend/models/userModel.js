const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter your Name"],
        maxLength:[30,"Name cannot exeed 30 Characters"],
        minLength:[4, "Name Should have more than 4 characters"]
    },
    email:{
        type:String,
        required:[true, "Please Enter your Email"],
        unique:true,
        validate:[validator.isEmail, "Please Enter Valid Email"]
    },
    password:{
        type:String,
        required:[true,"Please Enter your Password"],
        minLength:[8,"Password should be at least 8 characters"],
        select:false
    },
    avatar:{
        public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
            type:String,
            default:"user",
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
})

module.exports = mongoose.model("User",userSchema)
