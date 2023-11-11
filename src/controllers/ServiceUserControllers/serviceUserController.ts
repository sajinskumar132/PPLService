import { RequestHandler } from "express";
import ServiceUser from '../../Models/ServiceProviders/ServiceUser'
import jwt from 'jsonwebtoken'
import { compareSync, hashSync } from "bcryptjs";

export const SignUp:RequestHandler=async(req,res,next)=>{
    try {
        const {name,email,phoneNumber,adharNumber,password}=req.body
        const errors=[]
         if(!name.trim()){
            errors.push('Name is required')
         }
         if(!email.trim()){
            errors.push('Email is required')
         }
         if(!phoneNumber.trim()){
            errors.push('phoneNumber is required')
         }
         if(!adharNumber.trim()){
            errors.push('adharNumber is required')
         }
         if(!password.trim()){
            errors.push('passoword is required')
         }
         if(errors.length>0) return res.status(400).json({data:null,message:errors.toString()})
         const existingUser=await ServiceUser.findOne({email})
         if(existingUser) return res.status(400).json({data:null,message:`User with ${email} already exists`})
         const encodePassword=hashSync(password)
         const newServiceUser=new ServiceUser({name,email,phoneNumber,adharNumber,password:encodePassword,role:'service',isVerified:true})
         await newServiceUser.save()
         const token=jwt.sign({id:newServiceUser._id},process.env.SeacretKey!,{expiresIn:'7D'})
         const data={
            id:newServiceUser._id,
            name:newServiceUser.name,
            email:newServiceUser.email,
            role:newServiceUser.role,
            token
        }
        return res.status(201).json({data:data,message:"Sucessfully Signup"})
    } catch (error) {
        next(error)
        return res.status(500).json({daa:null,message:"Internal Server error"})
    }
}
export const login:RequestHandler=async (req,res,next)=>{
    try {
        const {email,password}=req.body
        const errors=[]
         if(!email.trim()){
            errors.push('Email is required')
         }
         if(!password.trim()){
            errors.push('passoword is required')
         }
         if(errors.length>0) return res.status(400).json({data:null,message:errors.toString()})
         const existingUser=await ServiceUser.findOne({email})
         if(!existingUser) return res.status(400).json({data:null,message:`User with ${email} does not exists`})
         const isValid=compareSync(password,existingUser.password)
         if(!isValid) return res.status(400).json({data:null,message:`Incorrect password`})
         if(!existingUser.isVerified) return res.status(400).json({data:null,message:`User is not verified`})
         const token=jwt.sign({id:existingUser._id},process.env.SeacretKey!,{expiresIn:'7D'})
         const data={
            id:existingUser._id,
            name:existingUser.name,
            email:existingUser.email,
            role:existingUser.role,
            token
        }
        return res.status(200).json({data:data,message:"Sucessfully login"})
    } catch (error) {
        next(error)
        return res.status(500).json({data:null,message:"Internal Server error"})
    }
}