import React, { useState } from "react";
import "./login.css";
import SignIn from "./signin";
import SignUp from "./signup";

const Login = () => {
    const [isSignUp, setIsSignUp] = useState(false);

    const toggleSignUp = () => {
        setIsSignUp(!isSignUp);
    };

    const handleSignIn = async (event) => {
        if (event) {
            event.preventDefault(); // Prevent the default form submission behavior
        }
    
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
                console.log('Signin successful:', data.token);
                
                // Store the JWT token in local storage or session storage
                localStorage.setItem('token', data.token);
    
                // Redirect or perform further actions if needed
            } else if (response.status === 401) {
                // Invalid credentials or unauthorized
                console.error('Signin failed:', data.error);
                // Display an error message to the user
                // For example:
                // setError('Invalid email or password');
            } else {
                // Other errors
                console.error('Signin failed:', data.error);
                // Handle other error scenarios
            }
        } catch (error) {
            console.error('Signin failed:', error);
            // Handle network or other errors
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
