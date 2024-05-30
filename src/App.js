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
import Accedercoursformateur from './components/accedercoursformateur';
import Chapitreformateur from './components/chapitreformateur';

import Chapitreetud from './components/chapitreetud';
import Dashboardadmin from './components/DashboardAdmin';
import AddCategory from './components/addcategory';
import AddCours from './components/addcours';
import Admincours from './components/admincours';
import AdminCreateProfile from './components/admincreateprofil';
import Coursdetails from './components/coursdetails';
import Dashboardformateur  from './components/DashboardFormateur';
import Systemepedagogique from './components/systemepedagogique';
import Sortie from './components/sortie';
import FormationEnLigne from './components/formationenligne';
import TravailDeGroup from './components/travaildegroup';
import Event from './components/event';
import Incours from './components/incours';
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
  const headerFooterRoutes = [
    '/',
    '/formations',
    '/communaute',
    '/apropos',
    '/contact',
    '/login',
    '/systemepedagogique',
    '/sortie',
    '/formationenligne',
    '/travaildegroup',
    '/event',
    '/incours/', // Include a route pattern for incours
  ];

  // Function to check if Header and Footer should be rendered based on the current route
  const shouldRenderHeaderFooter = () => {
    return headerFooterRoutes.some(route => location.pathname.includes(route));
  };

  return (
    <div className="App">
      {shouldRenderHeaderFooter() && <Header />}
      <Routes>
        <Route path="/" element={<Acceuil />} />
        <Route path="/formations" element={<Formations />} />
        <Route path="/systemepedagogique" element={<Systemepedagogique />} />
        <Route path="/sortie" element={<Sortie />} />
        <Route path="/formationenligne" element={<FormationEnLigne />} />
        <Route path="/travaildegroup" element={<TravailDeGroup />} />
        <Route path="/event" element={<Event />} />
        <Route path="/incours/:courseId" element={<Incours />} /> {/* Updated route for Incours */}
        <Route path="/communaute" element={<Communauté />} />
        <Route path="/apropos" element={<APropos />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signupcontinue" element={<Signupcontinue />} />
        <Route path="/dashboardetud" element={<DashboardEtud />} />
        <Route path="/dashboardadmin" element={<Dashboardadmin />} />
        <Route path="/addcategory" element={<AddCategory />} />
        <Route path="/admincreateprofile" element={<AdminCreateProfile />} />
        <Route path="/addcours/:categoryId" element={<AddCours />} />
        <Route path="/ajoutercours/:id" element={<Ajoutercours />} />
        <Route path="/accedercours/:id" element={<Accedercours />} />
        <Route path="/accedercoursformateur/:id" element={<Accedercoursformateur />} />
        <Route path="/admincours/:id" element={<Admincours />} />
        <Route path="/coursdetails" element={<Coursdetails />} />
        <Route path="/chapitreformateur/:chapitre_id" element={<Chapitreformateur />} />
        <Route path="/chapitreetud/:chapitre_id" element={<Chapitreetud />} />
        <Route path="/dashboardformateur" element={<Dashboardformateur />} />
      </Routes>
      {shouldRenderHeaderFooter() && <Footer />}
    </div>
  );
}

export default App;
