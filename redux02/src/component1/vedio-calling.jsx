
import React, { useEffect, useRef, useState } from 'react';
import { BiMessageAltEdit } from "react-icons/bi";
import { BsFillMicMuteFill } from "react-icons/bs";
import { GrReturn } from "react-icons/gr";
import { HiArrowUturnLeft } from "react-icons/hi2";
import { IoSendSharp } from "react-icons/io5";
import { MdOutlineStopScreenShare } from "react-icons/md";
import { useLocation, useNavigate } from 'react-router-dom';
import { useSocket } from "../Socket";
const VideoConference = () => {
  const nevigator=useNavigate();
  const location = useLocation();
  const { email } = location.state || {};
  const {socket}=useSocket();
  const userVideoRef = useRef();
  const partnerVideoRef = useRef();
  const peerRef = useRef();
  
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [room, setRoom] = useState('');
  
  const chatEndRef = useRef(null);

  const user2Details = {
    name: "Jane Smith",
    email: "jane.smith@example.com",
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleSendMessage = () => {
        if (newMessage.trim() !== "") {
          socket.emit('message', { room, message: newMessage });
         
          setMessages([...messages, { message: newMessage, sender: "user1" }]);
    
          console.log("me"+messages);
          setNewMessage("");
        }
      };

      const joinRoom = async () => {

  console.log("room"+room.type)
        await socket.emit('joinRoom',room);
      };
  useEffect(() => {
    if(!socket)
            return ;
          
          
          socket.on('message', (data) => {
            console.log("sender"+messages);
            console.log(data.sender+"and"+socket.io)
            if(data.sender!=socket.id) 
              setMessages((prevMessages) => [...prevMessages, data]);
          });

          socket.on('offer', async (data) => {
      await peerRef.current.setRemoteDescription(new RTCSessionDescription(data.offer));
      const answer = await peerRef.current.createAnswer();
      await peerRef.current.setLocalDescription(answer);
      socket.emit('answer', { answer, room });
    });

    socket.on('answer', async (data) => {
      await peerRef.current.setRemoteDescription(new RTCSessionDescription(data.answer));
    });
    
    socket.on('candidate', (data) => {
      peerRef.current.addIceCandidate(new RTCIceCandidate(data.candidate))
        .catch(error => console.error('Error adding received ICE candidate:', error));
    });

    socket.on('ready', async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      userVideoRef.current.srcObject = stream;
      
      peerRef.current = new RTCPeerConnection({
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' }
        ]
      });

      stream.getTracks().forEach(track => peerRef.current.addTrack(track, stream));

      peerRef.current.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit('candidate', { candidate: event.candidate, room });
        }
      };
      
      peerRef.current.ontrack = (event) => {
        partnerVideoRef.current.srcObject = event.streams[0];
      };
      
      const offer = await peerRef.current.createOffer();
      await peerRef.current.setLocalDescription(offer);
      socket.emit('offer', { offer, room });
    });
    
    if(email){
      socket.emit('joinRoom', email);  
      console.log("room entererd "+email)
            }
    return () => {
      socket.off('message');
      socket.off('offer');
      socket.off('answer');
      socket.off('candidate');
      socket.off('ready');
    };
  }, [room,socket]);


  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex flex-col items-center max-w-[100vw] overflow-hidden   max-h-[100vh] bg-gray-100 ">
      
      <div className="flex justify-center flex-col  lg:flex-row  gap-2  relative w-full ">
        {/* Left Side: User 1 (Local User) - Smaller Fixed Size */}
        {
          !isChatOpen&&
        <div className="left-2  bottom-2 fixed items-center  h-48 rounded-lg flex -center justify-center  max-w-[300px]  bg-white shadow-lg ">
         
            <video ref={userVideoRef} autoPlay style={{ width: '100%', height: '100%' }} />
       
        </div>
        }



        {/* Right Side: User 2 (Remote User) - Larger Size */}
        <div className="w-full flex flex-col justify-center items-center pb-2 h-full ">

        <div className= {`flex flex-col  lg:max-h-[79vh] items-center h-[79vh] lg:h-[85vh] w-full border-0.5 ${isChatOpen&&'max-h-[50vh] lg:max-h-[79vh] hidden lg:flex '}  bg-white shadow-lg rounded-lg`}  >
    
            <video ref={partnerVideoRef} className='h-[80vh] w-[100vw]' autoPlay style={{  height:"80vh" }} />
      
          {/* User 2 Details */}
        </div>
        <div className={` lg:flex gap-x-5  justify-center ${isChatOpen&&'lg:flex hidden '}   items-center flex-col lg:flex-row `}>

        <div className="mt-8    bottom-5 flex space-x-4" >
        <button className="bg-blue-500 text-white font-bold p-3 item-center  align-content-center  rounded-full  hover:bg-blue-600">
        <BsFillMicMuteFill className=" text-[2rem]" />
        </button>
        <button className="bg-blue-500 text-white font-bold p-3 item-center  align-content-center  rounded-full  hover:bg-blue-600" >
        <MdOutlineStopScreenShare  className=" text-[2rem]"/>
        </button>
        <button className="bg-red-500 text-white font-bold p-3 item-center  align-content-center  rounded-full  hover:bg-red-600" onClick={()=>{
         
         userVideoRef.current.srcObject = null
         partnerVideoRef.current.srcObject = null
         socket.emit('leaveRoom', email);
         console.log("room left "+email)
         nevigator("/")
         
       }}>
        <GrReturn  className=" text-[2rem]"/>
        </button>
        <button
          onClick={toggleChat}
          className="bg-green-500 text-white font-bold p-3 item-center  align-content-center  rounded-full  hover:bg-green-600"
        >
