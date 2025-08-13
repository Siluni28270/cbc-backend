import express from 'express'; 
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import productRouter from './routes/productRouter.js';
import userRouter from './routes/userRoute.js';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import orderRouter from './routes/orderRoute.js';
import dotenv from 'dotenv';
dotenv.config();

const app =express();

app.use(cors())

app.use(bodyParser.json())


app.use((
  req,res,next)=>{
     const tokenString =req.header("Authorization")
     if(tokenString !=null){
      const token =tokenString.replace("Bearer ","")
     
     console.log(token)

     jwt.verify(token,"cbc-batch-five#@2025",
        (err,decoded)=>{
          if(decoded !=null){
            console.log(decoded)
            next()
          }else{
            console.log("invalid  token")
            res.status(403).json({
              message:"invalid token"
            })
          }
        }

     )
     }else{
      next()
     }
})

mongoose.connect(process.env.MONGODB_URL )
.then(()=>{
  console.log("connected to the database")
}).catch(()=>{console.log("data base connection faild")})


app.use("/api/products",productRouter)
app.use("/api/users",userRouter)
app.use("/api/orders",orderRouter)



app.listen(5000,()=> console.log('sever running on port 5000'))
