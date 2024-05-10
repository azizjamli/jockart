import React, { useState } from "react";
import "./login.css";
import facebook from '../assets/facebook.png';
import instagram from '../assets/instagram.png';
import tiktok from '../assets/tiktok.png';

const SignUp = ({ handleSignUp }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

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

    const validateConfirmPassword = () => {
        if (!confirmPassword.trim()) {
            setConfirmPasswordError('Veuillez confirmer votre mot de passe.');
            return false;
        } else if (confirmPassword !== password) {
            setConfirmPasswordError('Le mot de passe de confirmation ne correspond pas au mot de passe.');
            return false;
        } else {
            setConfirmPasswordError('');
            return true;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateEmail() || !validatePassword() || !validateConfirmPassword()) {
            return;
        }

        handleSignUp(email, password);
    };

    return (
        <div className="p-5 signup">
            <h2 className="titresignin">Créez un compte</h2>
            <div className="d-flex justify-content-center gap-5 mt-5">
                <img src={facebook} alt="Facebook" className="iconsignin" />
                <img src={instagram} alt="Instagram" className="iconsignin" />
                <img src={tiktok} alt="TikTok" className="iconsignin" />
            </div>
            <p className="mt-5">Ou inscrivez-vous avec votre email</p>
            <form className="d-flex flex-column align-items-center gap-3" onSubmit={handleSubmit}>
                <input className="mt-4 inputlogin" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input className="mt-4 inputlogin" type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
                <input className="mt-4 inputlogin" type="password" placeholder="Confirmer le mot de passe" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                {emailError && <p className="error-message">{emailError}</p>}
                {passwordError && <p className="error-message">{passwordError}</p>}
                {confirmPasswordError && <p className="error-message">{confirmPasswordError}</p>}
                <button type="submit" className="btn">S'inscrire</button>
            </form>
        </div>
    );
};

export default SignUp;
