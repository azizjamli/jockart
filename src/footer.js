import React from "react";
import "./footer.css";
import phone from './assets/phone.png'; // Corrected import statement
import mail from './assets/mail.png'; // Corrected import statement
import localisation from './assets/localisation.png'; // Corrected import statement

const Footer = () => {
  return (
    <footer className="footer mt-5">
      <div className="container">
        <div className="row">
            <div className="col-md-5 col-sm-12">
                <h1 className="text-start titrefooter">Embrassez Votre Créativité avec <br /> <span className="highlightfooter">Jock'Art Formation</span></h1>
                <p className="text-start text1footer">Jock'Art Formation est votre partenaire dans votre parcours artistique. Avec notre engagement envers l'excellence et notre passion pour la créativité, nous sommes là pour vous aider à réaliser vos aspirations artistiques.</p>
            </div>
            <div className="col-md-3 col-sm-5 mt-5 pt-5 ">
                <h3 className="text-start titrefooter1">Formations</h3>
                <ul className="text-start listfooter">
                    <li>Design graphique</li> 
                    <li>Photographie</li> 
                    <li>Montage vidéo</li>
                    <li>Motion design</li>
                    <li>Infographie</li>
                </ul>
            </div>
            <div className="col-md-4 col-sm-7 mt-5 pt-5 d-flex flex-column"> {/* Added flex-column */}
                <h3 className="text-start titrefooter1">Contactez-nous</h3>
                <div className="d-flex align-items-center mb-3">
                    <img src={phone}alt="Phone Icon" />
                    <p className="ms-2 mb-0">+216 24 840 405</p> {/* Added margin-start (ms) for spacing */}
                </div>
                <div className="d-flex align-items-center mb-3">
                    <img src={mail} alt="Email Icon" />
                    <p className="ms-2 mb-0">jockartf@gmail.com</p> {/* Added margin-start (ms) for spacing */}
                </div>
                <div className="d-flex align-items-center">
                    <img src={localisation} alt="Address Icon" />
                    <p className="ms-2 mb-0">12 Rue Tozeur, Tunis 1000 Tunis, Tunisie</p> {/* Added margin-start (ms) for spacing */}
                </div>
                </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
