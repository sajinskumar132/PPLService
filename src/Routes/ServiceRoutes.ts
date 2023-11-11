import express from 'express'
import { SignUp, login } from '../controllers/ServiceUserControllers/serviceUserController'
import { NewService, getServices } from '../controllers/ServiceUserControllers/ServicesControllers'
const ServiceRoutes=express.Router()

ServiceRoutes.post('/login',login)
ServiceRoutes.post('/signup',SignUp)

ServiceRoutes.get('/services',getServices)
ServiceRoutes.post('/newservice',NewService)
export default ServiceRoutes