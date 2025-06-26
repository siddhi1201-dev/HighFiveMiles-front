import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from "./Components/LoginPage";
import SignupPage from "./Components/SignupPage";


function App() {
  return (
      <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
