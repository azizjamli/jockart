import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

const Header = () => {
  return (
    <nav className="navbar navbar-header navbar-expand-lg container bg-white">
      <div className="container-fluid">
        <Link  className="navbar-brand">
          <img src="/logo.png" alt="Logo" className="logoimg img-fluid" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mb-2 mb-lg-0 me-5">
            <li className="nav-item nav-item-header">
              <Link
                to="./acceuil.js"
                className="nav-link"
                exact="true"
              >
                Accueil
              </Link>
            </li>
            <li className="nav-item nav-item-header">
              <Link
                to="/formations"
                className="nav-link"
                activeclassname="active"
              >
                Formations
              </Link>
            </li>
            <li className="nav-item nav-item-header">
              <Link
                to="/communaute"
                className="nav-link"
                activeclassname="active"
              >
                Communauté
              </Link>
            </li>
            <li className="nav-item nav-item-header">
              <Link
                to="/apropos"
                className="nav-link"
                activeclassname="active"
              >
                A propos
              </Link>
            </li>
            <li className="nav-item nav-item-header">
              <Link
                to="/contact"
                className="nav-link"
                activeclassname="active"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <Link to="/login" className="btn login">
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Header;
