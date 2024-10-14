import { Socket } from "socket.io";
import {v4 as UUiDv4} from "uuid"


const roomHandler = (socket : Socket) => {

    const createRoom = () => {
        const roomId = UUiDv4()  //unique room id
        socket.join(roomId) ;// make socket connection to enter a new room
        socket.emit("room-created", {roomId}) ;
        console.log("room created with id:",roomId);
        
    }

    const joinRoom = ({roomId}: {roomId: string}) => {
        console.log("new user has joined room:" ,roomId);  
    }
   
    socket.on("create-room", createRoom)
    socket.on("join-room", joinRoom)
}

export default roomHandler

