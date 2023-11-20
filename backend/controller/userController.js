const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/userModel");
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

//  register user
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is sample id",
      url: "profilePicUrl",
    },
  });

  sendToken(user,201,res)

//   const token = user.getJWTToken();
//   res.status(200).json({
//     success: true,
//     token,
//   });
});

//  Login user
exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    // checking if user has given password and email both
  
    if (!email || !password) {
      return next(new ErrorHandler("Please Enter Email & Password", 400));
    }
  
    const user = await User.findOne({ email }).select("+password");
  
    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }
  
    const isPasswordMatched = await user.comparePassword(password);
  
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    sendToken(user,200,res)

});

// logout User

exports.logout = catchAsyncError(async (req,res,next)=>{
  res.cookie('token',null,{
    expires:new Date(Date.now()),
    httpOnly:true,
  });

  res.status(200).json({
    success:true,
    message:"User Logged out Successfully"
  })
})

//  Forgot Password 

exports.forgotPassword = catchAsyncError(async (req,res,next)=>{
  const user = await User.findOne({email:req.body.email});

  if(!user){
    return next(new ErrorHandler("user not found",404));

  }

  //  get reset passwordToken 

  const resetToken = user.getResetPasswordToken();

  await user.save({validateBeforeSave:false});
  const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`

  const message = ` Your password reset token is  :- \n\n  ${resetPasswordUrl} \n\nIf you have not requested this email then , please ignore it`;

  try {
    
    await sendEmail({
      email:user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });

    res.status(200).json({
      sucess:true,
      message:`Email sent to ${user.email} successfully`
    })


  } catch (error) {
    
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({validateBeforeSave:false});

    return next(new ErrorHandler(error.message, 500));
  }
})


//  Reset Password
exports.resetPassword  = catchAsyncError(async(req,res,next)=>{
  //  create token hash
  const resetPasswordToken  = crypto
  .createHash('sha256')
  .update(req.params.token)
  .digest('hex');


  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt:Date.now()},
  })

  if(!user){
    return next(
      new ErrorHandler(
        "Reset Password Token is invalid or has been expired", 400
      )
    );
  }

  if(req.body.password !== req.body.confirmPassword){
    return next(new ErrorHandler("password does not match", 400))
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user,200, res)

})