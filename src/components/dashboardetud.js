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
  const [selectedCategoryId, setSelectedCategoryId] = useState(null); // State for selected category ID
  const [courses, setCourses] = useState([]); // State for courses

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get('http://localhost:3001/api/categories/getAllCategories');
        setCategories(response.data);
        setLoading(false); // Set loading to false once categories are fetched
      } catch (error) {
        console.error('Error fetching categories:', error);
        setLoading(false); // Handle error by setting loading to false
      }
    }

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
    return <p>Loading...</p>; // Show loading indicator while fetching data
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

        <div className="row mt-5">
          <div className="col-md-2">
            <p>etudiant img</p>
          </div>
          <div className="col-md-5">
            <p>Nom: </p>
            <p>Prénom: </p>
          </div>
          <div className="col-md-5">
            {/* Add actual data here */}
            <p>User's Last Name</p>
            <p>User's First Name</p>
          </div>
        </div>
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
          <div className="col-md-8 col-sm-12">
            {/* Render courses here */}
            {courses.map((course) => (
              <div key={course.id}>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                {/* Add more course details as needed */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserComponent;
