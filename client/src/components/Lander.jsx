import Input from "./Input";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");
export default function Lander() {
    const [newRoom, setnewRoom] = useState("");
    const handleCreateRoom = () => { };

    useEffect(() => {
        socket.on("connect", () => {
            console.log("Hello from" + socket.id);

            return () => {
                socket.off("connect");
                socket.disconnect();
            };
        });
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
                <Input placeholder={"Join Room"} />
                <button
                    className="border-2 p-2 border-white rounded-md mt-4"
                    type="submit"
                >
                    Join
                </button>
            </div>
        </>
    );
}
