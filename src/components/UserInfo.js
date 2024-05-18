import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import homeicon from '../assets/homeicon.png';
import notificon from '../assets/notificon.png';
import settingsicon from '../assets/settingsicon.png';
import modifyicon from '../assets/modifyicon.png';
import './dashboardetud.css';

const UserInfo = () => {
  const [usera, setUsera] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const userId = localStorage.getItem('userId');
        const useraResponse = await axios.get('http://localhost:3001/api/users/getInfo', {
          params: { userId },
        });
        setUsera(useraResponse.data.user); // Access the nested user object
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user info:', error);
        setLoading(false);
      }
    }
    
    fetchData();
  }, []); // Empty dependency array means this effect runs once after the component mounts

  console.log('Usera in UserInfo component:', usera); // Add this console log

  return (
    <div className="container dashboardinfo p-3">
      <div className="row ps-3 pe-5 d-flex align-items-center">
          <p className=" text-start ms-5 mt-4">Profil Étudiant</p>
          <div className="icons  d-flex justify-content-end  gap-3">
            <img style={{ width: '1.4vw' }} src={homeicon} className="img-fluid icon mt-5" alt="Home Icon" />
            <img style={{ width: '1.4vw' }} src={notificon} className="img-fluid icon mt-5" alt="Notification Icon" />
            <img style={{ width: '1.4vw' }} src={settingsicon} className="img-fluid icon mt-5" alt="Settings Icon" />
            <img style={{ width: '1.4vw' }} src={modifyicon} className="img-fluid icon mt-5" alt="Modify Icon" />
          </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        usera && (
          <div className="row mt-5 text-start d-flex align-items-center p-3">
              <div className='col-md-4 '>
              {/* Render the user photo as an image */}
              {usera.photo && (
                <img
                  src={`data:image/png;base64,${usera.photo}`}
                  className='userphoto ms-5   img-fluid'
                  alt="User Photo"
                  //style={{ width: '100%', height: 'auto' }} // Adjust image size
                />
              )}
              </div>
              <div className="col-md-3 ms-5">
                <p>Nom: {usera.nom}</p> {/* Access nom from usera object */}
                <p>Prénom: {usera.prenom}</p> {/* Access prenom from usera object */}
              </div>
              <div className='col-md-3 ms-5' >
                <p>Email: {usera.email}</p> {/* Access email from usera object */}
                <p>Numéro: {usera.numtel}</p> {/* Access numtel from usera object */}
              </div>
          </div>
        )
      )}
    </div>
  );
};

export default UserInfo;
