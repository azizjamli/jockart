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
  const [showAddChapitreForm, setShowAddChapitreForm] = useState(false);
  const [showAddSeanceForm, setShowAddSeanceForm] = useState(false);
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
      setShowAddChapitreForm(false); // Hide the form after adding a chapitre
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
      setShowAddSeanceForm(false); // Hide the form after adding a seance
    } catch (error) {
      console.error('Error creating SeanceEnLigne:', error);
    }
  };

  const handleSeanceInputChange = (e) => {
    const { name, value } = e.target;
    setNewSeance({ ...newSeance, [name]: value });
  };

  const handleDeleteSeance = async (seanceId) => {
    try {
      await axios.delete(`http://localhost:3001/api/seanceenligne/deleteSeanceEnLigne/${seanceId}`);
      setSeanceEnLigne(seanceEnLigne.filter(seance => seance.id !== seanceId));
    } catch (error) {
      console.error('Error deleting SeanceEnLigne:', error);
    }
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
      <UserInfo user={user} />
      <div className='container mt-5'>
        <h2>Chapitres</h2>
        <div className='row d-flex p-3 justify-content-around gap-1'>
          {chapitres.map(chapitre => (
            <div key={chapitre.chapitre_id} className='card col-md-3 mb-2 col-sm-3'>
              <div className='card-body'>
                <h2 className='card-title'>{chapitre.chapitre_name}</h2>
                <p className='card-text'>{chapitre.description}</p>
                <div className='d-flex justify-content-center gap-1'>
                  <button className='btn' onClick={() => handleCardClick(chapitre.chapitre_id)}>Inspecter</button>
                  <button className='btn bg-danger' onClick={() => handleDeleteChapitre(chapitre.chapitre_id)}>Supprimer</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='container mt-5'>
        <button className='btn btn-primary' onClick={() => setShowAddChapitreForm(!showAddChapitreForm)}>
          {showAddChapitreForm ? 'Annuler' : 'Ajouter un chapitre'}
        </button>
        {showAddChapitreForm && (
          <div className='col-md-12 mt-3'>
            <input
              type='text'
              name='title'
              value={newChapitre.title}
              onChange={handleInputChange}
              placeholder='Title'
              className='form-control mb-2'
            />
            <input
              type='text'
              name='content'
              value={newChapitre.content}
              onChange={handleInputChange}
              placeholder='Content'
              className='form-control mb-2'
            />
            <button className='btn btn-success' onClick={handleAddChapitre}>Enregistrer</button>
          </div>
        )}
      </div>

      <div className='container seance-en-ligne mt-5'>
        <h2>les cours en lignes</h2>
        {seanceEnLigne.map(seance => (
          <div key={seance.id} className='card mb-3'>
            <div className='card-body'>
              <h5 className='card-title'>Session Title: {seance.title}</h5>
              <p className='card-text'>Date: {formatSeanceDate(seance.date)}</p>
              <h5 className='card-title'>Heure : {seance.heure}</h5>
              <a className='card-text' href={seance.link} target='_blank' rel='noopener noreferrer'>
                Link: {seance.link}
              </a>
            </div>
            <button className='btn bg-danger align-self-center mb-2' onClick={() => handleDeleteSeance(seance.id)}>Supprimer</button>

          </div>
        ))}
      </div>

      <div className='container seance-en-ligne-ajout mt-5'>
        <button className='btn btn-primary' onClick={() => setShowAddSeanceForm(!showAddSeanceForm)}>
          {showAddSeanceForm ? 'Annuler' : 'Ajouter une séance'}
        </button>
        {showAddSeanceForm && (
          <form onSubmit={handleAddSeance} className='mt-3'>
            <input
              type='text'
              name='title'
              value={newSeance.title}
              onChange={handleSeanceInputChange}
              placeholder='Title'
              className='form-control mb-2'
            />
            <input
              type='date'
              name='date'
              value={newSeance.date}
              onChange={handleSeanceInputChange}
              placeholder='Date'
              className='form-control mb-2'
            />
            <input
              type='text'
              name='heure'
              value={newSeance.heure}
              onChange={handleSeanceInputChange}
              placeholder='Heure'
              className='form-control mb-2'
            />
            <input
              type='text'
              name='link'
              value={newSeance.link}
              onChange={handleSeanceInputChange}
              placeholder='Link'
              className='form-control mb-2'
            />
            <button type='submit' className='btn '>Ajouter une séance</button>
          </form>
        )}
      </div>
    </>
  );
};

export default Accedercoursformateur;
