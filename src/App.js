import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/header';
import Acceuil from './components/acceuil';
import Formations from './components/formation';
import Communauté from './components/communauté';
import APropos from './components/aPropos';
import Contact from './components/contact';
import Footer from './components/footer';
import Login from './components/login';
import DashboardEtud from './components/dashboardetud';
import Signupcontinue from './components/signupcontinue';
import axios from 'axios'; // Import Axios for API requests

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check authentication status when the component mounts
    axios.get('http://localhost:3001/api/check-auth')
      .then(response => {
        setIsLoggedIn(true);
      })
      .catch(error => {
        setIsLoggedIn(false);
      });
  }, []); // Empty dependency array means this effect runs once, similar to componentDidMount

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
            <Route path="/" element={<Acceuil />} />
            <Route path="/formations" element={<Formations />} />
            <Route path="/communaute" element={<Communauté />} />
            <Route path="/apropos" element={<APropos />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signupcontinue" element={<Signupcontinue />} />
            {isLoggedIn ? (
              <Route path="/dashboardetud" element={<DashboardEtud />} />
            ) : (
              <Route path="/dashboardetud" element={<Login />} />
            )}
          </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
