import React, { useState, useEffect } from 'react';
import axios from 'axios';
import doublearrows from '../assets/doublearrows.png'; // Assuming you have the doublearrows image
import './formation.css';

const FormationPage = () => {
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [coursFinderData, setCoursFinderData] = useState([]);
    const [selectedCoursId, setSelectedCoursId] = useState(null);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await axios.get('http://localhost:3001/api/categories/getAllCategories');
                setCategories(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setLoading(false);
            }
        }

        fetchCategories();
    }, []);

    const handleCategoryClick = async (categoryId) => {
        setSelectedCategoryId(categoryId);
        setSelectedCoursId(null);
        try {
            const response = await axios.get(`http://localhost:3001/api/cours/getCoursByCategorieId/${categoryId}`);
            setCoursFinderData(response.data);
        } catch (error) {
            console.error('Error fetching courses by category:', error);
        }
    };

    const renderCoursePhoto = (photo) => {
        return photo ? (
            <img src={photo} alt="Course" className="card-img-top" />
        ) : (
            <div>No Photo</div>
        );
    };

    // Function to render the active menu item component or default content
    const renderActiveMenuItem = () => {
        const additionalContent = (
            <div className="container mt-5">
                <div className="row">
                    {coursFinderData.map((course) => (
                        <div className={`col-md-4 mb-4${selectedCoursId === course.id ? ' selected' : ''}`} key={course.id} onClick={() => setSelectedCoursId(course.id)}>
                            <div className="card">
                                {renderCoursePhoto(course.photo)}
                                <div className="card-body">
                                    <h5 className="card-title">{course.titre}</h5>
                                    <p className="card-text">{course.description}</p>
                                    <p className="card-text">Prix: {course.prix} Dt</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );

        if (selectedCategoryId) {
            return additionalContent;
        } else {
            return (
                <>
                    <div className="row sectionformation1">
                        <div className="">
                            <h1 className="titreformation1 mt-5">Nos programmes <br /> Par niveau </h1>
                        </div>
                        <div className="d-flex justify-content-center mt-3 mb-5">
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
                    <div className="row mt-5">
                        <div className="d-flex justify-content-around">
                            <div className="circleformation1 p-5">
                                <p className="textcircleformation">08 Formateurs </p>
                            </div>
                            <div className="circleformation1 p-5">
                                <p className="textcircleformation">120 Diplômes </p>
                            </div>
                            <div className="circleformation1 p-5">
                                <p className="textcircleformation">29 Emplois actuels</p>
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
                    <h3 className="titre3">Accueil</h3>
                    <img src={doublearrows} className="doublearrows" alt="doublearrows" />
                    <h3 className="titre3">Formations</h3>
                </div>
            </div>

            {/* Bootstrap Navbar */}
            <nav className="navbar navbar-formation navbar-expand-md">
                <div className="container-fluid">
                    <div className="collapse d-flex justify-content-evenly navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            {loading ? (
                                <li className="nav-item">
                                    <a className="nav-link">Loading...</a>
                                </li>
                            ) : (
                                categories.map((categorie) => (
                                    <li className={`nav-item ${selectedCategoryId === categorie.id ? 'active' : ''}`} key={categorie.id}>
                                        <a className="nav-link" onClick={() => handleCategoryClick(categorie.id)}>{categorie.nom}</a>
                                    </li>
                                ))
                            )}
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
