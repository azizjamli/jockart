import React, { useState, useEffect } from 'react';
import axios from 'axios';
import homeicon from '../assets/homeicon.png';
import notificon from '../assets/notificon.png';
import settingsicon from '../assets/settingsicon.png';
import modifyicon from '../assets/modifyicon.png';
import './dashboardetud.css';

const UserComponent = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/users/profil');
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="container dashboardinfo p-3">
        <div className="row">
          <div className="col-md-3 text-start ms-5 mt-4">
            <p>profil etudiant</p>
          </div>
          <div className="icons col-md-6 d-flex justify-content-end align-items-start gap-3">
            <img style={{ width: '1.4vw' }} src={homeicon} className="img-fluid mt-5" alt="Home Icon" />
            <img style={{ width: '1.4vw' }} src={notificon} className="img-fluid mt-5" alt="Notification Icon" />
            <img style={{ width: '1.4vw' }} src={settingsicon} className="img-fluid mt-5" alt="Settings Icon" />
            <img style={{ width: '1.4vw' }} src={modifyicon} className="img-fluid mt-5" alt="Modify Icon" />
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-md-2">
            <p>etudiant img</p>
          </div>
          <div className="col-md-5">
            <p>Nom: {user.nom}</p>
            <p>Prénom: {user.prenom}</p>
          </div>
          <div className="col-md-5">
            <p>Email: {user.email}</p>
            <p>Numéro de téléphone: {user.numtel}</p>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="dashboard row">
          <div className="menucategorie border-0 col-md-3">
            <div className="list-group">
              <a href="#" className="list-group-item list-group-item-action">design graphique</a>
              <a href="#" className="list-group-item list-group-item-action">photographie</a>
              <a href="#" className="list-group-item list-group-item-action">montage vidéo</a>
              <a href="#" className="list-group-item list-group-item-action">motion design</a>
              <a href="#" className="list-group-item list-group-item-action">infographie</a>
            </div>
          </div>
          <div className=" col-md-8 col-sm-12">
            <p>qshdijhqs</p>
            <p>qshdijhqs</p>
            <p>qshdijhqs</p>
          </div>
        </div>
      </div>
    </>
  );
};

const DashboardEtud = () => {
  return (
    <div>
      <UserComponent />
    </div>
  );
};

export default DashboardEtud;
