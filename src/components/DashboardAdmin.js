import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AddCategory from './addcategory';

const Dashboardadmin = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [coursFinderData, setCoursFinderData] = useState([]);
  const navigate = useNavigate();

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
    setSelectedCategoryId(categoryId); // Update selected category
    try {
      const response = await axios.get(`http://localhost:3001/api/cours/getCoursByCategorieId/${categoryId}`);
      setCoursFinderData(response.data);
    } catch (error) {
      console.error('Error fetching courses by category:', error);
    }
  };

  const handleAddCoursClick = () => {
    navigate(`/addcours/${selectedCategoryId}`); // Navigate to AddCours component with selected category ID
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
                    onClick={() => handleCategoryClick(categorie.id)} // Pass category ID to handleCategoryClick
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
                onClick={() => navigate('/addcategory')}
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
            <button className='btn align-self-end' onClick={handleAddCoursClick}>Ajouter un cours</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboardadmin;
