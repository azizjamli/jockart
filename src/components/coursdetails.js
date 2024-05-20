import React, { useState } from "react";
import { useParams } from "react-router-dom";

const DefaultContent = () => {
  return (
    <>
      <div className="container">
        <h2>Default Content</h2>
      </div>
    </>
  );
};

const ModifyingPart = () => {
  const { id } = useParams(); // Extract ID from URL
  const [titre, setTitre] = useState(""); // State for titre
  const [description, setDescription] = useState(""); // State for description
  const [prix, setPrix] = useState(""); // State for prix
  const [photo, setPhoto] = useState(""); // State for photo

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting with ID:", id); // Log the ID for debugging
    const formData = { titre, description, prix, photo };
    try {
      const response = await fetch(`http://localhost:3001/api/cours/updateCours/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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
            type="url"
            placeholder="Photo URL"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
          />
        </div>
        <button type="submit">Enregistrer les modifications</button>
      </form>
    </div>
  );
};

const Coursdetails = () => {
  const [isModifying, setIsModifying] = useState(false);

  const handleModifierClick = () => {
    setIsModifying(true);
  };

  return (
    <>
      {!isModifying && (
        <>
          <DefaultContent />
          <button className="btn" onClick={handleModifierClick}>
            Modifier ce cours
          </button>
        </>
      )}
      {isModifying && <ModifyingPart />}
    </>
  );
};

export default Coursdetails;
