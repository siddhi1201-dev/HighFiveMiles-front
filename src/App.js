import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from "./Components/LoginPage";
import SignupPage from "./Components/SignupPage";
import ProfilePage from "./Components/ProfilePage";
import StartGoalPage from "./Components/StartGoalPage";


function App() {
  return (
      <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile" element={<ProfilePage/>} />
        <Route path="/startgoalpage" element={<StartGoalPage/>} />





        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
