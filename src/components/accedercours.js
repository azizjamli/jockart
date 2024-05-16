import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserInfo from './UserInfo';
import { useParams } from 'react-router-dom';

const Accedercours = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const { id } = useParams(); // Extract the course ID from the URL
  const [chapitres, setChapitres] = useState([]);

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
        const chapitreResponse = await axios.get(`http://localhost:3001/api/chapitre/getChapitresByCoursId`, {
          params: { coursId: id },
        });
        setChapitres(chapitreResponse.data);
      } catch (error) {
        console.error('Error fetching chapitres:', error);
      }
    }

    fetchData();
    fetchChapitres();
  }, [id]); // Include id in the dependency array to refetch when id changes

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>cours id: {id}</h1>
      <UserInfo user={user} />

      <div className='container bg-success'>
        <h2>cours</h2>
        <div className='col-md-12'>
          {chapitres.map(chapitre => (
            <div key={chapitre.id} className='card col-sm-4'>
              <div className='card-body'>
                <h2 className='card-title'>{chapitre.titre}</h2>
                <p className='card-text'>{chapitre.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Accedercours;
