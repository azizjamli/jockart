import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserInfo from './UserInfo';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import Chapitreetude from './chapitreetud';

const Accedercours = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const { id } = useParams(); // Extract the course ID from the URL
  const coursId = id; // Define coursId using id extracted from useParams()
  const [chapitres, setChapitres] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

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

    async function fetchChapitres() {
      try {
        const chapitreResponse = await axios.get(`http://localhost:3001/api/chapitre/getChapitresByCoursId/${coursId}`, {
          params: { coursId }, // Use coursId as a query parameter
        });
        setChapitres(chapitreResponse.data);
      } catch (error) {
        console.error('Error fetching chapitres:', error);
      }
    }

    fetchData();
    fetchChapitres();
  }, [coursId]); // Include coursId in the dependency array to refetch when coursId changes

  if (loading) {
    return <p>Loading...</p>;
  }

  // Function to handle card click and navigate to ChapitreEtude component
  const handleCardClick = (chapitre_id) => {
    navigate(`/chapitreetud/${chapitre_id}`); // Navigate to ChapitreEtude with chapitreId as URL parameter
  };

  return (
    <>
      <h1>cours id: {id}</h1>
      <UserInfo user={user} />

      <div className='container bg-success'>
        <h2>cours</h2>
        <div className='col-md-12'>
          <div className='row d-flex p-3 justify-content-around'>
            {chapitres.map(chapitre => (
              <div key={chapitre.id} className='card col-sm-3' onClick={() => handleCardClick(chapitre.chapitre_id)}>
                <div className='card-body'>
                  <h2 className='card-title'>{chapitre.chapitre_name}</h2>
                  <p className='card-text'>{chapitre.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Accedercours;
