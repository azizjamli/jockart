import React, { useState } from "react";

const Login = () => {
    const [isSignUp, setIsSignUp] = useState(false);

    const toggleSignUp = () => {
        setIsSignUp(!isSignUp);
    };

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        {isSignUp ? (
                            <div className="bg-success signup">
                                <h2>Créez un compte</h2>
                                <p>Ou utilisez votre compte email</p>
                                <form>
                                    <input className="mt-4" type="email" id="tel" placeholder="Numéro de téléphone" />
                                    <input className="mt-4" type="password" id="tel" placeholder="Mot de passe" />
                                    <input className="mt-4" type="password" id="tel" placeholder="Confirmez le mot de passe" />
                                    <button type="submit" className="btn">S'inscrire</button>
                                </form>
                            </div>
                        ) : (
                            <div className="bg-success signin">
                                <h2>Connectez-vous à Jock'Art Formation</h2>
                                <p>Ou utilisez votre compte email</p>
                                <form>
                                    <input className="mt-4" type="email" id="tel" placeholder="Numéro de téléphone" />
                                    <input className="mt-4" type="password" id="tel" placeholder="Mot de passe" />
                                    <button type="submit" className="btn">Se connecter</button>
                                </form>
                            </div>
                        )}
                    </div>
                    <div className="col-md-6">
                        {isSignUp ? (
                            <button className="btn mt-5 float-left" onClick={toggleSignUp}>S'inscrire</button>
                        ) : (
                            <button className="btn mt-5 float-right" onClick={toggleSignUp}>Se connecter</button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
