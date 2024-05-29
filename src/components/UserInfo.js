import React, { useState, useEffect } from 'react';
import axios from 'axios';
import homeicon from '../assets/homeicon.png';
import notificon from '../assets/notificon.png';
import settingsicon from '../assets/settingsicon.png';
import modifyicon from '../assets/modifyicon.png';
import './dashboardetud.css';

const UserInfo = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    numtel: '',
    email: '',
    photo: null,
    photoUrl: '', // Initialize photoUrl as an empty string
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`http://localhost:3001/api/users/getInfo?userId=${userId}`);
        const userData = response.data.user;
        setUser(userData);

        // Set photoUrl based on whether user.photo is present
        setFormData((prevData) => ({
          ...prevData,
          nom: userData.nom,
          prenom: userData.prenom,
          numtel: userData.numtel,
          email: userData.email,
          photoUrl: userData.photo ? `${userData.photo}` : ''
        }));

        setLoading(false);
      } catch (error) {
        console.error('Error fetching user info:', error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      photo: file,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem('userId');
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] && key !== 'photoUrl') {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      await axios.put(`http://localhost:3001/api/users/updateUser/${userId}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const updatedResponse = await axios.get(`http://localhost:3001/api/users/getInfo?userId=${userId}`);
      const updatedUserData = updatedResponse.data.user;
      setUser(updatedUserData);

      // Update photoUrl based on whether updatedUserData.photo is present
      setFormData((prevData) => ({
        ...prevData,
        nom: updatedUserData.nom,
        prenom: updatedUserData.prenom,
        numtel: updatedUserData.numtel,
        email: updatedUserData.email,
        photoUrl: updatedUserData.photo ,
      }));
      setEditing(false);
    } catch (error) {
      console.error('Error updating user info:', error);
    }
  };

  // Render user photo
  const renderUserPhoto = (photoUrl) => {
    console.log('Rendering Photo URL:', photoUrl); // Log photoUrl before rendering
    return photoUrl ? (
      <img
        src={photoUrl}
        className='userphoto img-fluid'
        alt="User Photo"
      />
    ) : (
      <div className='userphoto-placeholder ms-5'>No Photo</div>
    );
  };

  return (
    <div className="container dashboardinfo p-3">
      <div className="row ">
        <p className="text-md-center text-start  mt-4">Mon Profil</p>
       
      </div>
      <div className="icons col-md-2  d-flex flex-column position-fixed  top-0 me-2 end-0">
          <img style={{ width: '1.4vw' }} src={homeicon} className="img-fluid icon mt-5" alt="Home Icon" />
          <img
            style={{ width: '1.4vw', cursor: 'pointer' }}
            src={modifyicon}
            className="img-fluid icon mt-5"
            alt="Modify Icon"
            onClick={() => setEditing(true)}
          />
          <img style={{ width: '1.4vw' }} src={notificon} className="img-fluid icon mt-5" alt="Notification Icon" />
          
        </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        user && (
          <div className="row mt-5 text-start d-flex justify-content-start gap-1 align-items-center ">
            <div className='col-md-2 ms-3'>
              {renderUserPhoto(formData.photoUrl)}
            </div>
            <div className="col-md-4 mt-1 ">
              <p className='infoss'>Nom: {user.nom}</p>
              <p className='infoss'>Prénom: {user.prenom}</p>
            </div>
            <div className='col-md-4 '>
              <p className='infoss'>Email: {user.email}</p>
              <p className='infoss'>Numéro: {user.numtel}</p>
            </div>
           
            
          </div>
          
        )
      )}
     

      {editing && (
        <form className="mt-3" onSubmit={handleFormSubmit}>
          <div className="mb-3">
            <label htmlFor="nom" className="form-label">Nom</label>
            <input
              type="text"
              className="form-control"
              id="nom"
              name="nom"
              value={formData.nom}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="prenom" className="form-label">Prénom</label>
            <input
              type="text"
              className="form-control"
              id="prenom"
              name="prenom"
              value={formData.prenom}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="numtel" className="form-label">Numéro</label>
            <input
              type="text"
              className="form-control"
              id="numtel"
              name="numtel"
              value={formData.numtel}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="m" >
            <label htmlFor="photo" className="form-label">Photo</label>
            <input
              type="file"
              className="form-control"
              id="photo"
              name="photo"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      )}
    </div>
  );
};

export default UserInfo;

