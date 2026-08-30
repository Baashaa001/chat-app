import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";
import userRouter from "./Routes/userRoutes.js";
import messageRouter from "./Routes/messageRoutes.js";
import {Server} from "socket.io"

const app = express();
const server = http.createServer(app);

//initializing socket io

export const io = new Server(server, {
  cors : {origin:'*'}
})


//store online users

export const userSocketMap = {};

//socket.io connection handler

io.on("connection",(socket) =>{
  const userId = socket.handshake.query.userId
  console.log("user connected", userId)

  if(userId){
    userSocketMap[userId] = socket.id
  }

  //emit online user to connect all clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap))

  socket.on("disconnect", () =>{
    console.log("User disconnected", userId)
    delete userSocketMap[userId]
    io.emit("getOnlineUsers", Object.keys(userSocketMap))
  })
})
app.use(express.json({ limit: "10mb" }));
app.use(cors());

app.get("/api/status", (req, res) => {
  res.send("Server is Live");
});

app.use("/api/auth", userRouter)
app.use("/api/messages",messageRouter)

await connectDB();

if(process.env.NODE_ENV !== "production"){
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => console.log("server running in the Port :" + PORT));
}

export default app;