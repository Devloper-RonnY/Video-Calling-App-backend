import express from "express";
import serverConfig from "./config/serverConfig"
import http from "http";
import { Server } from "socket.io";
import cors from "cors"
import roomHandler from "./handlers/roomHandler";


const app = express();

app.use(cors());

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
    console.log("new User Connected ");
    roomHandler(socket) // pass the socket connection to the handler for room creation and joining
    
    socket.on("disconnect", () => {
        console.log("User Disconnected");
        
    })
})
 
server.listen(serverConfig.PORT, () => {
    console.log(`server is up at ${serverConfig.PORT}`);
})