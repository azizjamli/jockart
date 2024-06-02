import React, { useState } from "react";
import "./login.css";
import facebook from '../assets/facebook.png';
import instagram from '../assets/instagram.png';
import tiktok from '../assets/tiktok.png';
import { useNavigate } from 'react-router-dom';

const AdminCreateProfile = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('admin'); // Default role
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

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

    const handleSignUp = async (email, password, role) => {
        try {
            // Make a POST request to the signup endpoint
            const response = await fetch('http://localhost:3001/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, role }),
            });

            // Parse the response JSON
            const data = await response.json();

            if (response.ok) {
                // Successful signup
                console.log('Signup successful:', data.message);
                localStorage.setItem('userId', data.userId); // Assuming the user ID is returned as data.userId

                navigate('/dashboardadmin');
                // Handle further actions if needed
            } else {
                // Failed signup
                console.error('Signup failed:', data.message);
                // Handle error display or other actions
            }
        } catch (error) {
            console.error('Signup failed:', error);
            // Handle error display or other actions
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (validateEmail() && validatePassword() && validateConfirmPassword()) {
            handleSignUp(email, password, role);
        }
    };

    return (
        <div className="p-5 signup">
            <h2 className="titresignin">Créez un compte</h2>
            <div className="d-flex justify-content-center gap-5 mt-5">
                <img src={facebook} alt="Facebook" className="img-fluid iconsignin1 " />
                <img src={instagram} alt="Instagram" className="img-fluid iconsignin1 " />
                <img src={tiktok} alt="TikTok" className="img-fluid iconsignin1 " />
            </div>
            <p className="mt-5" >Ou utilisez votre email pour vous inscrire</p>
            <form className="d-flex flex-column align-items-center gap-3" onSubmit={handleSubmit}>
                <input className="mt-4 inputlogin" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input className="mt-4 inputlogin" type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
                <input className="mt-4 inputlogin" type="password" placeholder="Confirmer le mot de passe" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                <select className="mt-4 inputlogin seleect" value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="admin">Admin</option>
                    <option value="etudiant">Etudiant</option>
                    <option value="formateur">Formateur</option>
                </select>
                {emailError && <p className="error-message">{emailError}</p>}
                {passwordError && <p className="error-message">{passwordError}</p>}
                {confirmPasswordError && <p className="error-message">{confirmPasswordError}</p>}
                <button type="submit" className="btn">S'inscrire</button>
            </form>
        </div>
    );
};

export default AdminCreateProfile;