<BiMessageAltEdit  className=" text-[2rem]"/>        </button>
      </div>

      {/* Chat Area (WhatsApp-like) */}
     

      {/* Room input */}
      <div className="mt-4  bottom-20">
        <input
          type="text"
          placeholder="Room Name"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg"
          />
        <button onClick={joinRoom} className="ml-2 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600">
          Join Room
        </button>
      </div>
        </div>
        </div>
        {(isChatOpen) && (
        <div className="  transition-all duration-500 h-full right-2  max-w-full lg:max-w-[780px]  w-full  bg-white shadow-lg rounded-t-lg p-2">
          <div className="flex justify-evenly items-end r mb-2">
            <button onClick={toggleChat} className="text-gray-600">
              <HiArrowUturnLeft className=' bold text-[20px]' />
            </button>
            <h2 className="text-lg font-bold mx-auto  self-center text-[40px]">Chat</h2>
          </div>

          {/* Chat Messages Area */}
          <div className="flex-grow flex  flex-col min-h-[80%] lg:min-h-[60%]  w-full gap-y-4 overflow-y-auto bg-gray-100 p-2 rounded-lg h-[80vh] lg:h-[80vh]">
            {messages.map((message, index) => (
           
              <div

                key={index}
                className={`mb-2 py-2 pl-3 flex items-center  w-[50%] lg:w-full  max-w-[400px] rounded-[39px] ${
                  message.sender === "user1"
                    ? "bg-blue-500 text-white self-end"
                    : "bg-gray-300 text-black self-start"
                }`}
              >
                {message.message}
              </div>
            ))}
            {/* Reference for scrolling to the bottom */}
            <div ref={chatEndRef} />
          </div>

          {/* Message Input Area */}
          <div className="mt-4 flex items-center">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-grow px-4 py-3  underline-offset-0  border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400" onKeyDown={(e)=>{
                if(e.key === 'Enter'&&newMessage.length > 0){
                  handleSendMessage();
                }
              }}
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 mb-3 text-white p-4 rounded-r-full"
            >
             <IoSendSharp />
            </button>
          </div>
        </div>
      )}
      </div>

      {/* Bottom Center: Control Buttons */}
 
    </div>
  );
};

export default VideoConference;
