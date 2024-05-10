import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

import "./login.css";
import facebook from '../assets/facebook.png';
import instagram from '../assets/instagram.png';
import tiktok from '../assets/tiktok.png';

const SignIn = ({ handleSignIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const validateEmail = () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim()) {
            setEmailError('Veuillez saisir votre email.');
            return false;
        } else if (!emailPattern.test(email)) {
            setEmailError('Veuillez saisir une adresse email valide.');
            return false;
        } else {
            setEmailError('');
            return true;
        }
    };

    const validatePassword = () => {
        if (!password.trim()) {
            setPasswordError('Veuillez saisir votre mot de passe.');
            return false;
        } else if (password.length < 6) {
            setPasswordError('Le mot de passe doit comporter au moins 6 caractères.');
            return false;
        } else {
            setPasswordError('');
            return true;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateEmail() || !validatePassword()) {
            return;
        }

        handleSignIn(email, password);


    };

    return (
        <div className="signin p-5">
            <h2 className="titresignin">Connectez-vous à Jock'Art Formation</h2>
            <div className="d-flex justify-content-center gap-5 mt-5">
                <img src={facebook} alt="Facebook" className="iconsignin" />
                <img src={instagram} alt="Instagram" className="iconsignin" />
                <img src={tiktok} alt="TikTok" className="iconsignin" />
            </div>
            <p className="mt-5">Ou utilisez votre compte email</p>
            <form className="d-flex flex-column align-items-center gap-3" onSubmit={handleSubmit}>
                <input className="mt-4 inputlogin" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input className="mt-4 inputlogin" type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
                {emailError && <p className="error-message">{emailError}</p>}
                {passwordError && <p className="error-message">{passwordError}</p>}
                <a className="mt-4 mb-4 motdepasseoublié">Mot de passe oublié ?</a>
                <button type="submit" className="btn">Se connecter</button>
            </form>
        </div>
    );
};

export default SignIn;
