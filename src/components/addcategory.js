import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/categories/createCategory', {
        nom,
        description,
      });
      console.log('Category created:', response.data);
      // Navigate to the Dashboard or any other page after successful creation
      navigate('/dashboardadmin');
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  return (
    <>
      <div className="container mt-5">
        <h2>Add Category</h2>
        <form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Nom du catégorie" 
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required 
          />
          <input 
            type="text" 
            className="form-control" 
            placeholder="Description" 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required 
          />
          <button 
            className="btn btn-primary align-self-end" 
            type="submit"
          >
            Ajouter cette catégorie
          </button>
        </form>
      </div>
    </>
  );
}

export default AddCategory;
