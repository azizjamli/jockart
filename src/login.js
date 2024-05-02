import React, { useState } from "react";
import "./login.css";
import facebook from './assets/facebook.png';
import instagram from './assets/instagram.png';
import tiktok from './assets/tiktok.png';

const Login = () => {
    const [isSignUp, setIsSignUp] = useState(false);

    const toggleSignUp = () => {
        setIsSignUp(!isSignUp);
    };

    return (
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
                            <form>
                                <input className="mt-4 inputlogin inputlogin" type="email" id="tel" placeholder="Numéro de téléphone" />
                                <input className="mt-4 inputlogin" type="password" id="tel" placeholder="Mot de passe" />
                                <input className="mt-4 inputlogin" type="password" id="tel" placeholder="Confirmez le mot de passe" />
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
                            <form className="d-flex flex-column align-items-center gap-3">
                                <input className="mt-4 inputlogin" type="email" id="tel" placeholder="Email" />
                                <input className="mt-4 inputlogin" type="password" id="tel" placeholder="Mot de passe" />
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
                            <p className="mt-5 text-white ">pour rester en contact avec nous, veuillez vous connecter avec vos informations personnelles</p>
                            <button className="btn togglelogin mt-5 float-right" onClick={toggleSignUp}>S'inscrire</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
