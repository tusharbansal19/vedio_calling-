import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSocket } from "../Socket";
import Loader from "./Loader";

const SignUpSec = () => {
  const location = useLocation();
  const { email: initialEmail, name } = location.state || {};
  const [email, setEmail] = useState(initialEmail || ""); // Added email state
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // For loader state

  const navigate = useNavigate();
  const { socket } = useSocket();

  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const emailRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setServerError("");

    const newErrors = {};
    if (!email) navigate("/signup");

    if (!password) {
      newErrors.password = "Password is required";
      passwordRef.current.focus();
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      confirmPasswordRef.current.focus();
    }

    // If there are errors, stop the form submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Show the loader
    setIsLoading(true);
    console.log("sdlqwnkdcnqowc"+email,name,password)

    try {
      const response = await fetch("http://localhost:4000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      const data = await response.json(); // Parse response data
      localStorage.setItem("email", email);
      localStorage.setItem("token", data.token);
      setIsLoading(false); // Store token in local storage
      navigate("/"); // Redirect to home page
    } catch (error) {
      console.error("Error during registration:", error);
      setServerError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false); // Hide loader after submission
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg min-h-[300px]">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Sign Up</h2>
        {isLoading ? (
          <div className="max-h-[200px] mt-4 flex">
            <Loader />
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Password Input */}
            <div className="relative mb-6">
              <input
                type="password"
                id="password"
                ref={passwordRef}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`peer w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.password ? "border-red-500" : ""}`}
                placeholder=" " // Keep placeholder empty for styling
                required
              />
              <label
                htmlFor="password"
                className={`absolute bg-white left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-blue-500 peer-focus:text-xs ${password ? "border-blue-500 text-xs top-0 text-blue-500" : ""}`}
              >
                Password
              </label>
              {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
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

            {/* Confirm Password Input */}
            <div className="relative mb-6">
              <input
                type="password"
                id="password"
             
                value={confirmPassword}
                ref={confirmPasswordRef}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`peer w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.confirmPassword ? "border-red-500" : ""}`}
                placeholder=" " // Keep placeholder empty for styling
                required
              />
              <label
                htmlFor="password"
                className={`absolute bg-white left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-blue-500 peer-focus:text-xs ${password ? "border-blue-500 text-xs top-0 text-blue-500" : ""}`}
              >
                confirmPassword
              </label>
              {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword}</span>}
            </div>

            {/* <div className="relative mb-6">
              <input
               
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`peer w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.confirmPassword ? "border-red-500" : ""}`}
                placeholder=" "
              />
              <label
                htmlFor="confirmPassword"
                className={`absolute bg-white left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-blue-500 peer-focus:text-xs`}
              >
                Confirm Password
              </label>
              {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword}</span>}
            </div>

            {/* Server error message */}
          

            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Sign Up
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUpSec;
