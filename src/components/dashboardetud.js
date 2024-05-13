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
  const [selectedCategoryId, setSelectedCategoryId] = useState(null); // State for selected category ID
  const [courses, setCourses] = useState([]); // State for courses


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

  useEffect(() => {
    async function fetchCoursesByCategory() {
      if (selectedCategoryId !== null) {
        try {
          const response = await axios.get(`http://localhost:3001/api/courses/byCategory/${selectedCategoryId}`);
          setCourses(response.data);
        } catch (error) {
          console.error('Error fetching courses by category:', error);
        }
      }
    }

    fetchCoursesByCategory();
  }, [selectedCategoryId]); // Trigger the effect when selectedCategoryId changes

  const handleCategoryClick = (categoryId) => {
    setSelectedCategoryId(categoryId); // Set selected category ID when a menucategorie item is clicked
  };

  if (loading) {
    return <p className='loading'>Loading...</p>; // Optional: Show loading indicator
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
              <p>Nom: {user.nom}</p>
              <p>Prénom: {user.prenom}</p>
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
                <a
                  href="#"
                  key={categorie.id}
                  className={`list-group-item list-group-item-action${selectedCategoryId === categorie.id ? ' active' : ''}`} // Apply active class based on selected category
                  onClick={() => handleCategoryClick(categorie.id)} // Set selected category ID on click
                >
                  {categorie.nom}
                </a>
              ))}
            </div>
          </div>
          <div className="col-md-9 col-sm-12 d-flex flex-wrap">
            {/* Filter cards based on selected category ID */}
            {Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className={`card col-lg-4 col-md-6 col-sm-12 border-0 mb-3${selectedCategoryId === null || categories.find((cat) => cat.id === selectedCategoryId) ? '' : ' d-none'}`}>
                <img className="card-img-top" src="" alt="Card Image" />
                <div className="card-body">
                  <h5 className="card-title">Théorie de la Couleur et de la Composition Avec Mr Ahmed Zribi</h5>
                </div>
                <div className="d-flex justify-content-around">
                  <button className="btn">Acheter</button>
                  <button className="btn">Voir Plus</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserComponent;
