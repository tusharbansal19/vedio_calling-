import React, { useEffect, useRef, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../Socket";
import CallingPopup from "./CallingPopup";

const Home = () => {
  const { helo, socket } = useSocket();
  const [searchTerm, setSearchTerm] = useState("");
  const [menuClick, setMnuClick] = useState(false);
  const menuRef = useRef(null);
  const [acceptCall, setacceptCall] = useState(false);
  const navigator = useNavigate();
  const userEmail = localStorage.getItem("email"); // Fetch user email from localStorage

  const contacts = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      name: "Bob Brown",
      email: "bob.brown@example.com",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 5,
      name: "Charlie Davis",
      email: "charlie.davis@example.com",
      image: "https://via.placeholder.com/150",
    },
  ];

  const recentCalls = [
    {
      id: 1,
      name: "Alice Johnson",
      time: "Yesterday, 3:15 PM",
      email: "alice.johnson@example.com",
    },
    {
      id: 2,
      name: "John Doe",
      time: "2 days ago, 11:00 AM",
      email: "john.doe@example.com",
    },
  ];

  // Filter contacts based on the search term
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTaskOption = (option) => {
    switch (option) {
      case "contacts":
        console.log("Contacts clicked");
        break;
      case "logout":
        console.log("Logout clicked");
        break;
      case "useAnotherAccount":
        console.log("Use another account clicked");
        break;
      default:
        break;
    }
    setMnuClick(false); // Close the menu after selecting an option
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMnuClick(false);
    }
  };

  const handleScroll = () => {
    setMnuClick(false);
  };
  const handleAcceptCallback = (answer) => {
    if(answer){
      
      console.log("room name"+acceptCall)
      socket.emit("acknolege",acceptCall)
      navigator("/vedio-conference",{ state: {email:acceptCall} })
      setacceptCall(false);
      
    }
    setacceptCall(false);
    
  };

  useEffect(() => {
    if (!socket) return;
console.log("calling event"+localStorage.getItem("email"))
    socket.emit("user_data", { email: localStorage.getItem("email") });
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    socket.on("sending-calling", (data) => {
      navigator("/");
    });
    socket.on("incoming-call", (data) => {
      console.log("Incoming call from:", data.callerEmail);
      setacceptCall(data.callerEmail);
      // Set the caller's email in state
    });

    // Cleanup the event listener on component unmount
    return () => {
      socket.off("incoming-call");
   
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
      socket.off("sending-calling");
    };
  }, [socket]);

  const handleCallClick = (contact) => {
    navigator("/callScreen",{ state: {email:contact.email,userEmail,name:contact.name} })
  };
  

  return (
    <div className="min-h-screen bg-gray-100 relative">
      {acceptCall && (
        <div className="w-[100%] flex justify-center items-center mx-auto max-h-[30%] absolute top-3">
          <CallingPopup name={acceptCall} handleAcceptCallback={handleAcceptCallback} />
        </div>
      )}

      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex justify-center items-center">
            <img
              src="https://via.placeholder.com/40"
              alt="User Logo"
              className="rounded-full border-2 border-gray-300"
            />
            <h1 className="text-3xl font-bold text-gray-800 ml-3">
              My Contacts
            </h1>
          </div>
          <div className="flex justify-center items-center">
            <div className="top-10 left-5">
              <img
                src="https://via.placeholder.com/30"
                alt="User Logo"
                className="rounded-full border-2 border-gray-300"
              />
            </div>
            <div className="ml-2 relative">
              <button
                className="text-gray-600 focus:outline-none"
                onClick={() => setMnuClick(!menuClick)}
              >
                {!menuClick ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.5 5.5a.5.5 0 011 0v9a.5.5 0 01-1 0v-9zM10 5.5a.5.5 0 011 0v9a.5.5 0 01-1 0v-9zM16.5 5.5a.5.5 0 011 0v9a.5.5 0 01-1 0v-9z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <RxCross1 className="text-[20px]" />
                )}
              </button>

              {menuClick && (
                <div
                  ref={menuRef}
                  className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10"
                >
                  <button
                    onClick={() => handleTaskOption("contacts")}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-200 w-full text-left"
                  >
                    Contacts
                  </button>
                  <button
                    onClick={() => handleTaskOption("logout")}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-200 w-full text-left"
                  >
                    Use Another Account
                  </button>
                  <button
                    onClick={() => {
                      handleTaskOption("useAnotherAccount");
                      localStorage.clear();
                      navigator("/login");
                    }}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-200 w-full text-left"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-2">
          <input
            type="text"
            placeholder="Search Contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mt-4 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContacts.length > 0 &&
            filteredContacts.map((contact) => (
              <div
                key={contact.id}
                className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center space-y-4"
              >
                <img
                  src={contact.image}
                  alt={contact.name}
                  className="w-24 h-24 rounded-full border border-gray-300"
                />
                <div className="text-center">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {contact.name}
                  </h2>
                  <p className="text-gray-600">{contact.email}</p>
                </div>
                <button
                  className="mt-2 text-blue-500 hover:text-blue-700"
                  onClick={() => handleCallClick(contact)}
                >
                  Call
                </button>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
