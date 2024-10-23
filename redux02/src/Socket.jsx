// SocketContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

// Create a Context for the Socket
const SocketContext = createContext();

// Create a provider component
export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // Initialize the socket connection
        const socketInstance = io('http://localhost:4000'); // Use your server URL here
        setSocket(socketInstance);

        // Clean up on unmount
        return () => socketInstance.close();
    }, []);

    return (
        <SocketContext.Provider value={{socket,helo:"dfceofcb"}}>
            {children}
        </SocketContext.Provider>
    );
};

// Create a custom hook to use the socket context
export const useSocket = () => {
    const socket = useContext(SocketContext);
    return socket;
};
