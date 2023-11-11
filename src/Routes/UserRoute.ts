import express from 'express'
import { login, signUp } from '../controllers/userControllers/userController'

const UserRoutes=express.Router()

UserRoutes.post('/login',login)
UserRoutes.post('/signup',signUp)

export default UserRoutes