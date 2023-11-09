const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

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

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);
})

//     JWT token 
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    })
}

// compare password 
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

//   reset password 

userSchema.methods.getResetPasswordToken = function(){
    //  genrating token 
    const resetToken = crypto.randomBytes(20).toString('hex')

    //  hashing and adding resettokenpassword to userSchema
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.resetPasswordExpire = Date.now() + 15*60*1000;

    return resetToken;
}

module.exports = mongoose.model("User",userSchema)
