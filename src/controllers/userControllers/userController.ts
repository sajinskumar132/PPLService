import { RequestHandler } from "express"
import User from '../../Models/Users/User'
import { compareSync, hashSync } from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const signUp:RequestHandler=async (req,res,next)=>{
    try {
        const { name,email,phoneNumber,password}=req.body
        const existingUser= await User.findOne({email})
        if(existingUser) return res.status(400).json({data:null,message:`User with ${email} already exists`})
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
         if(!password.trim()){
            errors.push('passoword is required')
         }
         if(errors.length>0) return res.status(400).json({data:null,message:errors.toString()})
        const encryptPassword= hashSync(password)
        const newUser=new User({name,email,phoneNumber,role:"user",password:encryptPassword})
        await newUser.save()
        if(newUser){
            const token=jwt.sign({id:newUser._id},process.env.SeacretKey!,{expiresIn:'7D'})
            const data={
                id:newUser._id,
                name:newUser.name,
                email:newUser.email,
                token
            }
            return res.status(201).json({data:data,message:"Sucessfully Created"})
        }else{
            return res.status(400).json({data:null,message:"failed Created"})
        }
    } catch (error) {
        next(error)
        return res.status(500).json({data:null,message:"Internal Server error"})
    }
}

export const login:RequestHandler=async (req,res,next)=>{
    try {
        const { email,password}=req.body
        const existingUser= await User.findOne({email})
        if(!existingUser) return res.status(400).json({data:null,message:`User with ${email} not exists`})
        const errors=[]
         if(!email.trim()){
            errors.push('Email is required')
         }
         if(!password.trim()){
            errors.push('passoword is required')
         }
         if(errors.length>0) return res.status(400).json({data:null,message:errors.toString()})
         const isValid=compareSync(password,existingUser.password)
         if(!isValid) return res.status(400).json({data:null,message:`Incorrect password`})
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