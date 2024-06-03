import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Coursadminformateur = () => {
  const { id } = useParams();
  const courseId = id;
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState("inspecter");

  const fetchData = async () => {
    try {
      if (selectedOption === "ajouter") {
        const response = await axios.get(`http://localhost:3001/api/usercours/getCoursnotUsersformateur/${courseId}`);
        setUsers(response.data);
      } else {
        const response = await axios.get(`http://localhost:3001/api/usercours/getCoursUsersFormateur/${courseId}`);
        setUsers(response.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [courseId, selectedOption]);

  const handleAddStudent = async (userId) => {
    try {
      await axios.post(`http://localhost:3001/api/usercours/createRowInUserCours`, {
        userId,
        courseId,
      });
      fetchData();
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  const handleRemoveStudent = async (userId) => {
    try {
      await axios.delete(`http://localhost:3001/api/usercours/deleteRowFromUserCours`, {
        data: { userId, courseId },
      });
      fetchData();
    } catch (error) {
      console.error("Error removing student:", error);
    }
  };

  const filteredUsers = users.filter(user =>
    user.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.prenom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="container">
        <div className=" row d-flex justify-content-between align-items-center gap-3">
          <select value={selectedOption} className="col-md-4 ggg ms-4" onChange={(e) => setSelectedOption(e.target.value)}>
            <option value="inspecter">Inspecter les formateurs pour ce cours</option>
            <option value="ajouter">Ajouter un formateur à ce cours</option>
          </select>
          {/* Search input */}
          <input
            type="text"
            className="col-md-4 searchd"
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <ul className="row ">
          {filteredUsers.map((user) => (
            <li className="d-flex justify-content-around align-items-center flex-wrap userr p-2 mt-5 mb-2" key={user.id}>
              <div>
                <strong>Email:</strong> {user.email}
              </div>
              <div>
                <strong>Nom:</strong> {user.nom}
              </div>
              <div>
                <strong>Prénom:</strong> {user.prenom}
              </div>
              <div>
                <strong>Numéro de téléphone:</strong> {user.numtel}
              </div>
              {selectedOption === "ajouter" && (
                <button className="btn" onClick={() => handleAddStudent(user.id)}>Ajouter</button>
              )}
              {selectedOption === "inspecter" && (
                <button className="btn" onClick={() => handleRemoveStudent(user.id)}>Retirer de ce cours</button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Coursadminformateur;
