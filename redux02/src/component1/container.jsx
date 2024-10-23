import { useDispatch } from "react-redux";

function Container1(){
  let dispatch = useDispatch()
  function onaddclick(){
dispatch({type:"INC"})
  }

  function ondeleteclick(){
    dispatch({type:"DEL"})}
      
    return <>
    <div class="px-4 py-5 my-5 text-center">
    <h1 class="display-5 fw-bold">REdux</h1>
    <div class="col-lg-6 mx-auto">
      
      <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <button type="button" class="btn btn-primary btn-lg px-4 gap-3" onClick={onaddclick}>1+</button>
        <button type="button" class="btn btn-outline-secondary btn-lg px-4" onClick={ondeleteclick}>1-</button>
      </div>
    </div>
  </div>
        </>
}
export default  Container1;
import React, { useEffect, useRef, useState } from 'react';
import { HiArrowUturnLeft } from "react-icons/hi2";
import { useSocket } from '../Socket';

// const VideoConference = () => {

//   const userVideoRef = useRef();
//   const partnerVideoRef = useRef();
//   const peerRef = useRef();
//   const { socket } = useSocket();

//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [room, setRoom] = useState('');

//   const chatEndRef = useRef(null);

//   const user2Details = {
//     name: "Jane Smith",
//     email: "jane.smith@example.com",
//   };

//   const toggleChat = () => {
//     setIsChatOpen(!isChatOpen);
//   };

//   const handleSendMessage = () => {
//     if (newMessage.trim() !== "") {
//       socket.emit('message', { room, message: newMessage });
//       setMessages([...messages, { message: newMessage, sender: "user1" }]);
//       setNewMessage("");
//     }
//   };

//   useEffect(() => {
//     if (!socket) return;
    
//     socket.on('message', (data) => {
//       if (data.sender !== socket.id) 
//         setMessages((prevMessages) => [...prevMessages, data]);
//     });

//     socket.on('offer', async (data) => {
//       await peerRef.current.setRemoteDescription(new RTCSessionDescription(data.offer));
//       const answer = await peerRef.current.createAnswer();
//       await peerRef.current.setLocalDescription(answer);
//       socket.emit('answer', { answer, room });
//     });

//     socket.on('answer', async (data) => {
//       await peerRef.current.setRemoteDescription(new RTCSessionDescription(data.answer));
//     });

//     socket.on('candidate', (data) => {
//       peerRef.current.addIceCandidate(new RTCIceCandidate(data.candidate))
//         .catch(error => console.error('Error adding received ICE candidate:', error));
//     });

//     socket.on('ready', async () => {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//       userVideoRef.current.srcObject = stream;

//       peerRef.current = new RTCPeerConnection({
//         iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
//       });

//       stream.getTracks().forEach(track => peerRef.current.addTrack(track, stream));

//       peerRef.current.onicecandidate = (event) => {
//         if (event.candidate) {
//           socket.emit('candidate', { candidate: event.candidate, room });
//         }
//       };

//       peerRef.current.ontrack = (event) => {
//         partnerVideoRef.current.srcObject = event.streams[0];
//       };

//       const offer = await peerRef.current.createOffer();
//       await peerRef.current.setLocalDescription(offer);
//       socket.emit('offer', { offer, room });
//     });

//     return () => {
//       socket.off('message');
//       socket.off('offer');
//       socket.off('answer');
//       socket.off('candidate');
//       socket.off('ready');
//     };
//   }, [room, socket]);

//   const joinRoom = async () => {
//     socket.emit('joinRoom', room);
//   };

//   useEffect(() => {
//     if (chatEndRef.current) {
//       chatEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages]);

//   return (
//     <div className="flex flex-col w-full h-full  items-center justify-center  bg-gray-100 ">
//       {/* Main Content Area */}
//       <div className={`flex justify-center relative w-full h-[80vh] flex-row gap-3  ${isChatOpen ? 'lg:flex-col' : ''}`}>
//         {/* Left Side: User 1 (Local User) */}
//         <div className="left-1 bottom-3 fixed items-center w-1/4 bg-white shadow-lg rounded-lg ">
         
//             {userVideoRef && <video ref={userVideoRef} className="conta" autoPlay style={{ width: '100%', height: '100%' }} />}

//         </div>

//         {/* Right Side: User 2 (Remote User) - Larger Size */}
//         <div className={`flex lg:flex-col  items-center lg:w-[100vw]  p-2 bg-white shadow-lg rounded-lg 
//           ${isChatOpen ? 'lg:flex-row' : ''}`}>
          
//           {/* Partner Video Area */}
//           <div className={`bg-gray-300 transition-all duration-500 p-0 rounded-lg flex items-center justify-center 
//             ${isChatOpen ? 'lg:w-1/2 w-full' : 'lg:w-full w-full'}`}>
//             <video ref={partnerVideoRef} className='w-full' autoPlay style={{ width: '100%' }} />
//           </div>

//           {/* Chat Area (WhatsApp-like) */}
//           {isChatOpen && (
//             <div className="transition-all duration-500 h-full top-20 right-2 lg:w-1/2 w-full bg-white shadow-lg rounded-t-lg p-2">
//               <div className="flex justify-evenly items-end mb-2">
//                 <button onClick={toggleChat} className="text-gray-600">
//                   <HiArrowUturnLeft className='bold text-[20px]' />
//                 </button>
//                 <h2 className="text-lg font-bold mx-auto self-center">Chat</h2>
//               </div>

//               {/* Chat Messages Area */}
//               <div className="flex-grow flex h-full flex-col gap-y-4 overflow-y-auto bg-gray-100 p-2 rounded-lg" style={{ maxHeight: '60%' }}>
//                 {messages.map((message, index) => (
//                   <div
//                     key={index}
//                     className={`mb-2 py-2 pl-3 flex items-center max-w-[80%] w-full rounded-[39px] ${
//                       message.sender === "user1"
//                         ? "bg-blue-500 text-white self-end"
//                         : "bg-gray-300 text-black self-start"
//                     }`}
//                   >
//                     {message.message}
//                   </div>
//                 ))}
//                 {/* Reference for scrolling to the bottom */}
//                 <div ref={chatEndRef} />
//               </div>

//               {/* Message Input Area */}
//               <div className="mt-4 flex items-center">
//                 <input
//                   type="text"
//                   value={newMessage}
//                   onChange={(e) => setNewMessage(e.target.value)}
//                   placeholder="Type a message..."
//                   className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />
//                 <button
//                   onClick={handleSendMessage}
//                   className="bg-blue-500 text-white w-20 py-2 rounded-r-lg"
//                 >
//                   Send
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Bottom Center: Control Buttons */}
//       <div className="mt-3 flex space-x-4">
//         <button className="bg-blue-500 text-white font-bold py-2 px-6 rounded-full hover:bg-blue-600">
//           Mute
//         </button>
//         <button className="bg-blue-500 text-white font-bold py-2 px-6 rounded-full hover:bg-blue-600">
//           Blind
//         </button>
//         <button className="bg-red-500 text-white font-bold py-2 px-6 rounded-full hover:bg-red-600">
//           End
//         </button>
//         <button
//           onClick={toggleChat}
//           className="bg-green-500 text-white font-bold py-2 px-6 rounded-full hover:bg-green-600"
//         >
//           Message
//         </button>
//       </div>
//     </div>
//   );
// };

// export default VideoConference;
