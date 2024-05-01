import React from "react";
import "./contact.css";
import doublearrows from './assets/doublearrows.png'; // Corrected import statement
import imagecontact from './assets/imagecontact.png'; // Corrected import statement












const Contact = () => {
    return (
      <>
      <div className="container mt-5">
        <div className="row">
            <h1 className="titre">Contact</h1>
            <div className="d-flex align-items-basline  justify-content-center gap-3">
            <h3 className="titre3">Acceuil</h3> 
            <img src={doublearrows} className="doublearrows " alt="doublearrows" />
            <h3 className="titre3">Contact</h3>
            </div>
        </div>
        <div className="row mt-5">
            <div className="col-md-5 section1 me-2 ps-5 pe-5 pt-3 ">
                <h3 className="textcontact text-start mb-5">Nous sommes là pour vous aider ! Contactez-nous.</h3>
                <img src={imagecontact} className="img-fluid imagecontact mt-5" alt="Placeholder Image" />
            </div>
            <div className="col-md-6 d-flex flex-column ms-2 mt-3 mt-md-0">
                <div className="d-flex justify-content-between ">
                    <input className="nmcontact"  type="text" id="nom" placeholder="Nom" ></input>
                    <input className="nmcontact" type="text" id="prenom" placeholder="Prénom"></input>
                </div>
                <input className="mt-4"  type="tel" id="tel" placeholder="Numéro de téléphone"></input>
                <input className="mt-4" type="email" id="email" placeholder="Adresse email"></input>
                <input className="mt-5" type="text" id="message" placeholder="Poser des questions ou demander des informations"></input>
            </div>
        </div>

        <div className="row mt-5">
           <button className="btn btncontact">Contactez-nous</button>
        </div>
       
      </div>
        
        </>
    );
  };
  
  export default Contact;