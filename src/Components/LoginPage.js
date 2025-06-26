
import React from "react";
import leftimage from '../assests/HighFive Miles main page logo.png'
import { Link } from "react-router-dom"; // Import Link


export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#7c73ef] flex items-center justify-center p-8 front-inter">
      <div className="bg-white flex rounded-2xl shadow-lg overflow-hidden max-w-5xl w-full">
        {/* Left Side - Illustration */}
        <div className="w-1/2 bg-[#F3F0FF] flex items-center justify-center  relative rounded-l-2xl">
         <img
          src={leftimage}
            alt="Fitness illustration"
            className="h-full w-full object-contain rounded-l-2xl"
         
         />
        </div>

        {/* Right Side - Form */}
        <div className="w-1/2 p-12 bg-white rounded-r-2xl text-center flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-3 mt-4">Welcome Back!</h2>
          <p className="text-gray-600 mb-10">Log in to continue your fitness journey.</p>

          <form className="space-y-6">
            <input
              type="text"
              placeholder="Email or Username"
              className="w-full px-4 py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <div className="text-right text-sm text-purple-600 cursor-pointer hover:underline">
              Forgot password?
            </div>
            <button
              type="submit"
              className="w-full bg-[#7B22D8] text-white py-3 rounded-full font-semibold shadow hover:bg-[#691bc0] transition"
            >
              Log In
            </button>
            <div className="flex items-center gap-2">
              <div className="flex-grow h-px bg-gray-300"></div>
              <span className="text-gray-500 text-sm">OR</span>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>
            {/* <button
              type="button"
              className="w-full bg-green-500 text-white py-2 rounded-full font-semibold hover:bg-green-600 transition"
            >
              G Continue with Google
            </button>
            <button
              type="button"
              className="w-full bg-black text-white py-2 rounded-full font-semibold hover:bg-gray-800 transition"
            >
              ⌘ Continue with Apple
            </button> */}
          </form>

          <p className="mt-6 text-sm text-gray-600 text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-purple-600 font-semibold cursor-pointer hover:underline"> {/* Use Link */}
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
