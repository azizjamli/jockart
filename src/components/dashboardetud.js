import React, { useState, useEffect } from 'react';
import axios from 'axios';
import homeicon from '../assets/homeicon.png';
import notificon from '../assets/notificon.png';
import settingsicon from '../assets/settingsicon.png';
import modifyicon from '../assets/modifyicon.png';
import './dashboardetud.css';

const UserComponent = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);


  useEffect(() => {

    
    async function fetchUserProfile() {
      try {
        const response = await axios.get('http://localhost:3001/api/users/profile', {
          credentials: 'include', // Include credentials (cookies) in the request
          // Include other headers if needed for authentication
        });
        setUser(response.data); // Assuming response.data contains user profile data
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setLoading(false);
      }
    }
    async function fetchCategories() {
      try {
        const response = await axios.get('http://localhost:3001/api/categories/getAllCategories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }

    fetchUserProfile();
    fetchCategories();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Optional: Show loading indicator
  }

  return (
    <>
      <div className="container dashboardinfo p-3">
        <div className="row">
          <div className="col-md-3 text-start ms-5 mt-4">
            <p>profil etudiant</p>
          </div>
          <div className="icons col-md-6 d-flex justify-content-end align-items-start gap-3">
            <img style={{ width: '1.4vw' }} src={homeicon} className="img-fluid mt-5" alt="Home Icon" />
            <img style={{ width: '1.4vw' }} src={notificon} className="img-fluid mt-5" alt="Notification Icon" />
            <img style={{ width: '1.4vw' }} src={settingsicon} className="img-fluid mt-5" alt="Settings Icon" />
            <img style={{ width: '1.4vw' }} src={modifyicon} className="img-fluid mt-5" alt="Modify Icon" />
          </div>
        </div>

        {/* Check if user is not null before accessing properties */}
        {user && (
          <div className="row mt-5">
            <div className="col-md-2">
              <p>etudiant img</p>
            </div>
            <div className="col-md-5">
              <p>Nom:  {user.nom}</p>
              <p>Prénom:  {user.prenom}</p>
            </div>
            <div className="col-md-5">
              <p></p>
              <p></p>
            </div>
          </div>
        )}
      </div>

      <div className="container">
        <div className="dashboard row">
          <div className="menucategorie border-0 col-md-3">
            <div className="list-group">
              {/* Map through categories and render category names */}
              {categories.map((categorie) => (
                <a href="#" key={categorie.id} className="list-group-item list-group-item-action">
                  {categorie.nom}
                </a>
              ))}
            </div>
          </div>
          <div className=" col-md-8 col-sm-12">
            <p>qshdijhqs</p>
            <p>qshdijhqs</p>
            <p>qshdijhqs</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserComponent;
