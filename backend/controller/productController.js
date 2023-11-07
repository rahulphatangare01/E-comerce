
const catchAsyncError = require("../middlewares/catchAsyncError");
const Product = require("../models/productModel");
const ApiFeatures = require("../utils/apiFeature");
const ErrorHandler = require("../utils/errorHandler");


// Create Product --Admin
exports.CreateProduct = catchAsyncError( async (req, res, next) => {

  req.body.user = req.user.id;
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
})

//  get All Products
exports.getAllProducts = catchAsyncError( async (req, res) => {

  const resultPerPage = 5;
  const productCount = await Product.countDocuments();
  const ApiFeature = new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage)
  const products = await ApiFeature.query;

  res.status(200).json({ success: true, products, productCount });
})


//  get Single product details

exports.getProductDetails = catchAsyncError( async (req,res,next)=>{

  const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler('Product not found',400))     
    }
  res.status(200).json({
    success:true,
    product
  })
})


//  update product --Admin

exports.updateProduct = catchAsyncError( async (req,res,next)=> {
    const product = await Product.findById(req.params.id);

    if(!product){
      return next(new ErrorHandler('Product not found',400))     
  }

    const products = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
     })
     res.status(200).json({
        success:true,
        products
     })
})

//  Delete product --Admin 

exports.deleteProduct = catchAsyncError( async (req, res, next) => {
  
    const product = await Product.findById(req.params.id);

    if(!product){
      return next(new ErrorHandler('Product not found',400))     
  }

     await product.findByIdAndDelete(req.params.id);
   
     res.status(200).json({
      success: true,
      message: "Product deleted successfully"
    });
    console.error(err);
   
  
})