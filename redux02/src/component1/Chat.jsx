import React, { useEffect, useState } from 'react';
import { useSocket } from '../Socket';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const { helo, socket } = useSocket();  // Ensure that `useSocket` is correctly returning `socket`

    useEffect(() => {
        if (!socket) return;  // Ensure socket is defined before using it

        // Listen for incoming messages
        const handleMessage = (data) => {
            console.log(data);
            setMessages((prevMessages) => [...prevMessages, data]);  // Update messages state
        };

        socket.on("message", handleMessage);  // Attach the listener

        // Cleanup the listener on component unmount
        return () => {
            socket.off("message", handleMessage);  // Remove the listener
        };
    }, [socket]);  // Add `socket` as a dependency

    const sendMessage = () => {
        if (socket) {
            socket.emit('onlytest', { data: 123 });
        }
    };

    return (
        <div>
            <h1>Chat Room {helo}</h1>
            <button onClick={sendMessage}>Send Message</button>
            <ul>
                {messages.map((msg, idx) => (
                    <li key={idx}>{msg.content}</li>
                ))}
            </ul>
        </div>
    );
};

export default Chat;
