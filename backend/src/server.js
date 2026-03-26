import { ENV } from './lib/env.js';
import express from 'express';
import cookieParser from "cookie-parser";

import authRoutes from './routes/auth.js';
import messageRoutes from "./routes/message.js"

import path from "path";
import {connectDB} from './lib/db.js';




const PORT = ENV.PORT || 6000;  // process.env.PORT

const app = express();
app.use(express.json());  // to access data under req.body <-- middleware
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

const __dirname = path.resolve();

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);

// make ready for deployment
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname , "../frontend/dist")));
    app.use((_, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
    });
}




app.listen(PORT, ()=>{
    console.log("server started to listen at port: " + PORT ); 
    connectDB();
});