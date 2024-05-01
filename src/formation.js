import React from "react";
import "./formation.css";
import doublearrows from './assets/doublearrows.png'; // Corrected import statement












const Formations = () => {
    return (
      <>
      <div className="container mt-5">
        <div className="row">
            <h1 className="titreapropos">Formations</h1>
            <div className="d-flex align-items-basline  justify-content-center gap-3">
            <h3 className="titre3">Acceuil</h3> 
            <img src={doublearrows} className="doublearrows " alt="doublearrows" />
            <h3 className="titre3">Formations</h3>
            </div>
        </div>
        <div className="row sectionformation1 mt-5">
            <div className="">
                <h1 className="titreformation1 mt-5">Nos programmes <br /> Par niveau </h1>
            </div>    
            <div className=" d-flex justify-content-center mt-3 mb-5">
                <div className="col-md-5">
                    <h1 className="niveau">Niveau <br /> débutant </h1>
                    <p className="niveaup text-center mt-5">Une formation à partir de 6 mois cours du jour + weekend</p>
                </div>
                <div className="col-md-2 theline">

                </div>
                <div className="col-md-5">
                    <h1 className="niveau">Niveau <br /> professionnel </h1>
                    <p className="niveaup text-center mt-5">Une formation à partir de 3 mois le weekend</p>
                </div>
            </div>     
        </div>
        <div className="row mt-5 ">
            <div className="d-flex justify-content-around">
                <div className="circleformation1 p-5">
                    <p>08 Formateurs </p>
                </div>
                <div className="circleformation1 p-5">
                    <p>120 Diplômes </p>
                </div>
                <div className="circleformation1 p-5">
                <p>29 Emplois actuels</p>
                </div>
            </div>    
        </div>
      </div>


        
        </>
    );
  };
  
  export default Formations;