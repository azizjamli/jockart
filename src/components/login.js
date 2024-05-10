import React, { useState } from "react";
import "./login.css";
import facebook from '../assets/facebook.png';
import instagram from '../assets/instagram.png';
import tiktok from '../assets/tiktok.png';


const Login = () => {
    const [isSignUp, setIsSignUp] = useState(false);

    const toggleSignUp = () => {
        setIsSignUp(!isSignUp);
    };

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
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

    const handleSignIn = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        
        try {
            const { email, password } = event.target.elements;
    
            // Make a POST request to the signin endpoint
            const response = await fetch('http://localhost:3001/api/users/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email.value, password: password.value }),
            });
    
            // Parse the response JSON
            const data = await response.json();
    
            if (response.ok) {
                // Successful signin
                console.log('Signin successful:', data.message);
                
                // Handle further actions if needed
            } else {
                // Failed signin
                console.error('Signin failed:', data.message);
                console.log('connectionworkd user not found')
                console.log(email , password);
                // Handle error display or other actions
            }
        } catch (error) {
            console.error('Signin failed:', error);
            console.log('didnt work');
            // Handle error display or other actions
        }
    };



    const handleSignUp = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        
        try {
            const { email, password } = event.target.elements;
    
            // Make a POST request to the signup endpoint
            const response = await fetch('http://localhost:3001/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email.value, password: password.value }),
            });
    
            // Check if the response status is ok
            if (!response.ok) {
                throw new Error('Signup failed'); // Throw an error if the response status is not ok
            }
    
            // Parse the response JSON
            const data = await response.json();
    
            // Display a success message to the user
            console.log('Signup successful:', data.message);
    
            // Redirect or handle further actions if needed
        } catch (error) {
            console.error('Signup failed:', error.message);
            // Handle error display or other actions
        }
    };
    
    
    
    

    
    return (
        <>
        <div className="container">
            <div className="row">
                <div className={`col-md-6 ${isSignUp ? 'order-md-2 slide-in-right' : 'order-md-1 slide-in-left'}`}>
                    {isSignUp ? (
                        <div className="p-5 signup">
                            <h2 className="titresignin">Créez un compte</h2>
                            <div className="d-flex justify-content-center gap-5 mt-5">
                                <img src={facebook} alt="Facebook" className="iconsignin" />
                                <img src={instagram} alt="Instagram" className="iconsignin" />
                                <img src={tiktok} alt="TikTok" className="iconsignin" />
                            </div>
                            <p className="mt-4">Ou utilisez votre compte email</p>
                            <form onSubmit={handleSignUp} >
                                <input className="mt-4 inputlogin" type="email" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}  />
                                <input className="mt-4 inputlogin" type="password" id="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <input className="mt-4 inputlogin" type="password" id="confirmPassword" placeholder="Confirmez le mot de passe" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                {emailError && <p className="error-message">{emailError}</p>}
                                {passwordError && <p className="error-message">{passwordError}</p>}
                                {confirmPasswordError && <p className="error-message">{confirmPasswordError}</p>}
                                <button type="submit" className="btn mt-3">S'inscrire</button>
                            </form>
                        </div>
                    ) : (
                        <div className="signin p-5">
                            <h2 className="titresignin">Connectez-vous à Jock'Art Formation</h2>
                            <div className="d-flex justify-content-center gap-5 mt-5">
                                <img src={facebook} alt="Facebook" className="iconsignin" />
                                <img src={instagram} alt="Instagram" className="iconsignin" />
                                <img src={tiktok} alt="TikTok" className="iconsignin" />
                            </div>
                            <p className="mt-5">Ou utilisez votre compte email</p>
                            <form className="d-flex flex-column align-items-center gap-3" onSubmit={handleSignIn}>
                                <input className="mt-4 inputlogin" type="email" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <input className="mt-4 inputlogin" type="password" id="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
                                {emailError && <p className="error-message">{emailError}</p>}
                                {passwordError && <p className="error-message">{passwordError}</p>}
                                <a className="mt-4 mb-4 motdepasseoublié">Mot de passe oublié ?</a>
                                <button type="submit" className="btn">Se connecter</button>
                            </form>
                        </div>
                    )}
                </div>
                <div className={`col-md-6 ${isSignUp ? 'order-md-1 slide-in-left' : 'order-md-2 slide-in-right'}`}>
                    {isSignUp ? (
                        <div className="signintogglediv p-5 d-flex flex-column align-items-center gap-5">
                            <h2 className="text-white mt-5">Bonjour, mon ami ! </h2>
                            <p className="text-white mt-5">Entrez vos informations personnelles et commencez votre voyage avec nous</p>
                            <button className="btn mt-5 float-left togglelogin" onClick={toggleSignUp}>Se connecter</button>
                        </div>
                    ) : (
                        <div className="signintogglediv p-5 d-flex flex-column align-items-center gap-5">
                            <h2 className="mt-5 text-white">Content de vous revoir</h2>
                            <p className="mt-5 text-white">pour rester en contact avec nous, veuillez vous connecter avec vos informations personnelles</p>
                            <button className="btn togglelogin mt-5 float-right" onClick={toggleSignUp}>S'inscrire</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
        </>
    );
};

export default Login;
