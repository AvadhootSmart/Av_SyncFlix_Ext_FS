import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSocket } from "../SocketContext";
import { FaPause, FaPlay } from "react-icons/fa";
import { GiNextButton } from "react-icons/gi";

//default-ltr-cache-1enhvti [Play- Pause button]
//<button aria-label="Play" class=" default-ltr-cache-1enhvti" data-uia="control-play-pause-play"><div class="control-medium default-ltr-cache-iyulz3" role="presentation"><svg xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" role="img" data-icon="PlayStandard" aria-hidden="true" class="svg-icon-nfplayerPlay"><path d="M5 2.69127C5 1.93067 5.81547 1.44851 6.48192 1.81506L23.4069 11.1238C24.0977 11.5037 24.0977 12.4963 23.4069 12.8762L6.48192 22.1849C5.81546 22.5515 5 22.0693 5 21.3087V2.69127Z" fill="currentColor"></path></svg></div></button>
//<div class="medium default-ltr-cache-m1ta4i" data-uia="video-title">All Quiet on the Western Front</div>
export default function Room() {
  const socket = useSocket();
  const { RoomId } = useParams();
  const [members, setMembers] = useState([]);

  useEffect(() => {
    if (!socket) return;
    socket.on("room-members", (members) => {
      setMembers(members);
    });

    return () => {
      socket.off("room-members");
    };
  }, [socket]);

  return (
    <>
      <div className="bg-zinc-900 flex flex-col py-8 items-center h-[500px] w-[400px] text-white">
        <h1>RoomName: {RoomId}</h1>
        {members.length > 0 ? (
          <div className="mt-5 flex flex-col w-[400px] px-4 mb-8">
            <h1>Members:</h1>
            <ol type="1" className="flex flex-col list-decimal mx-10">
              {members.map((member, index) => (
                <li key={index} className="text-white">
                  {member}
                </li>
              ))}
            </ol>
          </div>
        ) : (
          <h1 className="text-white mt-4">No members in the Room</h1>
        )}
        <div className="w-[400px] px-4">
          <h1>Now Watching -</h1>
          <div className="mt-8 scale-225 flex gap-8">
            <FaPlay className="hover:scale-150 transition" />
            <FaPause className="hover:scale-150 transition" />
            <GiNextButton className="hover:scale-150 transition" />
          </div>
        </div>
      </div>
    </>
  );
}
