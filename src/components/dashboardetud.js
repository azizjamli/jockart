import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserInfo from './UserInfo';
import './dashboardetud.css';

const UserComponent = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [coursFinderData, setCoursFinderData] = useState([]);
  const [coursFinderNouserData, setCoursFinderNouserData] = useState([]);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

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
      }
    }

    async function fetchCategories() {
      try {
        const response = await axios.get('http://localhost:3001/api/categories/getAllCategories');
        setCategories(response.data);
        setLoading(false);

      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }

    //fetchData();
    fetchCategories();
  }, []); // Empty dependency array to run only once

  const handleCategoryClick = async (categoryId) => {
    try {
      const userId = localStorage.getItem('userId');

      const coursFinderResponse = await axios.get(`http://localhost:3001/api/usercours/coursfinder`, {
        params: { userId, selectedCategoryId: categoryId },
      });
      setCoursFinderData(coursFinderResponse.data);

      const coursFinderNouserResponse = await axios.get(`http://localhost:3001/api/usercours/coursfindernouser`, {
        params: { userId, selectedCategoryId: categoryId },
      });
      setCoursFinderNouserData(coursFinderNouserResponse.data);
    } catch (error) {
      console.error('Error fetching user courses by category:', error);
    }
  };

  const handleAjouterClick = (id) => {
    navigate(`/Ajoutercours/${id}`);
  };
  const handleAccederClick = (id) => {
    navigate(`/Accedercours/${id}`);
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
                  className={`list-group-item list-group-item-action${selectedCategoryId === categorie.id ? ' active' : ''}`}
                  onClick={() => handleCategoryClick(categorie.id)}
                >
                  {categorie.nom}
                </a>
              ))}
            </div>
          </div>
          <div className="col-md-8 col-sm-12 container p-5">
            <div className="row d-flex justify-content-around">
              {coursFinderData.map((item) => (
                <div className="card coursacheté mb-3 col-lg-3" key={item.Cour.id}>
                  <div className="card-body">
                    <h5 className="card-title ">{item.Cour.titre}</h5>
                    <button className="btn btn-primary" onClick={() => handleAccederClick(item.Cour.id)}>Accéder</button>
                  </div>
                </div>
              ))}
              {coursFinderNouserData.map((item) => (
                <div className="card coursnonacheté mb-3 col-lg-3" key={item.id}>
                  <div className="card-body">
                    <h5 className="card-title">{item.titre}</h5>
                    <p>{item.id}</p>
                    <button className="btn btn-success" onClick={() => handleAjouterClick(item.id)}>Ajouter</button>
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

export default UserComponent;
