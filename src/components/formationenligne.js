import React from 'react';
import './formationenligne.css';  // Assuming you have a CSS file for styling
import fenligne1 from '../assets/fenligne1.png';
import fenligne2 from '../assets/fenligne2.png';

const FormationEnLigne = () => {
  return (
    <>
      <div className="containerbaneligne">
        <div className="row p-5 ">
          <h1 className="titrecommunauté text-center"> <span className='aposs'>"</span>Découvrez notre formation en ligne pour <br /> développer vos compétences créatives<span className='aposs'>"</span> </h1>
        </div>

        <div className="container containeraaa mt-5">
          <div className="row p-2">
            <div className="col-md-6">
              <img src={fenligne1} className="img-fluid img1 " alt="First Image" />
            </div>
            <div className="col-md-6 ">
              <h1 className="titre10  text-center text-md-start mt-5">Explorez les Possibilités</h1>
              <p className="text1 text-center text-md-start mt-5">Grâce à notre plateforme  interactive, les étudiants ont la  possibilité d'explorer une variété  de cours, de tutoriels vidéo et  d'exercices pratiques, adaptés à  tous les niveaux de compétence.</p>
              <div className="mt-5 d-flex g-5 justify-content-center gap-5">
                <button className="btn">Contactez-nous</button>
              </div>
            </div>
          </div>
        </div>

        <div className="container pt-5 mt-5">
          <div className="row">
            <div className="col-md-6">
              <h1 className="titre1 text-center text-lg-start">"Explorez. Apprenez. Créez."</h1>
              <p className="text3 mt-5 text-center text-lg-start">Découvrez notre vibrant forum de <br /> discussion, un espace dynamique où la <br /> communauté des passionnés de design <br /> graphique et de photographie se réunit <br /> pour échanger des idées, partager des <br /> conseils et discuter des dernières <br /> tendances de l'industrie.</p>
            </div>
            <div className="col-lg-6 col-md-12">
              <img src={fenligne2} className="imageapropos2 img-fluid" alt="Second Image" />
            </div>
          </div>
        </div>

        <div className="container text-center pt-5 mt-5">
          <div className="row d-flex justify-content-center">
            <div className="col-md-3">
              <div className="circleformation1">
                <p className='textcircleformation text-center pt-4'>enregistrements</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="circleformation1">
                <p className='textcircleformation'>Des collaborations</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="circleformation1">
                <p className='textcircleformation'>Un forum de <br /> discussion</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormationEnLigne;
