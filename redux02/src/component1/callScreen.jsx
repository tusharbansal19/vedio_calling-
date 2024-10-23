import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSocket } from '../Socket';


const CallScreen = () => {
  const [loading, setLoading] = useState(false);
const {socket}=useSocket()
const location = useLocation();
const { email, name, userEmail } = location.state || {};
let navigator=useNavigate();
  const userDetails = {
    name: "John Doe",
    phone: "+1 (555) 123-4567",
    email: "john.doe@example.com",
  };

  useEffect(()=>{
    if(!socket)
      return;
    socket.on('readytogo',()=>{
      setLoading(false);
      navigator("/vedio-conference",{ state: {email,} })
      
    });



    
  },[socket]);

  const handleCall = () => {
    setLoading(true);
   

    socket.emit("initiate-call", {
      callerEmail: userEmail,
      contactEmail: email,
    });
    navigator("/vedio-conference",{ state: {email,} })
   
    
   
 
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Call</h1>

      {/* Main Content Area */}
      <div className="flex flex-col md:flex-row  items-center justify-center gap-x-14 bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl mx-auto">
        {/* Left Side: User Details and Call Button */}
        <div className="flex justify-center items-center ">

        <div className="flex flex-col items-start md:w-1/2 mb-4 md:mb-0">
          <h2 className="text-xl font-semibold">{name}</h2>
          
          <p className="text-gray-600">Email: {email}</p>

          {loading ? (
            <div className="flex items-center mt-4">
              <div className="animate-spin h-5 w-5 border-4 border-blue-500 border-t-transparent rounded-full mr-2"></div>
              <span>Loading...</span>
            </div>
          ) : (
            <button
            onClick={handleCall}
            className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Call
            </button>
          )}
        </div>
          </div>

        {/* Right Side: Call Illustration */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src="https://via.placeholder.com/300" // Replace with your image URL
            alt="Call Illustration"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default CallScreen;
