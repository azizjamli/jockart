import React, { useState } from "react";
import "./header.css";

const Header = ({ onNavigate }) => {
    const [activeLink, setActiveLink] = useState("acceuil");

    const handleClick = (page) => {
        setActiveLink(page);
        onNavigate(page);
    };

    return (
        <nav className="navbar navbar-expand-lg container bg-white">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <img src="/logo.png" alt="Logo" className="logoimg img-fluid" />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                    <ul className="navbar-nav mb-2 mb-lg-0 me-5">
                        <li className={`nav-item ${activeLink === 'acceuil' ? 'active' : ''}`}>
                            <a className="nav-link" href="#" onClick={() => handleClick('acceuil')}>Accueil</a>
                        </li>
                        <li className={`nav-item ${activeLink === 'formations' ? 'active' : ''}`}>
                            <a className="nav-link" href="#" onClick={() => handleClick('Formations')}>Formations</a>
                        </li>
                        <li className={`nav-item ${activeLink === 'communaute' ? 'active' : ''}`}>
                            <a className="nav-link" href="#" onClick={() => handleClick('communauté')}>Communauté</a>
                        </li>
                        <li className={`nav-item ${activeLink === 'apropos' ? 'active' : ''}`}>
                            <a className="nav-link" href="#" onClick={() => handleClick('APropos')}>A propos</a>
                        </li>
                        <li className={`nav-item ${activeLink === 'contact' ? 'active' : ''}`}>
                            <a className="nav-link" href="#" onClick={() => handleClick('contact')}>Contact</a>
                        </li>
                    </ul>
                </div>
                <button className="btn login" type="submit">Login</button>
            </div>
        </nav>
    );
};

export default Header;
