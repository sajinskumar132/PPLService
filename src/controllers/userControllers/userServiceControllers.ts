import { RequestHandler } from "express";
import Service from "../../Models/ServiceProviders/Service";
import { accessTokenAuthenticator } from "../../Services/accessTokenAuthenticator";
import Booking from "../../Models/Users/Booking";
import ServiceUser from "../../Models/ServiceProviders/ServiceUser";
import User from "../../Models/Users/User";
import { startSession } from "mongoose";

export const GetServices:RequestHandler=async(req,res,next)=>{
    try {
        const services=await Service.find()
        return res.status(200).json({data:services,message:"Services"})
    } catch (error) {
        next(error)
        return res.status(500).json({data:null,message:"Internal Server error"})
    }
}
export const getBookings:RequestHandler=async(req,res,next)=>{
    try {
        const token=req.headers.authorization?.split(' ')[1]
        if(!token) return res.status(401).json({data:null,message:"Unauthorized"})
        const userid = accessTokenAuthenticator.TokenAuthenticator(token)
        if(!userid) return res.status(401).json({data:null,message:"Unauthorized"})
        const exisingBookings=await User.findById(userid).populate('bookings')
        return res.status(200).json({data:exisingBookings?.bookings,message:"Bookings"})
    } catch (error) {
        next(error)
        return res.status(500).json({data:null,message:"Internal Server error"})
    }
}
export const BookService:RequestHandler=async(req,res,next)=>{
     const session=await startSession()
    try {
        session.startTransaction({session})
        const token=req.headers.authorization?.split(' ')[1]
        const {serviceId,serviceUserId}=req.params
        if(!token) return res.status(401).json({data:null,message:"Unauthorized"})
        const userid = accessTokenAuthenticator.TokenAuthenticator(token)
        if(!userid) return res.status(401).json({data:null,message:"Unauthorized"})
        const {serviceCategory,bookingDate,contactNumber,alternativeNumber,location}=req.body
        const newBooking :any=new Booking({serviceId:serviceId,serviceCategory,bookingDate,contactNumber,alternativeNumber,location,status:"Accepted"})
        const existingService= await ServiceUser.findById(serviceUserId)
        existingService?.bookings.push(newBooking)
        const exisinguser=await User.findById(userid)
        exisinguser?.bookings.push(newBooking)
        await existingService?.save({session})
        await exisinguser?.save({session})
        await newBooking?.save({session})
        return res.status(202).json({data:newBooking,message:"Sucessfully booked"})
    } catch (error) {
        next(error)
        return res.status(500).json({data:null,message:"Internal Server error"})
    }finally{
        await session.commitTransaction()
    }
}

