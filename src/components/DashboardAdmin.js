import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import AddCategory from './addcategory'; // Import the AddCategory component

const Dashboardadmin = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [coursFinderData, setCoursFinderData] = useState([]);
  const [coursFinderNouserData, setCoursFinderNouserData] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get('http://localhost:3001/api/categories/getAllCategories');
        setCategories(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setLoading(false); // Ensure loading state is updated in case of error
      }
    }

    fetchCategories();
  }, []); // Empty dependency array to run only once

  const handleCategoryClick = async (categoryId) => {
    setSelectedCategoryId(categoryId); // Update selected category
    try {
      const coursFinderResponse = await axios.get('http://localhost:3001/api/usercours/coursfinder', {
        params: { selectedCategoryId: categoryId },
      });
      setCoursFinderData(coursFinderResponse.data);
    } catch (error) {
      console.error('Error fetching user courses by category:', error);
    }
  };

  return (
    <>
      <p>Dashboard Admin</p>
      <div className="container">
        <div className="dashboard row">
          <div className="menucategorie border-0 col-md-3">
            <div className="list-group">
              {loading ? (
                <p>Loading categories...</p>
              ) : (
                categories.map((categorie) => (
                  <a
                    href="#"
                    key={categorie.id}
                    className={`list-group-item list-group-item-action${selectedCategoryId === categorie.id ? ' active' : ''}`}
                    onClick={() => handleCategoryClick(categorie.id)}
                  >
                    {categorie.nom}
                  </a>
                ))
              )}
            </div>
            <div className='d-flex justify-content-around'>
              <button 
                className='btn p-2' 
                style={{ backgroundColor: 'green', color: 'white', fontSize: '0.7vw', margin: '0.5vw 0' }}
                onClick={() => navigate('/addcategory')} // Navigate to AddCategory component
              >
                Ajouter une catégorie
              </button>
              <button 
                className='btn p-2' 
                style={{ backgroundColor: 'red', color: 'white', fontSize: '0.7vw', margin: '0.5vw 0' }}
                onClick={() => { /* Logic to delete a category */ }}
              >
                Supprimer une catégorie
              </button>
            </div>
          </div>
          <div className="col-md-9">
            <h2>Les cours pour la catégorie: {selectedCategoryId}</h2>
            <div className="row">
              {coursFinderData.map((course) => (
                <div className="col-md-4 mb-4" key={course.id}>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{course.title}</h5>
                      <p className="card-text">{course.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Add additional content here */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboardadmin;
