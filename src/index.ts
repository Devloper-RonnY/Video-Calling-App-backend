import express from "express";
import serverConfig from "./config/serverConfig"
import http from "http";
import { Server } from "socket.io";
import cors from "cors"


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
    
    socket.on("disconnect", () => {
        console.log("User Disconnected");
        
    })
})
 

server.listen(serverConfig.PORT, () => {
    console.log(`server is up at ${serverConfig.PORT}`);
    
})