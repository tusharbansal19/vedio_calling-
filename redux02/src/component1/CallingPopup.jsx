import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../Socket';
function CallingPopup({ name, emails, handleAcceptCallback}){
let {socket}=useSocket();
let nevigator=useNavigate();
    


  return (
    <div className="flex gap-x-3 items-center justify-center max-h-[800px] max-w-[1000px] w-full h-full rounded-3xl py-2 bg-gray-900">
      <div className="text-center mb-10">
        <h2 className="text-white text-2xl font-semibold">Incoming Call</h2>
        <p className="text-gray-400 mt-2">{name}</p>
      </div>

      <div className="flex space-x-10">
        {/* Reject Button */}
        <button
          onClick={()=>handleAcceptCallback(false)}
          className="bg-red-600 text-white rounded-full h-20 w-20 flex items-center justify-center shadow-lg transition-transform transform hover:scale-110 active:scale-95"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Accept Button */}
        <button
          onClick={()=>handleAcceptCallback(true)}
          className="bg-green-500 text-white rounded-full h-20 w-20 flex items-center justify-center shadow-lg transition-transform transform hover:scale-110 active:scale-95"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 14L21 3m-9 4v4M4 20v-7a3 3 0 013-3h3a3 3 0 013 3v7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};



export default CallingPopup;