import express from 'express';
import "dotenv/config";
import cors from "cors";
import connectDB from './configs/db.js';
import userRoutes from './routes/userRoutes.js';


//initialize express app
const app = express();



//connect to database
await connectDB();


//middleware
app.use(cors());
app.use(express.json());


app.get('/', (req, res)=>res.send("server is running"));
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 3000;


app.listen(PORT, ()=> console.log(`server is running on port ${PORT}`))

