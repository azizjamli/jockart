import React from "react";
import "./header.css";

const Header = () => {
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
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Acceuil</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Formations</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Communauté</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">A propos</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Contact</a>
                        </li>
                    </ul>
                        
                </div>
                <button className="btn login" type="submit">Login</button>
            </div>
        </nav>
    );
};

export default Header;