import { Socket } from "socket.io";
import { v4 as UUIDv4 } from "uuid";
import IRoomParams from "../interfaces/iRoomParams";

// Stores participants in rooms
const rooms: Record<string, string[]> = {};

const roomHandler = (socket: Socket) => {
    const createRoom = () => {
        const roomId = UUIDv4(); // Generate a unique room ID
        socket.join(roomId);
        rooms[roomId] = []; // Initialize the room
        socket.emit("room-created", { roomId });
        console.log("Room created with id", roomId);
    };

    const joinedRoom = ({ roomId, peerId }: IRoomParams) => {
        console.log("Joined room called", rooms, roomId, peerId);
        if (rooms[roomId]) {
            rooms[roomId].push(peerId);  // Add the new peer ID to the room's participant list.
            console.log("Current participants in room:", rooms[roomId]); // Log updated participants list.
        

            socket.on("ready", () => {
                socket.to(roomId).emit("user-joined", { peerId });
            });

            socket.emit("get-users", {
                roomId,
                participants: rooms[roomId]
            });
        }
    };

    socket.on("create-room", createRoom);
    socket.on("joined-room", joinedRoom);
};

export default roomHandler;
