import { Schema, model } from "mongoose";

const Service=new Schema({
    userId:{type:String,required:true},
    category:{type:String,required:true},
    experience:{type:String,required:true},
    description:{type:String},
    location:{type:String,required:true},
    status:{type:String,required:true}
})

export default model('Service',Service)