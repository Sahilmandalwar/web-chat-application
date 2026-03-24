import express from 'express';
import authRoutes from './routes/auth.js';
import messageRoutes from "./routes/message.js"
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const PORT = process.env.PORT || 6000;  // process.env.PORT

const app = express();
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
});