import React from "react";
import "./acceuil.css";
import banner from './assets/banner.png'; // Corrected import statement
import image1 from './assets/image1.png'; // Corrected import statement
import image2 from './assets/image2.png'; // Corrected import statement
import imagecard1 from './assets/imagecard1.png'; // Corrected import statement
import imagecard2 from './assets/imagecard2.png'; // Corrected import statement
import imagecard3 from './assets/imagecard3.png'; // Corrected import statement


const Acceuil = () => {
  return (
    <><div className="container ban">
    <div className="row p-5 ">
      <div className="col-lg-7 col-md-12 d-flex flex-column align-items-center align-items-lg-start">
        <h1 className="titre text-center text-lg-start"> Explorez votre créativité avec notre école de <br />
          <span className="highlight">design et photographie</span>
        </h1>
        <div className="d-lg-none mb-4"> {/* Hidden for lg and larger screens */}
          <img src={banner} className="banner bannerAnimation" alt="Placeholder Image" />
        </div>
        <p className="text text-center text-lg-start mt-lg-4">Avec des cours interactifs, des instructeurs passionnés et une communauté dynamique, nous vous aidons à développer vos compétences et à libérer votre créativité.</p>
        <button className="btn mt-5">Rejoignez-nous</button>
      </div>
      <div className="col-lg-5 col-md-12 d-none d-lg-flex flex-column align-items-center align-items-lg-start"> {/* Hidden for md and smaller screens */}
        <img src={banner} className="banner bannerAnimation ms-1" alt="Placeholder Image" />
      </div>
    </div>
  </div>
  
    <div className="container mt-5">
      <div className="row">
            <div className="col-lg-5 col-md-12">
              <img className="img-fluid image1" src={image1} alt="" />
            </div>
            <div className="col-lg-7  col-md-12">
              <h1 className="titre1 text-center text-lg-start"><span className="highlight1">Avec Jock'Art Formation </span> Notre Engagement et Nos Forces à Votre Service</h1>
              <p className="text-1 text-center text-lg-start mt-5">Notre école se distingue par son équipe d'instructeurs passionnés, ses programmes de formation innovants et ses installations de pointe. Nous offrons un environnement d'apprentissage inspirant où chaque élève est encouragé à explorer sa créativité et à développer ses compétences artistiques.</p>
              <div className="mt-5 d-flex g-5 justify-content-center gap-5">
                <btn className="btn">Découvrez-nous</btn>
                <btn className="btn btn1">Voir plus </btn>
              </div>
            </div>

          </div>
        
      </div>
      
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-6">
            <h1 className="titre2 text-center text-lg-start">Notre mission chez <br /> <span className="highlight1">Jock'Art Formation</span></h1>
            <p className="text-2 mt-5 text-center text-lg-start">Nous visons à former une nouvelle génération d'artistes talentueux et visionnaires qui contribueront de manière significative au monde de l'art et du design. Rejoignez-nous dans cette aventure artistique et contactez-nous pour  vous aider à concrétiser vos aspirations créatives.</p>

          </div>
          <div className="col-lg-6 col-md-12">
             <img src={image2} className="image2 img-fluid" alt="" />
          </div>

        </div>

      </div>


      <div className="container p-5">
  <div className="row mt-5 justify-content-center">
    <h3 className="titre3 text-lg-start">Témoignages</h3>
    <p className="text3 text-lg-start">Inspirants de Nos Étudiants</p>
  </div>
  <div className="row testimonials mt-5 gx-4 gy-5 justify-content-center"> {/* Added gy-4 for vertical spacing */}
    <div className="col-lg-4 col-md-6 mb-4 d-flex justify-content-center">
      <div className="card cardacceuil">
        <img src={imagecard1} className="card-img-top card-img-top-acceuil " alt="Placeholder" />
        <div className="card-body ps-5 pe-5">
          <h5 className="card-title card-title-acceuil mt-2">Formation de 3 mois en design graphique</h5>
          <p className="card-text card-text-acceuil mt-5">La formation en design graphique de 3 mois chez Jock'Art Formation a été une expérience véritablement transformative pour moi.</p>
        </div>
      </div>
    </div>

    <div className="col-lg-4 col-md-6 mb-4 d-flex justify-content-center">
      <div className="card cardacceuil">
        <img src={imagecard2} className="card-img-top card-img-top-acceuil" alt="Placeholder" />
        <div className="card-body ps-5 pe-5">
          <h5 className="card-title card-title-acceuil mt-2">Formation de 1 mois en cadrage vidéo et montage</h5>
          <p className="card-text card-text-acceuil mt-5">Je suis reconnaissant envers Jock'Art Formation pour cette opportunité incroyable de développement personnel et professionnel.</p>
        </div>
      </div>
    </div>

    <div className="col-lg-4 col-md-6 mb-4 d-flex justify-content-center">
      <div className="card cardacceuil">
        <img src={imagecard3} className="card-img-top card-img-top-acceuil" alt="Placeholder" />
        <div className="card-body ps-5 pe-5">
          <h5 className="card-title card-title-acceuil mt-2">Formation de 1 mois en photographie</h5>
          <p className="card-text card-text-acceuil mt-5">Merci à toute l'équipe de Jock'Art Formation pour cette expérience exceptionnelle!</p>
        </div>
      </div>
    </div>
  </div>
</div>


      <div className="container ban newsletter p-4 mt-5">
        <div className="row mt-5">
          <h3 className="titre ">Newsletter</h3>
          <p className="mt-3 text-3">VOUS VOULEZ REJOINDRE NOTRE NEWSLETTER ?</p>
        </div>
        <div className="row p-3  ">
          <input className="col-lg-8 col-md-12 mt-2  inpt" type="email" placeholder="Ton adresse mail "></input>
          <button className="btn btn3 col-lg-3 mt-2 col-md-12 ms-5">Inscrivez-vous</button>

        </div>

      </div>
      
      </>
  );
};

export default Acceuil;