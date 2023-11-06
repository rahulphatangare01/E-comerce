
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");


// Create Product --Admin
exports.CreateProduct = async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
};

//  get All Products
exports.getAllProducts = async (req, res) => {
  const products = await Product.find();

  res.status(200).json({ success: true, products });
};


//  get Single product details

exports.getProductDetails = async (req,res,next)=>{

  const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler('Product not found',400))     
    }
  res.status(200).json({
    success:true,
    product
  })
}


//  update product --Admin

exports.updateProduct = async (req,res,next)=> {
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
}

//  Delete product --Admin 

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if(!product){
      return next(new ErrorHandler('Product not found',400))     
  }

       await product.findByIdAndDelete(req.params.id);
   
     res.status(200).json({
      success: true,
      message: "Product deleted successfully"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};