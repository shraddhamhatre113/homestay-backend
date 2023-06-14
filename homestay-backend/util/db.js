import mongoose from "mongoose";

export async function connectDB (){
    try{
    await mongoose.connect(process.env.MONGO_DB);
    console.log("Connection to DB established successfully!")
    }catch(error){
        console.error(error)
    }
}