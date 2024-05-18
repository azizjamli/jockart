import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import Ajoutercours from './components/ajoutercours';
import Accedercours from './components/accedercours';
import Chapitreetud from './components/chapitreetud';
import Dashboardadmin from './components/DashboardAdmin';
import AddCategory from './components/addcategory';
import axios from 'axios'; // Import Axios for API requests

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();

  // Define an array of routes where Header and Footer should be rendered
  const headerFooterRoutes = [ '/' , '/formations', '/communaute', '/apropos', '/contact', '/login', ];

  // Function to check if Header and Footer should be rendered based on the current route
  const shouldRenderHeaderFooter = () => {
    return headerFooterRoutes.includes(location.pathname);
  };

  return (
    <div className="App">
      {shouldRenderHeaderFooter() && <Header />}
      <Routes>
      <Route path="/" element={<Acceuil />} />
        <Route path="/formations" element={<Formations />} />
        <Route path="/communaute" element={<Communauté />} />
        <Route path="/apropos" element={<APropos />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signupcontinue" element={<Signupcontinue />} />
        <Route path="/dashboardetud" element={<DashboardEtud />} />
        <Route path="/dashboardadmin" element={<Dashboardadmin />} />
        <Route path="/addcategory" element={<AddCategory />} />

        <Route path="/ajoutercours/:id" element={<Ajoutercours />} />
        <Route path="/accedercours/:id" element={<Accedercours />} />
        <Route path="/chapitreetud/:chapitre_id" element={<Chapitreetud />} />



      </Routes>
      {shouldRenderHeaderFooter() && <Footer />}
    </div>
  );
}

export default App;
