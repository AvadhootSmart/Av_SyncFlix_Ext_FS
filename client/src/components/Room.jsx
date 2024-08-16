import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSocket } from "../SocketContext";

export default function Room() {
  //const socket = useSocket();
  const { RoomId } = useParams();
  useEffect(() => {}, []);

  return (
    <>
      <div className="bg-zinc-900 flex flex-col py-10 items-center h-[500px] w-[400px] text-white">
        <h1>RoomName: {RoomId}</h1>
      </div>
    </>
  );
}
