import mongoose from "mongoose";


const connectDB = async () =>{
    try{
        mongoose.connection.on('connected', () => console.info('MongoDB connected successfully'));
        await mongoose.connect(`${process.env.MONGODB_URL}/car-rental`);
      

    }catch(error){
        console.error("Error connecting to MongoDB:", error);
    }
}
export default connectDB;