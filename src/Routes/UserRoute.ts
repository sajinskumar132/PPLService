import express from 'express'
import { login, signUp } from '../controllers/userControllers/userController'
import { BookService, GetServices, getBookings } from '../controllers/userControllers/userServiceControllers'
import { getServiceById } from '../controllers/ServiceUserControllers/ServicesControllers'

const UserRoutes=express.Router()

UserRoutes.post('/login',login)
UserRoutes.post('/signup',signUp)

UserRoutes.get('/services',GetServices)
UserRoutes.get('/:id/service',getServiceById)
UserRoutes.get('/bookings',getBookings)
UserRoutes.post('/:serviceId/:serviceUserId/booking',BookService)
export default UserRoutes