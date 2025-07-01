// import React from "react";
// import leftimage from '../assests/HighFive Miles main page logo.png'
// import { Link } from "react-router-dom"; // Import Link

// export default function LoginPage() {
//   return (
//     <div className="min-h-screen bg-[#7c73ef] flex items-center justify-center p-8 front-inter">
//       <div className="bg-white flex rounded-2xl shadow-lg overflow-hidden max-w-5xl w-full">
//         {/* Left Side - Illustration */}
//         <div className="w-1/2 bg-[#F3F0FF] flex items-center justify-center  relative rounded-l-2xl">
//          <img
//           src={leftimage}
//             alt="Fitness illustration"
//             className="h-full w-full object-contain rounded-l-2xl"

//          />
//         </div>

//         {/* Right Side - Form */}
//         <div className="w-1/2 p-12 bg-white rounded-r-2xl text-center flex flex-col justify-center">
//           <h2 className="text-3xl font-bold text-gray-800 mb-3 mt-4">Welcome Back!</h2>
//           <p className="text-gray-600 mb-10">Log in to continue your fitness journey.</p>

//           <form className="space-y-6">
//             <input
//               type="text"
//               placeholder="Email or Username"
//               className="w-full px-4 py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               className="w-full px-4 py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//             />
//             <div className="text-right text-sm text-purple-600 cursor-pointer hover:underline">
//               Forgot password?
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-[#7B22D8] text-white py-3 rounded-full font-semibold shadow hover:bg-[#691bc0] transition"
//             >
//               Log In
//             </button>
//             <div className="flex items-center gap-2">
//               <div className="flex-grow h-px bg-gray-300"></div>
//               <span className="text-gray-500 text-sm">OR</span>
//               <div className="flex-grow h-px bg-gray-300"></div>
//             </div>
//             {/* <button
//               type="button"
//               className="w-full bg-green-500 text-white py-2 rounded-full font-semibold hover:bg-green-600 transition"
//             >
//               G Continue with Google
//             </button>
//             <button
//               type="button"
//               className="w-full bg-black text-white py-2 rounded-full font-semibold hover:bg-gray-800 transition"
//             >
//               ⌘ Continue with Apple
//             </button> */}
//           </form>

//           <p className="mt-6 text-sm text-gray-600 text-center">
//             Don't have an account?{" "}
//             <Link to="/signup" className="text-purple-600 font-semibold cursor-pointer hover:underline"> {/* Use Link */}
//               Sign Up
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react"; // Import useState for managing form state
import leftimage from "../assests/HighFive Miles main page logo.png";
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate
import event1 from "../assests/events1.jpg";
import event2 from "../assests/events2.jpg";
import event3 from "../assests/events3.jpg";
import event4 from "../assests/events4.jpg";
import logingirl from "../assests/logingirl.jpg";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State to hold any login errors
  const [loading, setLoading] = useState(false); // State for loading indicator
  const navigate = useNavigate(); // Hook for navigation

  // Define your API base URL
  const API_BASE_URL = "http://localhost:5000/api"; // **IMPORTANT: Adjust this to your actual backend URL**

  // Array of background images for cycling (placeholders)
  const backgroundImages = [event1, event2, event3, event4];

  // State to manage the current background image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // useEffect for cycling background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % backgroundImages.length
      );
    }, 5000); // Change image every 5 seconds (5000 milliseconds)

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [backgroundImages.length]); // Re-run effect if backgroundImages array length changes
const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json(); // ✅ Only once

    if (response.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (!data.profile) {
        navigate("/profile"); // First-time login
      } else {
        navigate("/profile"); // Already has profile
      }
    } else {
      setError(data.msg || "Login failed. Please try again.");
      console.error("Login failed:", data.msg);
    }
  } catch (err) {
    setError("Network error. Please try again later.");
    console.error("Network error during login:", err);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* 🔁 Background Image - blurred + behind */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out z-[-1]"
        style={{
          backgroundImage: `linear-gradient(rgba(24,24,27,0.9), rgba(24,24,27,0.8)),url(${backgroundImages[currentImageIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* 🔲 Overlay to darken if needed */}

      <div className="min-h-screen flex items-center justify-center p-8 font-inter">
        {" "}
        {/* Corrected typo: front-inter -> font-inter */}
        <div className="bg-white flex rounded-2xl shadow-lg overflow-hidden max-w-3xl w-full">
          {/* Left Side - Illustration */}
          <div className="w-1/2 bg-[#F3F0FF] flex items-center justify-center relative rounded-l-2xl">
            <img
              src={logingirl}
              alt="Fitness illustration"
              className="h-full w-full object-contain rounded-l-2xl"
            />
          </div>

          {/* Right Side - Form */}
          <div className="w-1/2 p-12 bg-white rounded-r-2xl text-center flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-3 mt-4">
              Welcome Back!
            </h2>
            <p className="text-gray-600 mb-10">
              Log in to continue your fitness journey.
            </p>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {" "}
              {/* Add onSubmit handler */}
              {error && ( // Display error message if present
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                  role="alert"
                >
                  <span className="block sm:inline">{error}</span>
                </div>
              )}
              <input
                type="text" // Can be email or username, backend expects email
                placeholder="Email or Username"
                className="w-full px-4 py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={email} // Controlled component
                onChange={(e) => setEmail(e.target.value)} // Update state on change
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={password} // Controlled component
                onChange={(e) => setPassword(e.target.value)} // Update state on change
                required
              />
              <div className="text-right text-sm text-purple-600 cursor-pointer hover:underline">
                Forgot password?
              </div>
              <button
                type="submit"
                className="w-full bg-[#7B22D8] text-white py-3 rounded-full font-semibold shadow hover:bg-[#691bc0] transition disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading} // Disable button when loading
              >
                {loading ? "Logging In..." : "Log In"}{" "}
                {/* Change button text when loading */}
              </button>
              <div className="flex items-center gap-2">
                <div className="flex-grow h-px bg-gray-300"></div>
                <span className="text-gray-500 text-sm">OR</span>
                <div className="flex-grow h-px bg-gray-300"></div>
              </div>
              {/* Social login buttons commented out */}
            </form>

            <p className="mt-6 text-sm text-gray-600 text-center">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-purple-600 font-semibold cursor-pointer hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
