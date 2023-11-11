import express from 'express'
import { SignUp, login } from '../controllers/ServiceUserControllers/serviceUserController'
import { DeleteServices, NewService, UpdateService, getAllServices, getServicesByUser,} from '../controllers/ServiceUserControllers/ServicesControllers'
const ServiceRoutes=express.Router()

ServiceRoutes.post('/login',login)
ServiceRoutes.post('/signup',SignUp)

ServiceRoutes.get('/allservices',getAllServices)
ServiceRoutes.get('/services',getServicesByUser)
ServiceRoutes.post('/newservice',NewService)
ServiceRoutes.post('/:id/updateservice',UpdateService)
ServiceRoutes.delete('/:id/deleteservice',DeleteServices)
export default ServiceRoutes