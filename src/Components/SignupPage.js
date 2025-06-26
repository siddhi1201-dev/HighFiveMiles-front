import React from "react";
import { Link } from "react-router-dom"; // Import Link
import leftimage from '../assests/HighFive Miles main page logo.png'




export default function App() {

  return (
    <div className="min-h-screen bg-[#7c73ef] flex items-center justify-center p-8 font-inter"> {/* Increased padding from p-4 to p-8 */}
      <div className="bg-white flex rounded-2xl shadow-lg overflow-hidden max-w-5xl w-full"> {/* Increased max-w from 4xl to 5xl */}
        {/* Left Side - Illustration */}
        <div className="w-1/2 bg-[#F3F0FF] flex items-center justify-center relative rounded-l-2xl">
          <img
            src={leftimage}
            alt="Fitness illustration"
            className="h-full w-full object-contain rounded-l-2xl"
          />
        </div>

        {/* Right Side - Form */}
        <div className="w-1/2 p-12 bg-white rounded-r-2xl text-center flex flex-col justify-center"> {/* Increased padding from p-10 to p-12, added flex-col and justify-center */}
          <h2 className="text-3xl font-bold text-gray-800 mb-3 mt-4">Join Our Community!</h2> {/* Adjusted mb-2 to mb-3 */}
          <p className="text-gray-600 mb-8">Create your account to start your fitness journey.</p> {/* Adjusted mb-6 to mb-8 */}

          <form className="space-y-5"> {/* Increased space-y from 4 to 5 */}
            <input
              type="text"
              placeholder="Username"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" // Increased py-2 to py-3
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" // Increased py-2 to py-3
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" // Increased py-2 to py-3
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" // Increased py-2 to py-3
            />
            
            <button
              type="submit"
              className="w-full bg-[#7B22D8] text-white py-3 rounded-full font-semibold shadow hover:bg-[#691bc0] transition" // Increased py-2 to py-3
            >
              Sign Up
            </button>
          </form>

          <p className="mt-8 text-sm text-gray-600"> {/* Increased mt-6 to mt-8 */}
            Already have an account?{" "}
            <Link to="/" className="text-purple-600 font-semibold cursor-pointer hover:underline"> {/* Use Link */}
              Log In 
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
