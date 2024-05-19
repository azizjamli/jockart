import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCours = () => {
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [prix, setPrix] = useState("");
  const [categorieId, setCategorieId] = useState("1"); // Default category ID

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/api/cours/addCours", {
        nom,
        description,
        prix: parseInt(prix),
        categorieId: parseInt(categorieId),
      });
      console.log("Cours ajouté avec succès:", response.data);
      navigate("/dashboardadmin"); // Navigate to the dashboard after adding the course
    } catch (error) {
      console.error("Erreur lors de l'ajout du cours:", error);
    }
  };

  return (
    <>
      <div className="container mt-5">
        <h2>Ajouter un Cours</h2>
        <form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Titre du cours" 
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
    </>
  );
}

export default AddCours;
