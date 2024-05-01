import React from "react";
import "./aPropos.css";
import doublearrows from './assets/doublearrows.png'; // Corrected import statement
import imageapropos1 from './assets/imageapropos1.png'; // Corrected import statement
import imagecardapropos1 from './assets/imagecardapropos1.png'; // Corrected import statement
import imagecardapropos2 from './assets/imagecardapropos2.png'; // Corrected import statement
import imagecardapropos3 from './assets/imagecardapropos3.png'; // Corrected import statement
import imageapropos2 from './assets/imageapropos2.png'; // Corrected import statement










const APropos = () => {
    return (
      <>
      <div className="container mt-5">
        <div className="row">
            <h1 className="titreapropos">A propos</h1>
            <div className="d-flex align-items-basline  justify-content-center gap-3">
            <h3 className="titre3">Acceuil</h3> 
            <img src={doublearrows} className="doublearrows " alt="doublearrows" />
            <h3 className="titre3">A propos</h3>
            </div>
        </div>
        <div className="row mt-5">
             <div className="col-md-7 order-2 order-md-1 section1 d-flex flex-column align-items-center align-items-md-start p-4">
                  <p className="text1 ms-2 text-center text-md-start">Notre école s'engage à fournir une formation de haute qualité, dispensée par des professionnels chevronnés de l'industrie, afin d'aider nos étudiants à développer leur créativité, leurs compétences techniques et leur expertise professionnelle.</p>
                  <button className="btn btnapropos1 ms-2">Explorez-nous</button>
            </div>
            <div className="col-md-5 order-1 mt-3 ">
               <img src={imageapropos1} className="img-fluid mb-2 imageapropos1" alt="image1" />
             </div>
        </div>

        <div className="row mt-5">
            <h2 className="titre">Actualités</h2>
        </div>
        <div className="row d-flex justify-content-around mt-5">
                <div className="col-lg-4 col-md-6 mb-4 d-flex justify-content-center">
                     <div className="card cardapropos">
                         <img src={imagecardapropos1} className="card-img-top card-img-top-apropos" alt="Placeholder" />
                         <div className="card-body ps-5 pe-5">
                            <p className="card-text card-text-apropos mt-2">Annonce du lancement d'un nouveau cours de design graphique . </p>
                          </div>
                    </div>
                </div>

                <div className="col-lg-4 col-md-6 mb-4 d-flex justify-content-center">
                     <div className="card cardapropos">
                         <img src={imagecardapropos2} className="card-img-top card-img-top-apropos" alt="Placeholder" />
                         <div className="card-body ps-5 pe-5">
                            <p className="card-text card-text-apropos mt-2">Annonce de partenariats avec des entreprises locales .</p>
                          </div>
                    </div>
                </div>

                <div className="col-lg-4 col-md-6 mb-4 d-flex justify-content-center">
                     <div className="card cardapropos">
                         <img src={imagecardapropos3} className="card-img-top card-img-top-apropos" alt="Placeholder" />
                         <div className="card-body ps-5 pe-5">
                            <p className="card-text card-text-apropos mt-2">Présentation des nouveaux membres de l'équipe pédagogique .</p>
                          </div>
                    </div>
                </div>
        </div>
        <div className="row mt-5">
            <div className="col-md-5">
              <img src={imageapropos2} className="img-fluid imageapropos2" alt="Placeholder" />
            </div>
            <div className="col-md-7 section2 p-3 d-flex flex-column  align-items-center align-items-md-start text-start mt-5">
                <p className="text1">L'histoire de Jock'Art Formation est une histoire d'engagement envers l'art et la créativité. Fondée il y a 3ans par Madame Alya, notre école est née de la vision de fournir une formation de qualité , ouvrant ainsi les portes vers un monde d'opportunités pour les passionnés d'arts visuels.</p>
                <button className="btn btnapropos1">Contactez-nous</button>
            </div>

        </div>

      </div>
        
        </>
    );
  };
  
  export default APropos;