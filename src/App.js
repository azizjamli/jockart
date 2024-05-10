import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/header';
import Acceuil from './components/acceuil';
import Formations from './components/formation'; // Assuming you have a Formations component
import Communauté from './components/communauté'; // Assuming you have a Communauté component
import APropos from './components/aPropos'; // Assuming you have an APropos component
import Contact from './components/contact'; // Assuming you have a Contact component
import Footer from './components/footer';
import Login from './components/login';
import DashboardEtud from './components/dashboardetud'; // Import your DashboardEtud component


function App() {
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
          <Route path="/login/dashboardetud" element={<DashboardEtud />} />

        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
