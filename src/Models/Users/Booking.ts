import { Schema, model } from "mongoose";

const Booking=new Schema({
    serviceId:{type:String,required:true},
    serviceCategory:{type:String,required:true},
    bookingDate:{type:String,required:true},
    contactNumber:{type:String,required:true},
    alternativeNumber:{type:String,required:true},
    location:{type:String,required:true},
    status:{type:String,required:true},
})

export default model("Booking",Booking)