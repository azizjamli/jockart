import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserInfo from './UserInfo';
import { useParams, useNavigate } from 'react-router-dom';
import clock from '../assets/clock.png';
import webinar from '../assets/webinar.png';
import './acd.css';  // Make sure to import the CSS file

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
      <UserInfo user={user} />

      <div className='container'>
        <div className='col-md-12 mt-5'>
          <div className='row d-flex p-3 justify-content-around gap-3'>
            {chapitres.map(chapitre => (
              <div key={chapitre.id} className='card border-0 col-md-3' onClick={() => handleCardClick(chapitre.chapitre_id)}>
                <div className='card-body'>
                  <h2 className='card-title border-1 border p-5'>{chapitre.chapitre_name}</h2>
                  <p className='card-text mt-4'>{chapitre.description}</p>
                </div>
                <hr />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='container mt-5 seance-en-ligne'>
        {seanceEnLigne.map(seance => (
          <div key={seance.id} className='text-start ms-5 mb-3'>
            <div className='card-body'>
              <div className='d-flex align-items-center gap-3'>
                <img src={webinar} alt='Webinar Icon' />
                <h5 className='aat'>Les cours en lignes</h5>
              </div>
              <div className='d-flex align-items-center gap-3 mt-2'>
                <img src={clock} alt='Clock Icon' className='img-fluid' />
                <p className='card-text'> {formatSeanceDate(seance.date)} à {seance.heure} </p>
              </div>
              <h5 className=''>{seance.title} </h5>
              <a className='mt-4' href={seance.link} target='_blank' rel='noopener noreferrer'>
                <span className='text-dark'>Lien meet :</span> {seance.link}
              </a>
              <hr />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Accedercours;
