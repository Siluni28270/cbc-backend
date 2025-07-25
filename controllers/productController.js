import Product from "../models/product.js";
import{isAdmin}from "./userController.js"

export async function getProducts(req,res){

try{
   if(isAdmin(req)){
      const products =await Product.find()
      res.json(products)

   }else{
       const products =await Product.find({isAvailable :true})
       res.json(products)
   }
   

}catch(err){
   res.json({
      message:"failed to get products",
      error:err
   })  
 }
}
  export function saveProduct(req,res){

if(!isAdmin(req)){
   res.status(403).json({
      message:"you are not authoried to add a product"
   });
   return;

} const product = new Product(
   req.body
);

  product.save()
    .then(()=>{
      res.json({
         message:"Product added successfully",

                });
     })
    .catch(()=>{
        res.json({
          message:"product added failed",
                });
    }
);

}

export async function deleteProduct(req,res){
   Product
  if(!isAdmin(req)){
   res.status(403).json({
      message:"you are not authoried to delete a product"
   });
   return
  }
  try{
  await Product.deleteOne({productId:req.params.productId})

  res.json({
   message:"product deleted successfully"
  })
}catch(err){
   res.status(500).json({
      message:"failed to delete product",
      error:err
   })
}

}
   




















