import Order from "../models/order.js"
import Product from "../models/product.js"
import orderRouter from "../routes/orderRoute.js"
export async function createOrder(req,res) {
     //get user info
        if(req.user ==null){
                res.status(403).json({
                    message :"Please login and try again"            
                })
                return
        }
    

     //add current users name if not provided
     const orderInfo =req.body
     if(orderInfo.name==null){
         orderInfo.name = req.user.firstName+" "+req.user.lastName
     }
    


     //orderId genarete---CBC00001
      let orderId ="CBC00001"

      const lastOrder =await Order.find().sort({date : -1}).limit(1)
//[]
      if(lastOrder.length >0){
         const lastOrderId =lastOrder[0].orderId  
         //CBC00551
         const  lastOrderNumberString =lastOrderId.replace("CBC","")  //00551
         const lastOrderNumber= parseInt(lastOrderNumberString)   //551(parsint=string convert to Int)
         const newOrderNumber =lastOrderNumber + 1//552
         const newOrderNumberString =String(newOrderNumber).padStart(5,'0')//"00552"
         orderId ="CBC"+newOrderNumberString//"CBC00552"
      }
      try{
        let total =0;
        let labelledTotal =0;
        const products =[]
      
        for(let i=0; i<orderInfo.products.lenght;i++){
            const item =await Product.findOne({productId : orderInfo.products[i].productId})
            if(item == null){
                res.status(404).json({
                    message:"product with productId"+orderInfo.prodcts[i].productId0+"is not available right now"
                })
                return
            }
            products[i]={
                 productInfo:{
                    productId:item.productId,
                    name:item.name,
                    altNames:item.altNames,
                    description: item.description,images:item.images,
                    labelledPrice : item.labelledPrice,
                    price:item.price
                 },
                 quantity:orderInfo.prodcts[i].qty
                  

            }
          //total = total + (item.price * orderInfo.products[i].quantity)
total += (item.price * orderInfo.products[i].qty)
//labelledTotal = labelledTotal + (item.labelledPrice * orderInfo.products[i].quantity)
labelledTotal += (item.labelledPrice * orderInfo.products[i].qty)
        }
    
       const order =new order({
                orderId :orderId,
                email :req.user.email,
                name :orderInfo.name,
                address :orderInfo.address,
                total:0,
                phone:orderInfo.phone,
                Product:products,
                labelledTotal:labelledTotal,
                total:total,
})

                const createOrder= await order.save()
                res.json({
                message :"order created sucessfully",
                order:createOrder
                })
}catch(err){
                res.status(500).json({
               message:"Failed to create order",
                                error:err
                })
}
     





      


     //create order object           
}