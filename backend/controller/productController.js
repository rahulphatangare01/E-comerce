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

  const resultPerPage = 8;
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

     await product.deleteOne();
   
     res.status(200).json({
      success: true,
      message: "Product deleted successfully"
    });
    console.error(err);
   
  
})

// Create New Review or Update the review

exports.productReview = catchAsyncError(async (req, res, next) => { 
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name:req.user.name,
    rating:Number(rating),
    comment,
  };

  const product = await Product.findById(productId);
  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

//  Get All Reviews of product

exports.getProductReviews = catchAsyncError(async (req,res,next)=>{
  const product = await Product.findById(req.query.id);

  if(!product){
    return next(new ErrorHandler("product not found", 404));
  }

  res.status(200).json({

    success:true,
    reviews:product.reviews
  })
})

//  Delete Review 
exports.deleteReview = catchAsyncError(async(req,res,next)=>{

  const product = await Product.findById(req.query.productId);

  if(!product){
    return next(new ErrorHandler("Product not found", 400));
  }

  const reviews = product.reviews.filter(
    (rev)=> rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev)=>{
    avg+=rev.rating;
  });

  const ratings = avg / reviews.length;

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },

    {
      new:true,
      runValidators:true,
      useFindAndModify:false
    }
  );


  res.status(200).json({
    success:true,
  })
})