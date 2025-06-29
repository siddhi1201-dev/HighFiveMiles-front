import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from "./Components/LoginPage";
import SignupPage from "./Components/SignupPage";
<<<<<<< HEAD
import HomePage from "./Components/HomePage";
=======
import ProfilePage from "./Components/ProfilePage";
import StartGoalPage from "./Components/StartGoalPage";
>>>>>>> 23e54a2ecda1c71458f58aa0376b9e11d25f51f1


function App() {
  return (
      <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile" element={<ProfilePage/>} />
        <Route path="/startgoalpage" element={<StartGoalPage/>} />





        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
