import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './dashboardetud.css'; // Importing the CSS file
import UserInfo from './UserInfo';

const Dashboardformateur = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [coursFinderData, setCoursFinderData] = useState([]);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get('http://localhost:3001/api/categories/getAllCategories');
        setCategories(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }

    fetchCategories();
  }, []); // Empty dependency array to run only once

  const handleCategoryClick = async (categoryId) => {
    try {
      const userId = localStorage.getItem('userId');

      const coursFinderResponse = await axios.get(`http://localhost:3001/api/usercours/coursfinder`, {
        params: { userId, selectedCategoryId: categoryId },
      });
      setCoursFinderData(coursFinderResponse.data);
      setSelectedCategoryId(categoryId); // Update the selected category
    } catch (error) {
      console.error('Error fetching user courses by category:', error);
    }
  };

  const handleAccederClick = (id) => {
    navigate(`/Accedercoursformateur/${id}`);
  };

  const renderCoursePhoto = (photo) => {
    const photoUrl = `http://localhost:3001/uploads/cours/${photo}`;
    console.log('renderCoursePhoto - photo URL:', photoUrl); // Debugging
    return photo ? (
      <img src={photoUrl} alt="Course" className="card-img-top" />
    ) : (
      <div>No Photo</div>
    );
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <UserInfo />

      <div className="container">
        <div className="dashboard row">
          <div className="menucategorie border-0 col-md-3">
            <div className="list-group">
              {categories.map((categorie) => (
                <a
                  href="javascript:void(0)"
                  key={categorie.id}
                  className={`list-group-item text-start ps-5 list-group-item-action${selectedCategoryId === categorie.id ? ' selected-category' : ''}`}
                  onClick={() => handleCategoryClick(categorie.id)}
                >
                  {categorie.nom}
                </a>
              ))}
            </div>
          </div>
          <div className="col-md-8 col-sm-12 container p-5">
            <div className="row d-flex justify-content-around gap-1">
              {coursFinderData.map((item) => (
                <div className="card coursacheté mb-3 col-lg-3" key={item.Cour.id}>
                  {renderCoursePhoto(item.Cour.photo)}
                  <div className="card-body">
                    <h5 className="card-title">{item.Cour.titre}</h5>
                    <button className="btn btn-primary" onClick={() => handleAccederClick(item.Cour.id)}>Accéder</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboardformateur;
