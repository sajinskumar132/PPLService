
import Service from "../../Models/ServiceProviders/Service";
import { accessTokenAuthenticator } from "../../Services/accessTokenAuthenticator";
import { RequestHandler } from "express";
import { ServiceCatogory } from "../../util/Enums";
export const getServices:RequestHandler=async(req,res,next)=>{
    try {
        const Services=await Service.find()
        return res.status(200).json({data:Services,message:"Services"})
    } catch (error) {
        next(error)
        return res.status(500).json({data:null,message:"Internal Server error"})
    }
}

export const NewService:RequestHandler=async(req,res,next)=>{
    try {
        const token=req.headers.authorization?.split(' ')[1]
        if(!token) return res.status(401).json({data:null,message:"Unauthorized"})
        console.log(token)
        const userid = accessTokenAuthenticator.TokenAuthenticator(token)
        console.log(userid)
        if(!userid) return res.status(401).json({data:null,message:"Unauthorized"})
        const {category,experience,description,location}=req.body
        let IsValidCCategory=false
        const keys = Object.keys(ServiceCatogory);
        for(let item of  keys){
            if(item == category){
                IsValidCCategory=true
                break
            }
        }
        if(!IsValidCCategory) return res.status(400).json({data:null,message:"Invalid Category"})
        const newService=new Service({userId:userid,category,experience,description,location,status:"Approved"})
        await newService.save()
        return res.status(201).json({data:newService,message:"Sucessfully created service"})
    } catch (error) {
        next(error)
        return res.status(500).json({data:null,message:"Internal Server error"})
    }
}