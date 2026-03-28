import {Server} from "socket.io";
import http from "http";
import express from "express";
import {ENV} from "./env.js";
import { socketAuthMiddleware } from "../middleware/socketAuthMiddleware.js";

const app = express();
const server = http.createServer(app);


const io = new Server(server, {
    cors: {
        origin: [ENV.CLIENT_URL],
        credentials: true
    },

})



// apply authentication middleware to all socket connections
io.use(socketAuthMiddleware);




// Store connected users mapping
const userSocketMap = {}; 


// we will use this function to check whether a user is online or not
export const getReceiverSocketId =(userId) => {
  return userSocketMap[userId];
}

io.on("connection", (socket) => {
    console.log("A user connected", socket.user.fullName);

  // Use the securely verified userId from the middleware instead of the query param
  const userId = socket.userId;
  
  
    userSocketMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.user.fullName);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export {io, app, server};