import express from 'express'
import MongoDbConnect from './connetion/MongoDbConnet'
import { config } from 'dotenv'
import UserRoutes from './Routes/UserRoute'
import ServiceRoutes from './Routes/ServiceRoutes'
config()
const app=express()
app.use(express.json())

app.use('/user',UserRoutes)
app.use('/service',ServiceRoutes)
const Server=()=>{
    MongoDbConnect(process.env.MongoDbUrl!).then(()=>{
        app.listen(process.env.Port,()=>{
            console.log("Server started")
        })
    })
}

Server()
