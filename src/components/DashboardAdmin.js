import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AddCategory from './addcategory';

const Dashboardadmin = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [coursFinderData, setCoursFinderData] = useState([]);
  const [selectedCoursId, setSelectedCoursId] = useState(null);
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
    setSelectedCategoryId(categoryId);
    setSelectedCoursId(null);
    try {
      const response = await axios.get(`http://localhost:3001/api/cours/getCoursByCategorieId/${categoryId}`);
      setCoursFinderData(response.data);
    } catch (error) {
      console.error('Error fetching courses by category:', error);
    }
  };

  const handleAddCoursClick = () => {
    navigate(`/addcours/${selectedCategoryId}`);
  };

  const handleDeleteCategoryClick = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/categories/deleteCategory/${selectedCategoryId}`);
      const response = await axios.get('http://localhost:3001/api/categories/getAllCategories');
      setCategories(response.data);
      setSelectedCategoryId(null);
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleDeleteCoursClick = async () => {
    if (!selectedCoursId) {
      console.error('No course selected.');
      return;
    }
    try {
      await axios.delete(`http://localhost:3001/api/cours/deleteCours/${selectedCoursId}`);
      const response = await axios.get(`http://localhost:3001/api/cours/getCoursByCategorieId/${selectedCategoryId}`);
      setCoursFinderData(response.data);
      setSelectedCoursId(null);
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const handleInspectCourseClick = () => {
    if (!selectedCoursId) {
      console.error('No course selected.');
      return;
    }
    navigate(`/admincours/${selectedCoursId}`);
  };

  // Render course photo
  const renderCoursePhoto = (photo) => {
    return photo ? (
      <img src={photo} alt="Course" className="card-img-top" />
    ) : (
      <div>No Photo</div>
    );
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
                onClick={() => navigate('/addcategory')}
              >
                Ajouter une catégorie
              </button>
              <button 
                className='btn p-2' 
                style={{ backgroundColor: 'red', color: 'white', fontSize: '0.7vw', margin: '0.5vw 0' }}
                onClick={handleDeleteCategoryClick}
              >
                Supprimer une catégorie
              </button>
            </div>
          </div>
          <div className="col-md-9">
            <h2>Les cours pour la catégorie: {selectedCategoryId}</h2>
            <h3>{selectedCoursId}</h3>
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
        </div>
      </div>
      <div className='d-flex flex-wrap align- justify-content-center  gap-3'>
              <button className='btn ' onClick={handleAddCoursClick}>Ajouter un cours</button>
              <button className='btn ' onClick={handleDeleteCoursClick}>Supprimer ce cours</button>
              <button className='btn ' onClick={handleInspectCourseClick}>Inspecter ce cours</button>
              <button className='btn ' onClick={() => navigate('/admincreateprofile')}>Creer un compte</button>
              <button className='btn ' >gerer les etudiants</button>
              <button className='btn ' >gerer les formateurs</button>
            </div>  
    </>
  );
};

export default Dashboardadmin;
