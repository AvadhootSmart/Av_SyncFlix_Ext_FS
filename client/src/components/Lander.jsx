import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../SocketContext";

export default function Lander() {
  const socket = useSocket();
  const [newRoom, setnewRoom] = useState("");
  const [joinRoom, setJoinRoom] = useState("");

  const navigateTo = useNavigate();

  const handleCreateRoom = () => {
    if (newRoom.trim()) {
      socket.emit("create-room", newRoom);
      console.log(`Creating Room : ${newRoom}`);
      navigateTo(`/room/${newRoom}`);
    }
  };

  const handleJoinRoom = () => {
    if (joinRoom.trim()) {
      socket.emit("join-room", joinRoom);
      console.log(`Joining Room : ${joinRoom}`);
      navigateTo(`/room/${joinRoom}`);
    }
  };

  useEffect(() => {
    if (!socket) return;

    //socket.on("connect", () => {
    // console.log("Hello from " + socket.id);
    //});

    socket.on("room-created", ({ room, id }) => {
      console.log(`Room - ${room} successfully created by ${id}`);
    });

    socket.on("room-joined", ({ room, id }) => {
      console.log(`User ${id} joined room[${room}]`);
    });
    return () => {
      socket.off("connect");
    };
  }, []);

  return (
    <>
      <div className="bg-zinc-900 flex flex-col py-10 items-center h-[500px] w-[400px] text-white">
        <h1 className="text-4xl">SyncFlix</h1>
        <input
          placeholder={"Create Room"}
          className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => setnewRoom(e.target.value)}
          value={newRoom}
        />
        <button
          className="border-2 p-2 border-white rounded-md mt-4"
          type="button"
          onClick={handleCreateRoom}
        >
          Create
        </button>
        <h2 className="mt-5">Or</h2>
        <input
          placeholder={"Join Room"}
          className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => setJoinRoom(e.target.value)}
          value={joinRoom}
        />
        <button
          className="border-2 p-2 border-white rounded-md mt-4"
          type="submit"
          onClick={handleJoinRoom}
        >
          Join
        </button>
      </div>
    </>
  );
}
