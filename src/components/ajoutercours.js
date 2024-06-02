import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import './ajoutercours.css';
import axios from 'axios';

const Ajoutercours = () => {
    const { id } = useParams(); // Get the course ID from the URL params
    const userId = localStorage.getItem('userId'); // Get the userId from localStorage
    const navigate = useNavigate(); // Use useHistory hook to access history object

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/usercours/addCourseToUser', { courseId: id, userId });
            console.log(response.data); // Handle the response as needed
            navigate('/Dashboardetud');
        } catch (error) {
            console.error('Error adding course to user:', error);
        }
    };
    /*<h2>ajouter cours</h2>
    <p>Course ID: {id}</p>
    <p>User ID: {userId}</p>
    <form >
    </form>*/

    return (
        <>
            

            <div className="container mt-5" onSubmit={handleFormSubmit}>
                <form className="animated-form" >
                    <div className="form-group">
                        <label htmlFor="nomDuCarte">Nom Du Carte</label>
                        <input type="text" className="form-control" id="nomDuCarte" value="Sassi Noura"  />
                    </div>
                    <div className="form-group mt-4">
                        <label htmlFor="numeroDuCarte">Numéro Du Carte</label>
                        <input type="text" className="form-control" id="numeroDuCarte" value="0241 - 2583 - 1349 - 2425"  />
                    </div>
                    <div className="form-row d-flex gap-2">
                        <div className="form-group mt-4 col-md-5">
                            <label htmlFor="dateExpiration">Date d'expiration</label>
                            <input type="text" className="form-control" id="dateExpiration" value="01/05"  />
                        </div>
                        <div className="form-group mt-4 col-md-5">
                            <label htmlFor="cvv">CVV</label>
                            <input type="text" className="form-control" id="cvv" value="001"  />
                        </div>
                    </div>
                    
            <div className="container text-center mt-5">
                <h2>“Jock'Art Formation propose également des packs de paiement avantageux pour les étudiants qui souhaitent s'inscrire à plusieurs formations”</h2>
                <div className="d-flex justify-content-center gap-4 mt-4">
                    <div className="discount-card">
                        <div className="discount-text">-20%</div>
                        <div>2 formations</div>
                    </div>
                    <div className="discount-card ml-4">
                        <div className="discount-text">-30%</div>
                        <div>Plus que 2 formations</div>
                    </div>
                </div>
                <p className="mt-4">
                    N'hésitez pas à nous contacter si vous avez des questions ou si vous préférez effectuer le paiement en espèces au montant de 20 DT directement à notre école, plutôt que de procéder en ligne.
                </p>
            </div>
            <button className="btn" type="submit">Confirmer</button>

                </form>
            </div>

        </>
    );
};

export default Ajoutercours;
