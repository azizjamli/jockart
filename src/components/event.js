import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './event.css';
import event1 from '../assets/event1.png';
import event2 from '../assets/event2.png';
import event3 from '../assets/event3.png';
import event4 from '../assets/event4.png';

const Event = () => {
  return (
    <div>
      <div className="container ban5">
        <div className="row p-5">
          <h1 className="titrefenligne text-center">
            <span className='aposs'> " </span>Dynamisez votre Parcours : <br /> Ne Manquez pas nos Événements ! <span className='aposs'>"</span>
          </h1>
          </div>
          <div className='row'>
          <div className="col-md-5 mt-5">
            <img
              src={event1}
              className="img-fluid imagefenligne2"
              alt="Placeholder"
            />
          </div>
          <div className="col-md-7 section2 p-5 d-flex flex-column align-items-center align-items-md-start text-start mt-5">
            <p className="text1">
              Plongez au cœur de l'action avec l'équipe passionnée de Jock'Art Formation lors de nos événements ! 
              Rencontrez nos membres dévoués et découvrez des expériences inoubliables dans le monde du design graphique et de la photographie.
            </p>
            <button className="btn ">Rejoignez-nous</button>
          </div>
        </div>
      </div>

      <div className="container ban5">
        <h1 className="titrefenligne text-center">
          "Prochaines Aventures : Plongez dans <br /> l'Univers Créatif de Jock'Art Formation"
        </h1>
        <div className="row p-5">
          <div className="col-md-4">
            <div className="card unique-cardtgrp">
              <img
                src={event2}
                className="card-img-top unique-imagetgrp"
                alt="Exploration des Fondamentaux du Design Graphique"
              />
              <div className="card-body unique-card-bodytgrp">
                <div className="unique-block">
                  Exploration des <br /> Fondamentaux du <br /> Design Graphique
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card unique-cardtgrp">
              <img
                src={event3}
                className="card-img-top unique-imagetgrp"
                alt="Capturer l'Instant : Les Secrets de la Photographie Professionnelle"
              />
              <div className="card-body unique-card-bodytgrp">
                <div className="unique-block">
                  Capturer l'Instant : Les <br /> Secrets de la <br /> Photographie <br /> Professionnelle
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card unique-cardtgrp">
              <img
                src={event4}
                className="card-img-top unique-imagetgrp"
                alt="Talent en Lumière : Découvrez les Œuvres Créatives de nos Étudiants"
              />
              <div className="card-body unique-card-bodytgrp">
                <div className="unique-block">
                  Talent en Lumière : <br /> Découvrez les Œuvres <br /> Créatives de nos <br /> Étudiants
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container ban5">
        <h1 className="unique-titrefenligne text-center">
          "Rejoignez-nous pour une expérience créative inoubliable ! Inscrivez-vous dès maintenant pour participer à nos événements."
        </h1>
        <button className="btn mt-3">Inscrivez-vous</button>
      </div>
    </div>
  );
};

export default Event;
