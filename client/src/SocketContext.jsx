import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

// Create a context
const SocketContext = createContext();

// Custom hook to use the socket context
export const useSocket = () => {
  return useContext(SocketContext);
};

// Socket Provider Component
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Create a new socket connection
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Client connected to the websocket server", newSocket.id);
    });

    newSocket.on("disconnect", () => {
      console.log(newSocket.id, " disconnected");
    });

    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
