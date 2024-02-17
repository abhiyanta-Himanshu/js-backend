// require('dotenv').config({path: './env'})
import dotenv from "dotenv"

// import mongoose, { ConnectionStates } from "mongoose";
// import {DB_NAME} from "./constants";
import connectDB from "./db/index.js";

dotenv.config({
    path: './env'
})

connectDB().then( () => {

    app.on("error" , (error) => {
        console.log(error)
        throw error
    })

    app.listen(process.env.PORT || 8000 , () => {
        console.log(`Server is running at Port ${process.env.PORT}`)
    })
} )
.catch( (err) => {
    console.log("MongoDB COnnection failed !!!")
} )

/*`

import express  from "express";
const app = express()

// ifis
;( async () => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error",(error) => {
            console.log("Error: ",error);
            throw error
        })

        app.listen(process.env.PORT,()=>{
            console.log(`App is listening at port ${process.env.PORT}`)
        })
    } catch (error) {
        console.error("Eror : ",error)
        throw error
    }
})()

*/