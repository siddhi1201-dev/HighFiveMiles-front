// Home.jsx
import React from 'react';
import '../Animations.css'; 
import backgroundImage from '../assests/main.jpg';
import backgroundImage1 from '../assests/mainheaderimage.jpg';
import backgroundImageEvents from '../assests/eventsbg1.jpg';
import event1 from '../assests/events1.jpg';
import event2 from '../assests/events2.jpg';
import event3 from '../assests/events3.jpg';
import event4 from '../assests/events4.jpg';
import contactsimage from '../assests/contacts.jpg'; 



// Home component for the HIGHFIVE MILES Run Club website
// This component renders the entire homepage, including the navigation bar and the hero section.
function Home() {
  return (
    // Main container for the application, setting the font and background.
    <div className="min-h-screen bg-indigo-950   font-inter text-gray-50 antialiased">
    
      {/* Hero section with background image and overlay */}
      {/* The background image URL is currently a placeholder. User will add their own image. */}
      <header className="relative h-screen bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
        {/* Dark overlay for better text readability, adjusted opacity for the new background. */}
        <div className="absolute inset-0 bg-zinc-900 opacity-85"></div>

        {/* Navigation Bar */}
        <nav className="relative z-10 p-6 flex justify-between items-center max-w-7xl mx-auto">
          {/* Logo, changed name to HIGHFIVE MILES and color to indigo-300 */}
                  <div className="text-3xl font-extrabold text-white drop-shadow-lg tracking-widest text-center animate-fade-in">
                 <span className="bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
                         HIGHFIVE MILES
                 </span>
                  <p className="text-sm font-light tracking-wide text-gray-200 mt-2">
                    Run. Achieve. Repeat.
                  </p>
                </div>


          {/* Navigation Links, hidden on small screens, shown as flex on medium and larger */}
          <ul className="hidden md:flex space-x-8">
            {['About', 'Profile', 'Events', 'Blog', 'Contacts'].map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase()}`} className="text-gray-50 hover:text-indigo-300 transition duration-300 ease-in-out text-lg rounded-md px-3 py-2">
                  {item}
                </a>
              </li>
            ))}
          </ul>

          {/* Social Media Icons (using Font Awesome via CDN for simplicity), hover color to indigo-300 */}
          <div className="flex space-x-4">
            <a href="#" className="text-gray-50 hover:text-indigo-300 transition duration-300 ease-in-out text-xl rounded-full p-2">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-gray-50 hover:text-indigo-300 transition duration-300 ease-in-out text-xl rounded-full p-2">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-gray-50 hover:text-indigo-300 transition duration-300 ease-in-out text-xl rounded-full p-2">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </nav>

            
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          {/* Added animate-fadeInUp class for animation */}
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-4 animate-fadeInUp">
            LET'S GET <span className="text-rose-500">MOVING</span>
          </h1>
          {/* Added "HIGHFIVE MILES Running Club" text as requested */}
          <p className="text-xl md:text-2xl text-gray-300 mb-10 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>HIGHFIVE MILES Running Club</p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
            {/* Call to action buttons with animation delay */}
            <button className="bg-cyan-600 hover:bg-indigo-800 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 animate-bounceIn" style={{ animationDelay: '0.5s' }}>
              BECOME A MEMBER
            </button>
            <button className="bg-transparent border-2 border-indigo-300 hover:border-white text-indigo-300 hover:text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 animate-bounceIn" style={{ animationDelay: '0.7s' }}>
              OUR EVENTS
            </button>
          </div>
        </div>
        
      </header>

               
      {/* About Us Section */}
      <section id="about" className="py-16 bg-gray-200 text-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center md:space-x-12">
            {/* Left Column: Image Container */}
            <div className="md:w-1/2 flex justify-center mb-8 md:mb-0 relative">
              <div
                className="w-96 h-96 bg-cover bg-center rounded-lg shadow-xl animate-slideInLeft"
                   style={{ backgroundImage: `url(${backgroundImage1})`,animationDelay: '0.9s'  }}
      
              ></div>
            </div>

            {/* Right Column: About Us Content */}
            <div className="md:w-1/2 text-center md:text-left">
              <h2 className="text-4xl font-extrabold text-grey-900 mb-6 animate-fadeInUp" style={{ animationDelay: '0.7s' }}>ABOUT US</h2> {/* Added animation */}
              <p className="text-gray-900 leading-relaxed mb-4 " style={{ animationDelay: '1.0s' }}> {/* Added animation */}
                Established in 2023, HIGHFIVE MILES is a community-driven initiative passionately crafted for the vibrant running spirit of India.
                We believe in uniting runners from all walks of life, from the bustling streets of Mumbai to the serene landscapes of the Himalayas.
                Our aim is to foster a culture of fitness, camaraderie, and personal achievement across every city and village.
              </p>
              <p className="text-gray-900 leading-relaxed mb-6 " style={{ animationDelay: '1.3s' }}> {/* Added animation */}
                HIGHFIVE MILES provides a platform for training programs tailored for Indian conditions, organizes local runs and events
                that celebrate our diverse heritage, and creates a supportive network for every stride you take.
                Join us in building a healthier, happier India, one mile at a time.
              </p>
              <p className="text-sm text-gray-600 mb-6 animate-fadeInUp" style={{ animationDelay: '1.6s' }}> {/* Added animation */}
                Proudly envisioned and brought to life by *Adarsh and Siddhi*.
              </p>

              {/* Social Media Icons for About Us Section */}
              <div className="flex justify-center md:justify-start space-x-4 mb-8 animate-fadeInUp" style={{ animationDelay: '1.9s' }}> {/* Added animation */}
                <a href="#" className="text-gray-900 hover:text-blue-900 transition duration-300 ease-in-out text-2xl rounded-full p-2">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="text-gray-900 hover:text-purple-500 transition duration-300 ease-in-out text-2xl rounded-full p-2">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="text-gray-900 hover:text-rose-500 transition duration-300 ease-in-out text-2xl rounded-full p-2">
                  <i className="fab fa-youtube"></i>
                </a>
              </div>

              {/* Learn More Button */}
              <button className="bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 animate-bounceIn" style={{ animationDelay: '2.2s' }}> {/* Added animation */}
                LEARN MORE
              </button>
            </div>
          </div>
        </div>
      </section>


        {/* Events Section */}
      <section id="events" className="relative py-16 bg-gray-800 text-gray-50">
        {/* Background image for events section */}
        <div className="absolute inset-0 bg-cover bg-center"  style={{ backgroundImage: `url(${backgroundImageEvents})`,animationDelay: '0.9s',opacity: '0.3'   }} ></div>
        <div className="absolute inset-0 bg-zinc-900 opacity-70"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-white mb-12 text-center animate-fadeInUp">UPCOMING EVENTS</h2>

          {/* Grid for two columns of events */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Event Card 1: Mumbai Marathon */}
            {/* Changed to flex layout for image and text side-by-side within the card */}
            <div className="bg-gray-700 rounded-lg shadow-xl overflow-hidden border border-gray-600 flex flex-col md:flex-row animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
              {/* Increased image height to h-64 */}
              <img src={event1}alt="Mumbai Marathon" className="w-full md:w-1/2 h-64 md:h-auto object-cover"/>
              <div className="p-6 md:w-1/2 flex flex-col justify-center">
                <p className="text-gray-300 text-sm mb-1">January 15, 2026</p>
                <h3 className="text-2xl font-bold text-white mb-3">Mumbai City Marathon</h3>
                <p className="text-gray-400 text-sm mb-4">7:00 AM onwards</p>
                <button className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-6 rounded-full shadow-md transition duration-300 ease-in-out self-start">
                  LEARN MORE 
                </button>
              </div>
            </div>  

            {/* Event Card 3: Bengaluru 10K - This will now appear in the second row */}
            {/* Changed to flex layout for image and text side-by-side within the card */}
            <div className="bg-gray-700 rounded-lg shadow-xl overflow-hidden border border-gray-600 flex flex-col md:flex-row animate-fadeInUp" style={{ animationDelay: '0.9s' }}>
              {/* Increased image height to h-64 */}
              <img src={event3} alt="Bengaluru 10K" className="w-full md:w-1/2 h-64 md:h-auto object-cover"/>
              <div className="p-6 md:w-1/2 flex flex-col justify-center">
                <p className="text-gray-300 text-sm mb-1">March 20, 2026</p>
                <h3 className="text-2xl font-bold text-white mb-3">Bengaluru IT City 10K</h3>
                <p className="text-gray-400 text-sm mb-4">7:15 AM onwards</p>
                <button className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-6 rounded-full shadow-md transition duration-300 ease-in-out self-start">
                  LEARN MORE
                </button>
              </div>
            </div>

            {/* Event Card 2: Delhi Half Marathon */}
            {/* Changed to flex layout for image and text side-by-side within the card, and reversed order for alternation */}
            <div className="bg-gray-700 rounded-lg shadow-xl overflow-hidden border border-gray-600 flex flex-col md:flex-row-reverse animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
              {/* Increased image height to h-64 */}
              <img src={event2} alt="Delhi Half Marathon" className="w-full md:w-1/2 h-64 md:h-auto object-cover"/>
              <div className="p-6 md:w-1/2 flex flex-col justify-center">
                <p className="text-gray-300 text-sm mb-1">February 28, 2026</p>
                <h3 className="text-2xl font-bold text-white mb-3">Delhi Half Marathon</h3>
                <p className="text-gray-400 text-sm mb-4">6:30 AM onwards</p>
                <button className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-6 rounded-full shadow-md transition duration-300 ease-in-out self-start">
                  LEARN MORE
                </button>
              </div>
            </div>

            

            {/* Event Card 4: Himalayan Ultra Trail - This will now appear in the second row */}
            {/* Changed to flex layout for image and text side-by-side within the card, and reversed order for alternation */}
            <div className="bg-gray-700 rounded-lg shadow-xl overflow-hidden border border-gray-600 flex flex-col md:flex-row-reverse animate-fadeInUp" style={{ animationDelay: '1.2s' }}>
              {/* Increased image height to h-64 */}
              <img src={event4} alt="Himalayan Ultra Trail" className="w-full md:w-1/2 h-64 md:h-auto object-cover"/>
              <div className="p-6 md:w-1/2 flex flex-col justify-center">
                <p className="text-gray-300 text-sm mb-1">June 10-12, 2026</p>
                <h3 className="text-2xl font-bold text-white mb-3">Himalayan Ultra Trail</h3>
                <p className="text-gray-400 text-sm mb-4">Adventure starts at 5:00 AM</p>
                <button className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-6 rounded-full shadow-md transition duration-300 ease-in-out self-start">
                  LEARN MORE
                </button>
              </div>
            </div>

              </div>
              <div className="text-center mt-12">
            <button className="bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 animate-bounceIn" style={{ animationDelay: '1.5s' }}>
              SEE ALL EVENTS
            </button>
          </div>
        </div>
      </section>

      
      {/* Partners Section */}
      <section id="partners" className="relative py-64 text-gray-900" style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed' // Fixed background for parallax effect
      }}>
        {/* White overlay for the "plain white" effect with a hint of the image */}
        <div className="absolute inset-0 bg-white opacity-90"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-3/4 text-center md:text-left mb-8 md:mb-0">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
              WANT TO PARTNER WITH US?
            </h2>
            <p className="text-lg leading-relaxed text-gray-800 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
              We are always looking to add to our team of partners and better enhance our members'
              experiences with the club. If you'd like to join us in this mission, contact us today!
            </p>
          </div>
          <div className="md:w-1/4 flex justify-center md:justify-end animate-bounceIn" style={{ animationDelay: '0.9s' }}>
            <button className="bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
              CONTACT US
            </button>
          </div>
        </div>
        {/* Removed the dark bottom band as it conflicts with the new white theme */}
      </section>
          

      {/* Blog Section */}
      <section id="blog" className="py-16 bg-gray-900 text-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-emerald-500 mb-12 text-center animate-fadeInUp">BLOG</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Blog Post 1 */}
            <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
              <img src={event1} alt="Blog Post 1" className="w-full h-48 object-cover"/>
              <div className="p-6">
                <p className="text-emerald-400 text-sm font-semibold mb-1">Creative Process | September 29, 2023</p>
                <h3 className="text-xl font-bold text-white mb-2">How to Hire the Best Employees to Your Company?</h3>
                <p className="text-gray-400 text-sm">
                  Today we'd like to introduce you to Debbie Mercer. Debbie has a lot to say
                  about how affection with sports can...
                </p>
              </div>
            </div>

            {/* Blog Post 2 */}
            <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
              <img src={event2} alt="Blog Post 2" className="w-full h-48 object-cover"/>
              <div className="p-6">
                <p className="text-emerald-400 text-sm font-semibold mb-1">Creative Process | September 26, 2023</p>
                <h3 className="text-xl font-bold text-white mb-2">How to Double Weight Loss Efforts in Just 15 Minutes a Day</h3>
                <p className="text-gray-400 text-sm">
                  It's quite normal to gain weight in winter. Colder weather makes us want
                  to stay at home and do less calorie-consuming...
                </p>
              </div>
            </div>

            {/* Blog Post 3 */}
            <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden animate-fadeInUp" style={{ animationDelay: '0.9s' }}>
              <img src={event3} alt="Blog Post 3" className="w-full h-48 object-cover"/>
              <div className="p-6">
                <p className="text-emerald-400 text-sm font-semibold mb-1">Creative Process | September 22, 2023</p>
                <h3 className="text-xl font-bold text-white mb-2">Top 5 Easy Tips to Healthier Lifestyle</h3>
                <p className="text-gray-400 text-sm">
                  A healthy diet can bring you better results! Get to know how to improve
                  your results through foods that are...
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="relative py-16 text-gray-50" style={{
        backgroundImage: `url(${contactsimage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed' // This makes the background image fixed
      }}>
        {/* Dark, smooth overlay */}
        <div className="absolute inset-0 bg-gray-900 opacity-80"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:space-x-12">
            {/* Left Column: Contact Information */}
            <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
              <h2 className="text-4xl font-extrabold text-rose-500 mb-6 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>CONTACTS</h2>
              <p className="text-gray-300 leading-relaxed mb-6 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
                Thank you for your interest in HIGHFIVE MILES. Please email or call us if
                you need more information. We appreciate your feedback.
              </p>

              <div className="space-y-4 text-left inline-block animate-fadeInUp" style={{ animationDelay: '0.9s' }}>
                <div>
                  <p className="text-gray-200 font-bold text-lg mb-1">Address</p>
                  <p className="text-gray-400">HIGHFIVE MILES India,</p>
                  <p className="text-gray-400">123, Runner's Lane, Mumbai,</p>
                  <p className="text-gray-400">Maharashtra, India - 400001</p>
                </div>
                <div>
                  <p className="text-gray-200 font-bold text-lg mb-1">Phone</p>
                  <p className="text-gray-400">+91 98765 43210</p>
                </div>
                <div>
                  <p className="text-gray-200 font-bold text-lg mb-1">E-mail</p>
                  <p className="text-gray-400">info@highfivemiles.in</p>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="md:w-1/2 w-full bg-gray-800 p-8 rounded-lg shadow-xl animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
              <form className="space-y-6">
                <div>
                  <label htmlFor="fullName" className="sr-only">Full name</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="Full name*"
                    className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-gray-50 placeholder-gray-400 focus:ring-rose-500 focus:border-rose-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phoneNumber" className="sr-only">Phone number</label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="Phone number*"
                    className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-gray-50 placeholder-gray-400 focus:ring-rose-500 focus:border-rose-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">Your E-mail</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Your E-mail*"
                    className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-gray-50 placeholder-gray-400 focus:ring-rose-500 focus:border-rose-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="sr-only">Type your message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    placeholder="Type your message"
                    className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-gray-50 placeholder-gray-400 focus:ring-rose-500 focus:border-rose-500 resize-y"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                >
                  REQUEST A QUOTE
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      
      {/* Footer Section */}
      <footer className="bg-gray-800 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Column 1: Logo and Contact */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="text-3xl font-bold text-white mb-4">HIGHFIVE MILES</div>
            <p className="text-gray-400 mb-1">+91 98765 43210</p>
            <p className="text-gray-400">info@highfivemiles.in</p>
          </div>

          {/* Column 2: Quick Links 1 */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold text-white mb-4">About</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-pink-500 transition duration-300">About Us</a></li>
              <li><a href="#" className="hover:text-pink-500 transition duration-300">Our Clubs</a></li>
              <li><a href="#" className="hover:text-pink-500 transition duration-300">Events</a></li>
              <li><a href="#" className="hover:text-pink-500 transition duration-300">Store</a></li>
              <li><a href="#" className="hover:text-pink-500 transition duration-300">Sponsors & Partners</a></li>
            </ul>
          </div>

          {/* Column 3: Quick Links 2 */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold text-white mb-4">Programs</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-pink-500 transition duration-300">Membership</a></li>
              <li><a href="#" className="hover:text-pink-500 transition duration-300">Coaches</a></li>
              <li><a href="#" className="hover:text-pink-500 transition duration-300">Contacts</a></li>
            </ul>
          </div>

          {/* Column 4: Follow Us */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold text-white mb-4">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" className="text-gray-300 hover:text-pink-500 transition duration-300 text-xl">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-pink-500 transition duration-300 text-xl">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-pink-500 transition duration-300 text-xl">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          {/* Column 5: Subscribe */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold text-white mb-4">Subscribe to get the latest news from us</h3>
            <div className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Email*"
                className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-gray-50 placeholder-gray-400 focus:ring-pink-500 focus:border-pink-500"
              />
              <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-full shadow-md transition duration-300 ease-in-out">
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-500 text-sm">
          <p className="flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span>© Created by HIGHFIVE MILES</span>
            <span>All rights Reserved</span>
          </p>
        </div>
      </footer>

      {/* Tailwind CSS Script - MUST be at the end of the body or root component */}
      <script src="https://cdn.tailwindcss.com"></script>
      {/* Font Awesome for social media icons */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"></link>
      {/* Google Fonts - Inter */}
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800&display=swap" rel="stylesheet" />
    </div>
  );
}

export default Home;
