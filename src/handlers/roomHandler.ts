import { Socket } from "socket.io";
import {v4 as UUiDv4} from "uuid";
import iRoomParams from "../interfaces/iRoomParams";

const rooms: Record<string, string[]> = {};

const roomHandler = (socket: Socket) => {

    const createRoom = () => {
        const roomId = UUiDv4();  // Unique room ID
        socket.join(roomId);  // Join the new room
        rooms[roomId] = [];  // Initialize an empty array for the room's participants
        socket.emit("room-created", { roomId });
        console.log("Room created with id:", roomId);
    }

    const joinRoom = ({ roomId, peerId }: iRoomParams) => {
        if (rooms[roomId]) {     
            console.log("New user with id:", peerId, "has joined room:", roomId);  // Corrected logging
            
            rooms[roomId].push(peerId);  // Add the peer to the room's participant list
            socket.join(roomId);

            socket.emit("get-users", {
                roomId,
                participants: rooms[roomId],  // Fixed typo: 'participants'
            });
        }
    };

    socket.on("create-room", createRoom);
    socket.on("join-room", joinRoom);
}

export default roomHandler;
