
const Product = require("../models/productModel");
const mongoose = require('mongoose');
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


//  update product --Admin

exports.updateProduct = async (req,res,next)=> {
    const product = await Product.findById(req.params.id);

    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product not found"
        })
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

// exports.deleteProduct = async (req,res)=>{
//   const product = await Product.findById(req.params.id);

//   if(!product){
//       return res.status(500).json({
//           success:false,
//           message:"Product not found"
//       })
//   }

//   const  products = await Product.findByIdAndRemove(req.params.id);

//   res.status({
//     success:true,
//     message:"Product deleted successfully"
//   })

  

// }

exports.deleteProduct = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID"
      });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    const removedProduct = await Product.findByIdAndDelete(req.params.id);
   

    if (removedProduct) {
      return res.status(200).json({
        success: true,
        message: "Product deleted successfully"
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Error deleting product"
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};