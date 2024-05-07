import React, { useState } from 'react';
import "./formation.css"
import DesignGraphique from './DesignGraphique'; // Import your menu item components
import MontageVideo from './MontageVideo'; // Import other menu item components
import MotionDesign from './MotionDesign'; // Import other menu item components
import Photographie from './Photographie'; // Import other menu item components
import Infographie from './Infographie'; // Import other menu item components
import doublearrows from './assets/doublearrows.png'; // Assuming you have the doublearrows image

const FormationPage = () => {
    const [activeMenuItem, setActiveMenuItem] = useState(null); // State to track active menu item

    // Function to render the active menu item component or default content
    const renderActiveMenuItem = () => {
        switch (activeMenuItem) {
            case 'design':
                return <DesignGraphique />;
            case 'montage':
                return <MontageVideo />;
            case 'motion':
                return <MotionDesign />;
            case 'photographie':
                return <Photographie />;
            case 'infographie':
                return <Infographie />;
            // Add cases for other menu items
            default:
                return (
                    <>
                        <div className="row sectionformation1 ">
                            <div className="">
                                <h1 className="titreformation1 mt-5">Nos programmes <br /> Par niveau </h1>
                            </div>    
                            <div className=" d-flex justify-content-center mt-3 mb-5">
                                <div className="col-md-5">
                                    <h1 className="niveau">Niveau <br /> débutant </h1>
                                    <p className="niveaup text-center mt-5">Une formation à partir de 6 mois cours du jour + weekend</p>
                                </div>
                                <div className="col-md-2 theline"></div>
                                <div className="col-md-5">
                                    <h1 className="niveau">Niveau <br /> professionnel </h1>
                                    <p className="niveaup text-center mt-5">Une formation à partir de 3 mois le weekend</p>
                                </div>
                            </div>     
                        </div>
                        <div className="row mt-5 ">
                            <div className="d-flex justify-content-around">
                                <div className="circleformation1 p-5">
                                    <p className='textcircleformation'>08 Formateurs </p>
                                </div>
                                <div className="circleformation1 p-5">
                                    <p className='textcircleformation'>120 Diplômes </p>
                                </div>
                                <div className="circleformation1 p-5">
                                    <p className='textcircleformation'>29 Emplois actuels</p>
                                </div>
                            </div>    
                        </div>
                    </>
                );
        }
    };

    return (
        <div className="container">
            {/* Header */}
            <div className="row">
                <h1 className="titreapropos">Formations</h1>
                <div className="d-flex align-items-baseline justify-content-center gap-3">
                    <h3 className="titre3">Acceuil</h3>
                    <img src={doublearrows} className="doublearrows" alt="doublearrows" />
                    <h3 className="titre3">Formations</h3>
                </div>
            </div>

            {/* Bootstrap Navbar */}
            <nav className="navbar  navbar-formation navbar-expand-md ">
    <div className="container-fluid">
        
        <div className="collapse d-flex justify-content-evenly navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ">
                <li className={`nav-item ${activeMenuItem === 'design' ? 'active' : ''}`}>
                    <a className="nav-link" onClick={() => setActiveMenuItem('design')}>Design graphique</a>
                </li>
                <li className={`nav-item ${activeMenuItem === 'montage' ? 'active' : ''}`}>
                    <a className="nav-link" onClick={() => setActiveMenuItem('montage')}>Montage video</a>
                </li>
                <li className={`nav-item ${activeMenuItem === 'motion' ? 'active' : ''}`}>
                    <a className="nav-link" onClick={() => setActiveMenuItem('motion')}>Motion Design</a>
                </li>
                <li className={`nav-item ${activeMenuItem === 'photographie' ? 'active' : ''}`}>
                    <a className="nav-link" onClick={() => setActiveMenuItem('photographie')}>Photographie</a>
                </li>
                <li className={`nav-item ${activeMenuItem === 'infographie' ? 'active' : ''}`}>
                    <a className="nav-link" onClick={() => setActiveMenuItem('infographie')}>Infographie</a>
                </li>
                {/* Add other menu items */}
            </ul>
        </div>
    </div>
</nav>


            {/* Render active menu item or default content */}
            <div className="row mt-5">
                {renderActiveMenuItem()}
            </div>
        </div>
    );
};

export default FormationPage;
