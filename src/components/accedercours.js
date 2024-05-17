import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserInfo from './UserInfo';
import { useParams, useNavigate } from 'react-router-dom';

const Accedercours = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const coursId = id;
  const [chapitres, setChapitres] = useState([]);
  const [seanceEnLigne, setSeanceEnLigne] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const userId = localStorage.getItem('userId');
        const userResponse = await axios.get('http://localhost:3001/api/users/getInfo', {
          params: { userId },
        });
        setUser(userResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user info:', error);
        setLoading(false);
      }
    }

    async function fetchChapitres() {
      try {
        const chapitreResponse = await axios.get(`http://localhost:3001/api/chapitre/getChapitresByCoursId/${coursId}`);
        setChapitres(chapitreResponse.data);
      } catch (error) {
        console.error('Error fetching chapitres:', error);
      }
    }

    async function fetchSeanceEnLigne() {
      try {
        const seanceEnLigneResponse = await axios.get(`http://localhost:3001/api/seanceenligne/getSeanceEnLigneByCoursId/${coursId}`);
        setSeanceEnLigne(seanceEnLigneResponse.data);
      } catch (error) {
        console.error('Error fetching SeanceEnLigne:', error);
      }
    }

    fetchData();
    fetchChapitres();
    fetchSeanceEnLigne();
  }, [coursId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleCardClick = (chapitre_id) => {
    navigate(`/chapitreetud/${chapitre_id}`);
  };

  // Function to format the date
  const formatSeanceDate = (dateString) => {
    const seanceDate = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    if (seanceDate.toDateString() === today.toDateString()) {
      return "Aujourd'hui";
    } else if (seanceDate.toDateString() === tomorrow.toDateString()) {
      return "Demain";
    } else {
      return dateString;
    }
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

      <div className='container mt-5'>
        <h2>SeanceEnLigne</h2>
        {seanceEnLigne.map(seance => (
          <div key={seance.id} className='card mb-3'>
            <div className='card-body'>
              <h5 className='card-title'>Session Title: {seance.title}</h5>
              <p className='card-text'>Date: {formatSeanceDate(seance.date)}</p>
              <h5 className='card-title'>heure : {seance.heure}</h5>
              <p className='card-text'>Link: {seance.link}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Accedercours;
