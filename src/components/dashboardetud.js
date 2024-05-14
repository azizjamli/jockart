import React, { useState, useEffect } from 'react';
import axios from 'axios';
import homeicon from '../assets/homeicon.png';
import notificon from '../assets/notificon.png';
import settingsicon from '../assets/settingsicon.png';
import modifyicon from '../assets/modifyicon.png';
import './dashboardetud.css';

const UserComponent = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [courses, setCourses] = useState([]);
  const [user, setUser] = useState(null); // State for user data

  useEffect(() => {
    async function fetchData() {
      try {
        const userId = localStorage.getItem('userId');
        const userResponse = await axios.get('http://localhost:3001/api/users/getInfo', {
          params: { userId },
        });
        setUser(userResponse.data);
        console.log(userResponse.data); 
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user info:', error);
        setLoading(false);
      }
    }
  
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

    fetchData();
    fetchCategories();
  }, [selectedCategoryId]);

  const handleCategoryClick = async (categoryId) => {
    try {
      const userId = localStorage.getItem('userId');
      const selectedCategoryId = categoryId; // Assuming categoryId is obtained from somewhere in your frontend
  
      const response = await axios.get(`http://localhost:3001/api/usercours/coursfinder`, {
        params: { userId, selectedCategoryId },
      });
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching user courses by category:', error);
    }
  };
  
  if (loading) {
    return <p>Loading...</p>;
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

        {user && (
          <div className="row mt-5">
            <div className="col-md-2">
              <p>{user.photo}</p>
            </div>
            <div className="col-md-5">
              <p>Nom: {user.nom}</p>
              <p>Prénom: {user.prenom}</p>
            </div>
            <div className="col-md-5">
              <p>email: {user.email}</p>
              <p>num: {user.numtel}</p>
            </div>
          </div>
        )}

      </div>

      <div className="container">
        <div className="dashboard row">
          <div className="menucategorie border-0 col-md-3">
            <div className="list-group">
              {categories.map((categorie) => (
                <a
                  href="javascript:void(0)"
                  key={categorie.id}
                  className={`list-group-item list-group-item-action${selectedCategoryId === categorie.id ? ' active' : ''}`}
                  onClick={() => handleCategoryClick(categorie.id)}
                >
                  {categorie.nom}
                </a>
              ))}
            </div>
          </div>
          <div className="col-md-8 col-sm-12">
            {courses.map((course) => (
              <div key={course.id}>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserComponent;
