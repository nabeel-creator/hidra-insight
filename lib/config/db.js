import mongoose from "mongoose";

export const ConnectDB = async () =>{
    await mongoose.connect('mongodb+srv://mun73350:mun73350database@cluster0.11dc62k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    console.log("DB connected")
}