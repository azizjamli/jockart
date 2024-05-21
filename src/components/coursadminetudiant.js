import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; // Assuming you use axios for API requests

const Coursadminetudiant = () => {
  const { id } = useParams();
  const courseId = id; // Extract courseId from URL
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [selectedOption, setSelectedOption] = useState("inspecter"); // State for selected option

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedOption === "ajouter") {
          const response = await axios.get(`http://localhost:3001/api/usercours/getCoursnotUsers/${courseId}`);
          setUsers(response.data); // Set users state with API response for not users
        } else {
          const response = await axios.get(`http://localhost:3001/api/usercours/getCoursUsers/${courseId}`);
          setUsers(response.data); // Set users state with API response
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData(); // Call the fetchData function when component mounts or selected option changes
  }, [courseId, selectedOption]); // Include courseId and selectedOption in the dependency array

  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    user.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.prenom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div>
        <div className="d-flex justify-content-between align-items-center">
          <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
            <option value="inspecter">Inspecter les étudiants pour ce cours</option>
            <option value="ajouter">Ajouter un étudiant à ce cours</option>
          </select>
          {/* Search input */}
          <input
            type="text"
            className="col-md-4"
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <ul>
          {filteredUsers.map((user) => (
            <li className="d-flex justify-content-around bg-success p-3 mt-2 mb-2" key={user.id}>
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
            </li>
          ))}
        </ul>
      </div>
      <div className="container">
        {selectedOption === "ajouter" && (
          <button className="btn">Ajouter un étudiant</button>
        )}
      </div>
    </>
  );
};

export default Coursadminetudiant;
