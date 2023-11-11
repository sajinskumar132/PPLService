import { connect } from "mongoose"

const MongoDbConnect=async (url:string)=>{
    try {
        await connect(url).then(()=>{
            console.log("Mongodb started")
        })
    } catch (error) {
        console.log(error)
    }
}

export default MongoDbConnect