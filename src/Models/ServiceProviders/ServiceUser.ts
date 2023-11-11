import { Schema, model } from "mongoose";

const ServiceUser= new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    phoneNumber:{type:String,required:true},
    adharNumber:{type:String,required:true},
    role:{type:String,required:true},
    password:{type:String,required:true,minlength:6},
    isVerified:{type:Boolean,required:true},
    service:[{type:Schema.Types.ObjectId,ref:'Service'}],
    bookings:[{type:Schema.Types.ObjectId,ref:'Booking'}]
})

export default model('ServiceUser',ServiceUser)