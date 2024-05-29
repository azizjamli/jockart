import React from 'react';
import './travaildegroup.css';
import travail1 from '../assets/travail1.png';
import travail2 from '../assets/travail2.png';
import travail3 from '../assets/travail3.png';

const TravailDeGroup = () => {
  return (
    <div>
      <div className="container bansortie">
        <div className="row p-5">
          <h1 className="titrefenligne text-center">
            <span className='aposs'>“</span>Découvrez nos projets de groupe 
            passionnants où la créativité rencontre la
            collaboration pour des réalisations 
            exceptionnelles<span className='aposs'>”</span>
          </h1>
        </div>
      </div>

      <div className="container">
        <h1 className="titrefenligne text-center"></h1>
        <div className="row  d-flex justify-content-around mt-5">
          <div className="col-md-4">
            <div className="card border-0 cardtgrp ">
              <img src={travail1} className="card-img-top imagetgrp" alt="Conception d'une identité visuelle pour une start-up locale" />
              <div className="card-body block card-bodytgrp">
                <div>Conception d'une identité visuelle pour  une start-up locale</div>
              </div>
            </div>
          </div>
          
          <div className="col-md-4">
            <div className="card border-0 cardtgrp ">
              <img src={travail2} className="card-img-top imagetgrp" alt="Réalisation d'une série photographique sur un thème spécifique" />
              <div className="card-body block card-bodytgrp">
                <div>Réalisation d'une série photographique sur un thème spécifique</div>
              </div>
            </div>
          </div>
          
          <div className="col-md-4">
            <div className="card border-0 cardtgrp ">
              <img src={travail1} className="card-img-top imagetgrp" alt="Réalisation d'un projet de design interactif" />
              <div className="card-body block card-bodytgrp">
                <div>Réalisation d'un projet de design interactif</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container containeraaa mt-5">
        <div className='row p-4'>
            <div className='col-md-6'>
        <h1 className='titre10  text-center text-md-start mt-5'>Avec Jock’Art Formation</h1>
        <p className='text1 text-center text-md-start mt-5'>
          Les projets de groupe permettent  
          aux étudiants de développer 
          leur créativité, leur collaboration 
          et leur expertise dans leur 
          domaine d'étude.
        </p>
        </div>
        <div className='col-md-6'>
        <img src={travail3} className='img-fluid imgtgrp' alt="Placeholder" />
         </div>
         </div>
      </div>




      <div className="container ban5 mt-5">
        <h1 className="titrefenligne text-center mb-3">
          "Inscrivez-vous dès maintenant pour participer à nos forums de discussion"
        </h1>
        <button className="btn btnreseau">Inscrivez-vous</button>
      </div>
    </div>
  );
}

export default TravailDeGroup;
