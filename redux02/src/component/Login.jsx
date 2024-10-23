import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "./Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[loging,setIsLoading]=useState(false);
const nevigator=useNavigate()
  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

  
      const data = await response.json();
      console.log(data+"data")
      localStorage.setItem("email", email);
      localStorage.setItem("token", data.token); 
      nevigator("/");
      // Parse response data // Return data for further use (like storing token)
    } catch (error) {
      console.error("Error during registration:", error);
      throw error; // Rethrow to be handled in the calling function
    
    } finally {
      setIsLoading(false); // Hide loader after submission
    }
  };




  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h2>
          
            {
          loging? <div className=""><Loader/></div>:
        <form onSubmit={handleSubmit}>
          {/* Email Input with Floating Label */}

          <div className="relative mt-2 mb-6">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`peer w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400
                ${email ? "border-blue-500" : ""}
                `}
                placeholder=" " // Keep placeholder empty for styling
                required
                />
            <label
              htmlFor="email"
              className={`absolute bg-white left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-blue-500 peer-focus:text-xs ${email ? "border-blue-500 text-xs top-0 text-blue-500" : ""}`}
              >
              Email Address
            </label>
          </div>

         
          <div className="relative mb-6 mt-2">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`peer w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400
                ${password ? "border-blue-500" : ""}
              `}
              placeholder=" "
              required
              />
            <label
              htmlFor="password"
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 bg-white text-gray-500 text-sm transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-blue-500 peer-focus:text-xs ${password ? "border-blue-500 text-xs top-0 text-blue-500" : ""}`}
            >
              Password
            </label>
          </div>

          {/* Server error message */}
         

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
            Login
          </button>

          <p>if you don;t have account <Link to="/signup" className="text-red-700 dark:text-green-500 underline">Sign in</Link></p>
        </form>
          }
      </div>
    </div>
  );
};

export default Login;
