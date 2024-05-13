import React, { useState } from "react";
import "./login.css";
import SignIn from "./signin";
import SignUp from "./signup";
import {useNavigate } from 'react-router-dom';

const Login = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [errorMessage, setErrorMessage] = useState(""); // State for error message
    const navigate = useNavigate(); // Initialize useNavigate

    const toggleSignUp = () => {
        setIsSignUp(!isSignUp);
    };

    const handleSignIn = async (email, password) => {
        try {
          // Make a POST request to the signin endpoint
          const response = await fetch('http://localhost:3001/api/users/signin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),

          });
          if (response.ok) {
            // Parse the response JSON
            const data = await response.json();
            console.log('Signin successful:', data.message);
            const role = data.role; // Get user role from response
            switch (role) {
              case 'etudiant':
                navigate('/Dashboardetud');
                break;
              case 'formateur':
                navigate('/DashboardFormateur');
                break;
              case 'admin':
                navigate('/DashboardAdmin');
                break;
              default:
                // Handle other roles or unknown roles
                break;
            }
          } else {
            // Failed signin
            const errorData = await response.json(); // Parse error response
            console.error('Signin failed:', errorData.error);
            setErrorMessage('Verifiez Vos Cordonnées'); // Set error message
          }
        } catch (error) {
          console.error('Signin failed:', error);
          // Handle error display or other actions
        }
      };

    const handleSignUp = async (email, password) => {
        try {
            // Make a POST request to the signup endpoint
            const response = await fetch('http://localhost:3001/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            // Parse the response JSON
            const data = await response.json();

            if (response.ok) {
                // Successful signup
                console.log('Signup successful:', data.message);
                navigate('/signupcontinue');
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

    return (
        <div className="container">
            <div className="row">
                <div className={`col-md-6 ${isSignUp ? 'order-md-2 slide-in-right' : 'order-md-1 slide-in-left'}`}>
                    {/* Display error message */}
                    {errorMessage && <h2 style={{ color: 'red', fontSize: '1.8vw' }}>{errorMessage}</h2>}                    
                    {isSignUp ? (
                        <SignUp handleSignUp={handleSignUp} />
                    ) : (
                        <SignIn handleSignIn={handleSignIn} />
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
    );
};

export default Login;
