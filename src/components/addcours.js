import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const AddCours = () => {
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [prix, setPrix] = useState("");
  const { categoryId } = useParams(); // Use "categoryId" instead of "categorieId"
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3001/api/cours/createCours/${categoryId}`, {
        titre,
        description,
        prix: parseFloat(prix),
      });
      console.log("Cours ajouté avec succès:", response.data);
      navigate("/dashboardadmin");
    } catch (error) {
      console.error("Erreur lors de l'ajout du cours:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Ajouter un Cours</h2>
      <form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
        <input 
          type="text" 
          className="form-control" 
          placeholder="Titre du cours" 
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
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
        <input 
          type="number" 
          className="form-control" 
          placeholder="Prix" 
          value={prix}
          onChange={(e) => setPrix(e.target.value)}
          required 
        />
        <button 
          className="btn align-self-end" 
          type="submit"
        >
          Ajouter ce cours
        </button>
      </form>
    </div>
  );
};

export default AddCours;
