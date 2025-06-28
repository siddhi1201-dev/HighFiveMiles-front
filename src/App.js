import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from "./Components/LoginPage";
import SignupPage from "./Components/SignupPage";
import HomePage from "./Components/HomePage";


function App() {
  return (
      <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
