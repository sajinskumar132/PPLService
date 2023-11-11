import { Schema, model } from "mongoose";

const User = new Schema({
    name:{type:String,required:true},
    phoneNumber:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    role:{type:String,required:true},
    password:{type:String,required:true,minlength:6},
    bookings:[{type:Schema.Types.ObjectId,ref:'Booking'}]
})
export default model("User",User)