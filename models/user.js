import mongoose from "mongoose";

const userSchema =mongoose.Schema({
   email:{
                type: String,
                required: true,
                unique: true
   },
   firstName:{
                type:String,
                required:true,

   },
   lastName:{
                type:String,
                required:true,

   },
   password:{
                type:String,
                required:true,

   },
    role:{
                type:String,
                required:true,
                default:"customer"
   },
   isBlock:{
                type:Boolean,
                required:true,
                default:false

   },image:{
                type :String,
                required:false,
                default:"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
   }
})
const User = mongoose.model("User", userSchema);
export default User;
