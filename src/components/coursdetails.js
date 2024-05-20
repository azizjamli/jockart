import React, { useState } from "react";
import { useParams } from "react-router-dom";

const ModifyingPart = () => {
  const { id } = useParams();
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [prix, setPrix] = useState("");
  const [photo, setPhoto] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting with ID:", id);

    const formData = new FormData();
    formData.append('titre', titre);
    formData.append('description', description);
    formData.append('prix', prix);
    if (photo) {
      formData.append('photo', photo);
    }

    try {
      const response = await fetch(`http://localhost:3001/api/cours/updateCours/${id}`, {
        method: "PUT",
        body: formData,
      });
      const data = await response.json();
      console.log("Update response:", data);
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  return (
    <div className="container modifyingpart">
      <h2>Modifying Part</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Titre"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <input
            type="number"
            placeholder="Prix"
            value={prix}
            onChange={(e) => setPrix(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="file"
            onChange={(e) => setPhoto(e.target.files[0])}
          />
        </div>
        <button type="submit">Enregistrer les modifications</button>
      </form>
    </div>
  );
};

export default ModifyingPart;
