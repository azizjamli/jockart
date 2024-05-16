import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserInfo from './UserInfo';

const Accedercours = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

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

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h2>iqshd</h2>
      <UserInfo user={user} />

      <div className='container bg-success'>
        <h2>cours</h2>


      </div>
    </>
  );
};

export default Accedercours;
