import express from 'express'
import { SignUp, login } from '../controllers/ServiceUserControllers/serviceUserController'
const ServiceRoutes=express.Router()

ServiceRoutes.post('/login',login)
ServiceRoutes.post('/signup',SignUp)

export default ServiceRoutes