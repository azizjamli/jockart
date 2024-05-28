import React from 'react';
import './systemepedagogique.css';  // Assuming you have a css.css file in the same directory
import doublearrows from '../assets/doublearrows.png'; // Assuming you have the doublearrows image
import { useNavigate } from 'react-router-dom';
import Sortie from './sortie';

const Systemepedagogique = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="container mt-5">
        <div className="row mt-5">
          <h1 className="titreapropos">Formations</h1>
          <div className="d-flex align-items-baseline justify-content-center gap-3">
            <h3 className="titre3">Accueil</h3>
            <img src={doublearrows} className="doublearrows" alt="doublearrows" />
            <h3 className="titre3">Formations</h3>
          </div>
        </div>

        <div className="row mt-5 mb-4">
          <div className="col-12">
            <div className="custom-card col-7 position-relative p-4">
              <p className="mb-3">
                Des cours en ligne interactifs et des tutoriels vidéo permettent aux étudiants d'apprendre à leur propre rythme et de réviser le contenu à tout moment.
              </p>
              {/* Corrected onClick handler */}
              <button className="ms-2 btn formation-label text-wrap position-absolute" onClick={() => navigate('/sortie')} >Apprentissage <br /> Expérientiel</button>
            </div>
          </div>
        </div>

        <div className="row justify-content-end mb-4">
          <div className="col-7">
            <div className="custom-card position-relative p-4">
              <p className="mb-3">
                Des cours en ligne interactifs et des tutoriels vidéo permettent aux étudiants d'apprendre à leur propre rythme et de réviser le contenu à tout moment.
              </p>
              <div className="formation-lab position-absolute">Travail de Groupe</div>
            </div>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-12">
            <div className="custom-card col-7 position-relative p-4">
              <p className="mb-3">
                Des cours en ligne interactifs et des tutoriels vidéo permettent aux étudiants d'apprendre à leur propre rythme et de réviser le contenu à tout moment.
              </p>
              <button className="formation-label position-absolute btn" onClick={() => navigate('/formationenligne')}>Formation en ligne</button>
            </div>
          </div>
        </div>

        <div className="row justify-content-end mb-4">
          <div className="col-7">
            <div className="custom-card position-relative p-4">
              <p className="mb-3">
                Des cours en ligne interactifs et des tutoriels vidéo permettent aux étudiants d'apprendre à leur propre rythme et de réviser le contenu à tout moment.
              </p>
              <div className="formation-lab position-absolute">Formation en ligne</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Systemepedagogique;
