// UserInfo.js
import React from 'react';
import homeicon from '../assets/homeicon.png';
import notificon from '../assets/notificon.png';
import settingsicon from '../assets/settingsicon.png';
import modifyicon from '../assets/modifyicon.png';
import './dashboardetud.css';

const UserInfo = ({ user }) => {
  return (
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

      {user && (
        <div className="row mt-5">
          <div className="col-md-2">
            <p>{user.photo}</p>
          </div>
          <div className="col-md-5">
            <p>Nom: {user.nom}</p>
            <p>Prénom: {user.prenom}</p>
          </div>
          <div className="col-md-5">
            <p>email: {user.email}</p>
            <p>num: {user.numtel}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
