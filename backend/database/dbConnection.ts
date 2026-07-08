import mongoose from "mongoose"; 
import dotenv from "dotenv"
import logger from "../utils/logger.js";
dotenv.config()

 const dbConnection  = ()=>{
    mongoose.connect(process.env.DB_URL as string,{
       dbName: "Job_Portal"

    }).then(()=>{ 
       logger.info("MongoDB Connected Successfully!");
    }).catch((error)=>{
       logger.error(`Failed to connect to MongoDB: ${error}`);
    })
    
}
export default dbConnection;