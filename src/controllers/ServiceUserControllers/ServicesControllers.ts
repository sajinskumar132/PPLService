
import Service from "../../Models/ServiceProviders/Service";
import jwt from 'jsonwebtoken'
import { accessTokenAuthenticator } from "../../Services/accessTokenAuthenticator";
import { RequestHandler } from "express";
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
        const token=req.headers.authorization?.split(' ')[0]
        if(!token) return res.status(401).json({data:null,message:"Unauthorized"})
        const userid = accessTokenAuthenticator.TokenAuthenticator(token)
        if(!userid) return res.status(401).json({data:null,message:"Unauthorized"})
        const {category,experience,description,location,status}=req.body
        

    } catch (error) {
        next(error)
        return res.status(500).json({data:null,message:"Internal Server error"})
    }
}