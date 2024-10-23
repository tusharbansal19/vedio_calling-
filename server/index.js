const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { connectDB } = require('./model/model');
const router = require('./router/routes');
const cors=require('cors');
// Create the Express app and HTTP server
const app = express();
const server = http.createServer(app);







app.use(cors(
  {
    origin: "http://localhost:5173"
  }
));
app.use(express.json())
app.use("/",router);


const io = socketIo(server, {
    cors: {
        origin: "http://localhost:5173", 
        methods: ['GET', 'POST']
    }
});




connectDB();
let emailToSocketId = {};
let socketIdToEmail = {};



// Track connected rooms
io.on('connection', (socket) => {
    // socket.on("acknolege",(acceptCall)=>{
    // //   console.log(acceptCall)
    // //     io.to(acceptCall).emit('readytogo');
    // // console.log("is sending ")
    // // });

    socket.on("user_data", (data) => {
        const userEmail = data.email;
        
        // Map email to socket ID and vice versa
        emailToSocketId[userEmail] = socket.id;
        socketIdToEmail[socket.id] = userEmail;
    
        console.log(`${userEmail} is connected with socket ID: ${socket.id}`);
      });

    console.log('New client connected:', socket.id);


    socket.on('joinRoom', (room) => {
        socket.join(room);
        console.log(`${socket.id} joined room ${room}`);
        
        // Check the number of participants in the room
        const roomSize = io.sockets.adapter.rooms.get(room)?.size || 0;
        if (roomSize === 2) {
            // If there are two participants, notify both that they can start signaling
            io.to(room).emit('ready');
        }
    });

    // Receive and forward WebRTC offer
    socket.on('offer', (data) => {
        const { offer, room } = data;
        socket.to(room).emit('offer', { offer });
    });

    // Receive and forward WebRTC answer
    socket.on('answer', (data) => {
        const { answer, room } = data;
        socket.to(room).emit('answer', { answer });
    });

    // Receive and forward ICE candidates
    socket.on('candidate', (data) => {
        const { candidate, room } = data;
        socket.to(room).emit('candidate', { candidate });
    });
    //  tosVfC1hYHc4z3VTbkAAAR
    socket.on('message', (data) => {
        const { room, message } = data;

        // Broadcast the message to the entire room
        console.log("messages"+message)
        io.to(room).emit('message', { message, sender: socket.id });
 
    });

    // Handle client disconnection
    socket.on("initiate-call", ({ callerEmail, contactEmail }) => {
        console.log(`${callerEmail} is calling ${contactEmail}`);
    
        // Find the socket ID of the contact to be called
        const contactSocketId = emailToSocketId[contactEmail];
    
        if (contactSocketId) {
          // Emit an event to the contact's client, notifying them of the incoming call
          io.to(contactSocketId).emit("incoming-call", { callerEmail });
          console.log(`Notified ${contactEmail} about the call from ${callerEmail}`);
        } else {
          console.log(`Contact ${contactEmail} is not online.`);
        }
      });
    //   john.doe@example.com
    //   ane.smith@example.com
      // Handle socket disconnection
      socket.on("disconnect", () => {
        console.log("A user disconnected", socket.id);
    
        // Find the user's email using their socket ID
        const userEmail = socketIdToEmail[socket.id];
    
        if (userEmail) {
          // Remove the user from both mappings
          delete emailToSocketId[userEmail];
          delete socketIdToEmail[socket.id];
    
          console.log(`${userEmail} has been removed from the online list.`);
        }
      });
    
});

// Start the server on port 4000
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
