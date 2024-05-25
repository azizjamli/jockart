import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserInfo from './UserInfo';
import { useParams, useNavigate } from 'react-router-dom';

const Accedercoursformateur = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const coursId = id;
  const [chapitres, setChapitres] = useState([]);
  const [seanceEnLigne, setSeanceEnLigne] = useState([]);
  const [newChapitre, setNewChapitre] = useState({ title: '', content: '' });
  const [newSeance, setNewSeance] = useState({ title: '', date: '', heure: '', link: '' });
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
    navigate(`/chapitreformateur/${chapitre_id}`);
  };

  const handleDeleteChapitre = async (chapitreId) => {
    try {
      await axios.delete(`http://localhost:3001/api/chapitre/deleteChapitre/${chapitreId}`);
      setChapitres(chapitres.filter(chapitre => chapitre.chapitre_id !== chapitreId));
    } catch (error) {
      console.error('Error deleting chapitre:', error);
    }
  };

  const handleAddChapitre = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/chapitre/createChapitre', {
        coursId,
        title: newChapitre.title,
        content: newChapitre.content,
      });
      setChapitres([...chapitres, response.data]);
      setNewChapitre({ title: '', content: '' });
    } catch (error) {
      console.error('Error creating chapitre:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewChapitre({ ...newChapitre, [name]: value });
  };

  const handleAddSeance = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/seanceenligne/createSeanceEnLigne', {
        coursId,
        ...newSeance,
      });
      setSeanceEnLigne([...seanceEnLigne, response.data]);
      setNewSeance({ title: '', date: '', heure: '', link: '' });
    } catch (error) {
      console.error('Error creating SeanceEnLigne:', error);
    }
  };

  const handleSeanceInputChange = (e) => {
    const { name, value } = e.target;
    setNewSeance({ ...newSeance, [name]: value });
  };

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
        <div className='row d-flex justify-content-between align-items-baseline'>
          <h2 className=''>cours</h2>
        </div>
        <div className='col-md-12'>
          <input
            type='text'
            name='title'
            value={newChapitre.title}
            onChange={handleInputChange}
            placeholder='Title'
          />
          <input
            type='text'
            name='content'
            value={newChapitre.content}
            onChange={handleInputChange}
            placeholder='Content'
          />
          <button className='btn' onClick={handleAddChapitre}>ajouter un chapitre</button>
        </div>
      </div>

      <div className='container mt-5'>
        <h2>Ajouter une Séance En Ligne</h2>
        <form onSubmit={handleAddSeance}>
          <input
            type='text'
            name='title'
            value={newSeance.title}
            onChange={handleSeanceInputChange}
            placeholder='Title'
          />
          <input
            type='date'
            name='date'
            value={newSeance.date}
            onChange={handleSeanceInputChange}
            placeholder='Date'
          />
          <input
            type='text'
            name='heure'
            value={newSeance.heure}
            onChange={handleSeanceInputChange}
            placeholder='Heure'
          />
          <input
            type='text'
            name='link'
            value={newSeance.link}
            onChange={handleSeanceInputChange}
            placeholder='Link'
          />
          <button type='submit' className='btn'>Ajouter une séance</button>
        </form>
      </div>

      <div className='container mt-5'>
        <h2>SeanceEnLigne</h2>
        {seanceEnLigne.map(seance => (
          <div key={seance.id} className='card mb-3'>
            <div className='card-body'>
              <h5 className='card-title'>Session Title: {seance.title}</h5>
              <p className='card-text' >Date: {formatSeanceDate(seance.date)}</p>
              <h5 className='card-title'>heure : {seance.heure}</h5>
              <a className='card-text' href={seance.link} target='_blank' rel='noopener noreferrer'>
                Link: {seance.link}
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className='container mt-5'>
        <h2>Chapitres</h2>
        <div className='row d-flex p-3 justify-content-around'>
          {chapitres.map(chapitre => (
            <div key={chapitre.chapitre_id} className='card col-sm-3'>
              <div className='card-body'>
                <h2 className='card-title'>{chapitre.chapitre_name}</h2>
                <p className='card-text'>{chapitre.description}</p>
                <button className='btn bg-danger' onClick={() => handleDeleteChapitre(chapitre.chapitre_id)}>supprimer ce chapitre</button>
                <button className='btn' onClick={() => handleCardClick(chapitre.chapitre_id)}>inspecter</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Accedercoursformateur;
