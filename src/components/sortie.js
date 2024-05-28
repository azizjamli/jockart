import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import sortie1 from '../assets/sortie1.png';
import sortie2 from '../assets/sortie2.png';
import sortie3 from '../assets/sortie3.png';
import './sortie.css'; // Assuming css.css is in the same folder or adjust the path accordingly

const Sortie = () => {
  return (
    <div>
      <div className="container bansortie">
        <div className="row mb-5">
          <h1 className="titrefenligne text-center mt-5">
            <span className='aposs'>“</span> Parcourez notre sélection d'expériences <br /> d'apprentissage passionnantes pour enrichir <br /> votre parcours académique! <span className='aposs'>”</span>
          </h1>
        </div>
        <div className="row div2sortie">
          <div className="col-sm-4">
            <div className="card cardsortie block">
              <img src={sortie1} className="card-img-top cardimgsortie" alt="Excursion en plein air" />
              <div className="card-body cardsortieb ">
                <p className="card-text mt-5">Excursion en plein air pour pratiquer la photographie de paysages</p>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="card cardsortie block">
              <img src={sortie2} className="card-img-top cardimgsortie" alt="Visite à un studio de design graphique local" />
              <div className="card-body cardsortieb">
                <p className="card-text mt-5">Visite à un studio de design graphique local</p>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="card cardsortie block">
              <img src={sortie3} className="card-img-top cardimgsortie  " alt="Atelier pratique de sérigraphie ou de typographie" />
              <div className="card-body cardsortieb">
                <p className="card-text mt-5">Atelier pratique de sérigraphie ou de typographie</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container ban5 mt-5">
        <h3 className='text-center'>“Questions fréquentes sur nos sorties “ </h3>
      </div>

      <div className="container questions mt-5">
        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="card">
              <div className="card-header custom-bg text-white">
                Quels sont les types de sorties proposées par l'école ?
              </div>
              <div className="card-body">
                <p className="card-text">
                  Les types de sorties proposées par l'école incluent des excursions en plein air, des ateliers pratiques en studio...
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card">
              <div className="card-header custom-bg text-white">
                Comment sont organisées les sorties et qui peut y participer ?
              </div>
              <div className="card-body">
                <p className="card-text">
                  Les sorties sont organisées par l'équipe pédagogique de l'école et sont ouvertes à tous les étudiants inscrits.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card">
              <div className="card-header custom-bg text-white">
                Quels sont les avantages pour les étudiants de participer à ces sorties ?
              </div>
              <div className="card-body">
                <p className="card-text">
                  Ils peuvent élargir leur réseau professionnel, découvrir de nouvelles perspectives créatives et développer des compétences pratiques.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card">
              <div className="card-header custom-bg text-white">
                Est-ce que les sorties sont obligatoires ou facultatives ?
              </div>
              <div className="card-body">
                <p className="card-text">
                  Les sorties peuvent être obligatoires ou facultatives selon le programme d'études et les exigences du cursus.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container ban5">
        <h3>
          “Besoin de renseignements supplémentaires ou envie <br /> de participer à nos sorties pratiques ?”
        </h3>
        <button className="btn btnreseau">Inscrivez-vous</button>
      </div>
    </div>
  );
};

export default Sortie;
