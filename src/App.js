import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './header';
import Acceuil from './acceuil';
import Formations from './formation'; // Assuming you have a Formations component
import Communauté from './communauté'; // Assuming you have a Communauté component
import APropos from './aPropos'; // Assuming you have an APropos component
import Contact from './contact'; // Assuming you have a Contact component
import Footer from './footer';

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
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
