import express from 'express';
import authRoutes from './routes/auth.js';
import messageRoutes from "./routes/message.js"
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 6000;  // process.env.PORT

const app = express();
app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);


app.listen(PORT, ()=>{
    console.log("server started to listen at port: " + PORT ); 
});