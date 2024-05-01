import React, { useState } from 'react';
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
  const [currentPage, setCurrentPage] = useState('acceuil');

  const handleNavigation = (page) => {
    setCurrentPage(page.toLowerCase()); // Ensure lowercase for consistency
  };
  

  return (
    <div className="App">
      <Header onNavigate={handleNavigation} />
      {currentPage === 'acceuil' && <Acceuil />}
      {currentPage === 'formations' && <Formations />}
      {currentPage === 'communaute' && <Communauté />}
      {currentPage === 'apropos' && <APropos />}
      {currentPage === 'contact' && <Contact />}
      <Footer />
    </div>
  );
}

export default App;