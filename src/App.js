import React from 'react';
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
            <Route path="/signupcontinue" element={<Signupcontinue />} />
            <Route path="/dashboardetud" element={<DashboardEtud />} />
          </Routes>
          <Footer />
        </div>
    </Router>
  );
}

export default App;
