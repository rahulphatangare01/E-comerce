const catchAsyncError = require("../middlewares/catchAsyncError")
const User = require("../models/userModel");


//  register user
exports.registerUser = catchAsyncError(async (req,res,next)=>{

    const {name,email,password} = req.body;

    const user = await User.create({
        name,email,password,
        avatar:{
            public_id:'this is sample id',
            url:'profilePicUrl'
        },
    })
    const token = user.getJWTToken()
    res.status(200).json({
        success:true,
        token
    })

})