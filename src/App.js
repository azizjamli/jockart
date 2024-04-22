import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './header';
import Acceuil from './acceuil';
import Footer from './footer';


function App() {
  return (
    <div className="App">
      <Header />
      <Acceuil />
      <Footer />
    </div>
  );
}

export default App;