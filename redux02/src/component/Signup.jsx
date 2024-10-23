import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../Socket";
import Loader from "./Loader";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // For loader state

  const navigate = useNavigate();
  const { socket } = useSocket();

  const usernameRef = useRef(null);
  const emailRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors and server errors before validation
    setErrors({});
    setServerError("");

    const newErrors = {};

    // Validate fields and update errors
    if (!username) {
      newErrors.username = "Username is required";
      usernameRef.current.focus();
    } else if (!email || email.length < 10) {
      newErrors.email = "Email is required and should be at least 10 characters long";
      emailRef.current.focus();
    }

    // If there are errors, stop the form submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Show the loader
    setIsLoading(true);

    try {
      // Simulate a network request delay (for example purposes)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Send email via navigate
      navigate("/signupSec", { state: { email,name:username } });
    } catch (error) {
      console.error("Error during signup:", error);
      setServerError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false); // Hide loader after submission
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Show Loader if isLoading is true */}
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg min-h-[300px]">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Sign Up</h2>
        {isLoading ? 
        <div className="max-h-[200px] mt-4 flex">
          <Loader />
        </div> :
        <form onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="relative mb-6">
            <input
              type="text"
              id="username"
              ref={usernameRef}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`peer w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.username ? "border-red-500" : ""}`}
              placeholder=" " // Keep placeholder empty for styling
              required
            />
            <label
              htmlFor="username"
              className={`absolute bg-white left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-blue-500 peer-focus:text-xs ${username ? "border-blue-500 text-xs top-0 text-blue-500" : ""}`}
            >
              Name
            </label>
            {errors.username && <span className="text-red-500 text-sm">{errors.username}</span>}
          </div>

          {/* Email Input */}
          <div className="relative mb-6">
            <input
              ref={emailRef}
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`peer w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.email ? "border-red-500" : ""}`}
              placeholder=" " // Keep placeholder empty for styling
              required
            />
            <label
              htmlFor="email"
              className={`absolute bg-white left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-blue-500 peer-focus:text-xs ${email ? "border-blue-500 text-xs top-0 text-blue-500" : ""}`}
            >
              Email Address
            </label>
            {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
          </div>

          {/* Server error message */}
          {serverError && <p className="text-red-500 text-sm mb-4">{serverError}</p>}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Sign Up
          </button>
        </form>
      }
      </div>
    </div>
  );
};

export default SignUp;
