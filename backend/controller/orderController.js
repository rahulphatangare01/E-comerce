const Order = require('../models/orderModel')
const catchAsyncError = require("../middlewares/catchAsyncError");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");

// Create new Order 
exports.newOrder = catchAsyncError(async(req,res,next)=>{
    const{
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt:Date.now(),
        user:req.user._id
    })  ;
    res.status(201).json({
        success:true,
        order
    })
})

// Get Single Order 
exports.getSingleOrder = catchAsyncError(async(req,res,next)=>{
    const order = await Order.findById(req.params.id).populate(
        "user",
        "name email"
        );

    if(!order){
        return next( new ErrorHandler("Order not fonud with this Id", 404));
    }

    res.status(200).json({
        success:true,
        order
    })
})

//  get logged in user order 
exports.myOrders = catchAsyncError(async(req,res,next)=>{
    const orders = await Order.find({user:req.user._id});

    res.status(200).json({
        success:true,
        orders
    })
})

//  get All orders  --------Admin
exports.getAllOrders = catchAsyncError(async(req,res,next)=>{
    const orders = await Order.find();

    let TotalAmount = 0;

    orders.forEach((order)=>{
        TotalAmount+= order.totalPrice;
    })
    res.status(200).json({
        success:true,
        TotalAmount,
        orders
    })
})


// Update Order Status  --- Admin 
exports.updateOrderStatus = catchAsyncError(async(req,res,next)=>{
    const order = await Order.findById(req.params.id);

    if(order.status === "Delivered"){
        return next(new ErrorHandler("you have already delivered this order", 400))
    }

    order.orderItems.forEach(async (order)=>{
        await updateStock(order.product, order.quantity);
    })
    order.orderStatus = req.body.status;

    if(req.body.status === "Delivered"){
        order.deliveredAt = Date.now();
    }
    await order.save({ValidateBeforeSave:false});
    res.status(200).json({
        success:true

    })
}) 

async function updateStock(id, quantity){
    const product = await Product.findById(id);
    product.stock -= quantity;

    await product.save({validateBeforeSave:false});

}


//  delete order -----Admin 
exports.deleteOrder = catchAsyncError(async(req,res,next)=>{
    const order = await Order.findById(req.params.id);

    if(!order){
        return next(ErrorHandler("Order not found with this Id ",400))
    }
    await order.deleteOne();

    res.status(200).json({
        success:true
    });
})