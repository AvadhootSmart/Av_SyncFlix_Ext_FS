import { useState, useEffect } from "react";
import { useSocket } from "../SocketContext";
import { useNavigate } from "react-router-dom";

export default function Lander() {
  const navigate = useNavigate();
  const socket = useSocket();
  const [newRoom, setnewRoom] = useState("");
  const [joinRoom, setJoinRoom] = useState("");
  const [username, setUsername] = useState("");

  const SubmitUsername = () => {
    if (username.trim() && socket) {
      socket.emit("set-username", username);
    }
  };

  const handleCreateRoom = () => {
    if (newRoom.trim()) {
      socket.emit("create-room", newRoom);
      console.log(`Creating Room : ${newRoom}`);
      navigate(`Room/${newRoom}`);
    }
  };

  const handleJoinRoom = () => {
    if (joinRoom.trim()) {
      socket.emit("join-room", joinRoom);
      console.log(`Joining Room : ${joinRoom}`);
      navigate(`Room/${joinRoom}`);
    }
  };

  useEffect(() => {
    if (!socket) return;
    socket.on("room-created", ({ room, id }) => {
      console.log(`Room - ${room} successfully created by ${id}`);
    });

    socket.on("room-joined", ({ room, id }) => {
      console.log(`User ${id} joined room [${room}]`);
    });
    return () => {
      socket.off("room-created");
      socket.off("room-joined");
    };
  }, [socket]);

  return (
    <>
      <div className="bg-zinc-900 flex flex-col py-10 items-center h-[500px] w-[400px] text-white">
        <h1 className="text-4xl">SyncFlix</h1>

        <input
          placeholder={"Username"}
          className="rounded-none m-4 rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <button
          className="border-2 p-2 border-white rounded-md"
          type="button"
          onClick={SubmitUsername}
        >
          Submit
        </button>
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
