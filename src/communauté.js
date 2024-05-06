import React from "react";
import "./communauté.css";
import doublearrows from "./assets/doublearrows.png";
import cardimage1 from "./assets/imagecommunauté1.png";
import apostrophecard from "./assets/communautécardapostrophe.png"






const Communauté = () => {
    return (
      <>
        <div className="container">
            <div className="row mt-5 mb-5">
                <h1 className="titreapropos">Communauté</h1>
                <div className="d-flex align-items-basline  justify-content-center gap-3">
                  <h3 className="titre3">Acceuil</h3> 
                  <img src={doublearrows} className="doublearrows " alt="doublearrows" />
                  <h3 className="titre3">Communauté</h3>
                </div>
            </div>
            <div className="row mt-5">
              <h2>Chez Jock'Art Formation , la satisfaction des formateurs et la collaboration étroite avec nos étudiants sont au cœur de notre réussite.</h2>
            </div>
            <div className="row d-flex justify-content-center align-items-start mt-5">
              <div className="card col-md-6  align-self-start d-flex justify-content-center    border-0">
                <div className="card-body card-body-communauté">
                <img src={cardimage1} className="card-img-top card-img-communauté " alt="Placeholder Image" />
                  <img src={apostrophecard} className="apostrophe" alt="apostrophe"></img>
                  <img src={apostrophecard} className="apostrophe1" alt="apostrophe"></img>
                  <h5 className="card-title mt-3 ">Dorra Masmoudi</h5>
                  <p className="card-text mt-3">La communauté de Jock'Art est une source d'inspiration constante pour moi en tant que formateur de design graphique.</p>
                  <img src={apostrophecard} className="apostrophe2" alt="apostrophe"></img>
                  <img src={apostrophecard} className="apostrophe3" alt="apostrophe"></img>
                </div>
               </div>
               <div className="card col-md-6 border-0 " style={{marginTop:  '80px'}} >
                <div className="card-body card-body-communauté">
                <img src={cardimage1} className="card-img-top card-img-communauté " alt="Placeholder Image" />
                  <img src={apostrophecard} className="apostrophe" alt="apostrophe"></img>
                  <img src={apostrophecard} className="apostrophe1" alt="apostrophe"></img>
                  <h5 className="card-title mt-3 ">Nour Ben Salah </h5>
                  <p className="card-text mt-3">C'est un plaisir de partager mes connaissances et mon expertise avec des étudiants aussi enthousiastes et désireux d'apprendre.</p>
                  <img src={apostrophecard} className="apostrophe2" alt="apostrophe"></img>
                  <img src={apostrophecard} className="apostrophe3" alt="apostrophe"></img>
                </div>
               </div>
            </div>

            <div className="row d-flex justify-content-center align-items-start mt-5">
              <div className="card col-md-6  align-self-start d-flex justify-content-center    border-0">
                <div className="card-body card-body-communauté">
                <img src={cardimage1} className="card-img-top card-img-communauté " alt="Placeholder Image" />
                  <img src={apostrophecard} className="apostrophe" alt="apostrophe"></img>
                  <img src={apostrophecard} className="apostrophe1" alt="apostrophe"></img>
                  <h5 className="card-title mt-3 ">Dorra Masmoudi</h5>
                  <p className="card-text mt-3">La communauté de Jock'Art est une source d'inspiration constante pour moi en tant que formateur de design graphique.</p>
                  <img src={apostrophecard} className="apostrophe2" alt="apostrophe"></img>
                  <img src={apostrophecard} className="apostrophe3" alt="apostrophe"></img>
                </div>
               </div>
               <div className="card col-md-6 border-0 " style={{marginTop:  '80px'}} >
                <div className="card-body card-body-communauté">
                <img src={cardimage1} className="card-img-top card-img-communauté " alt="Placeholder Image" />
                  <img src={apostrophecard} className="apostrophe" alt="apostrophe"></img>
                  <img src={apostrophecard} className="apostrophe1" alt="apostrophe"></img>
                  <h5 className="card-title mt-3 ">Nour Ben Salah </h5>
                  <p className="card-text mt-3">C'est un plaisir de partager mes connaissances et mon expertise avec des étudiants aussi enthousiastes et désireux d'apprendre.</p>
                  <img src={apostrophecard} className="apostrophe2" alt="apostrophe"></img>
                  <img src={apostrophecard} className="apostrophe3" alt="apostrophe"></img>
                </div>
               </div>
            </div>
            
  

        </div>
        
        </>
    );
  };
  
  export default Communauté;