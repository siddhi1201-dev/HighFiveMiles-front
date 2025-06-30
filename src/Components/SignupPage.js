import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import leftimage from '../assests/HighFive Miles main page logo.png';
import event1 from "../assests/events1.jpg";
import event2 from "../assests/events2.jpg";
import event3 from "../assests/events3.jpg";
import event4 from "../assests/events4.jpg";


export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Define your API base URL (should match login page)
  const API_BASE_URL = 'http://localhost:5000/api'; // **IMPORTANT: Adjust this to your actual backend URL**

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


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Signup successful:', data);
        // Store the token and user data (similar to login)
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Redirect to dashboard or profile completion
        navigate('/profile');
      } else {
        setError(data.msg || 'Signup failed. Please try again.');
        console.error('Signup failed:', data.msg);
      }
    } catch (err) {
      setError('Network error. Please try again later.');
      console.error('Network error during signup:', err);
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
          backgroundImage: `linear-gradient(rgba(24,24,27,0.8), rgba(24,24,27,0.8)),url(${backgroundImages[currentImageIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          }}
      />
    <div className="min-h-screen  flex items-center justify-center p-8 font-inter">
      <div className="bg-white flex rounded-2xl shadow-lg overflow-hidden max-w-5xl w-full">
        {/* Left Side - Illustration */}
        <div className="w-1/2 bg-[#F3F0FF] flex items-center justify-center relative rounded-l-2xl">
          <img
            src={leftimage}
            alt="Fitness illustration"
            className="h-full w-full object-contain rounded-l-2xl"
          />
        </div>

        {/* Right Side - Form */}
        <div className="w-1/2 p-12 bg-white rounded-r-2xl text-center flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-3 mt-4">Join Our Community!</h2>
          <p className="text-gray-600 mb-10">Create your account to start your fitness journey.</p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
              minLength="6"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
              minLength="6"
            />
            
            <button
              type="submit"
              className="w-full bg-[#7B22D8] text-white py-3 rounded-full font-semibold shadow hover:bg-[#691bc0] transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
            
            <div className="flex items-center gap-2">
              <div className="flex-grow h-px bg-gray-300"></div>
              <span className="text-gray-500 text-sm">OR</span>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>
          </form>

          <p className="mt-6 text-sm text-gray-600 text-center">
            Already have an account?{" "}
            <Link to="/" className="text-purple-600 font-semibold cursor-pointer hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
    </div>
  );
}