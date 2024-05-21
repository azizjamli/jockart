import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; // Assuming you use axios for API requests

const Coursadminetudiant = () => {
  const { id } = useParams();
  const courseId = id; // Extract courseId from URL
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [selectedOption, setSelectedOption] = useState("inspecter"); // State for selected option

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

  useEffect(() => {
    fetchData(); // Call the fetchData function when component mounts or selected option changes
  }, [courseId, selectedOption]); // Include courseId and selectedOption in the dependency array

  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    user.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.prenom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddStudent = async (userId) => {
    try {
      await axios.post(`http://localhost:3001/api/usercours/createRowInUserCours`, {
        userId,
        courseId,
      });
      // Optionally, you can refetch the users after adding a student
      // This ensures that the updated list is displayed immediately
      fetchData();
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  return (
    <>
      <div className="container">
        <div className=" row d-flex justify-content-between align-items-center gap-3">
          <select value={selectedOption} className="col-md-4 ms-4" onChange={(e) => setSelectedOption(e.target.value)}>
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
        <ul className="row">
          {filteredUsers.map((user) => (
            <li className="d-flex justify-content-around bg-success p-2 mt-2 mb-2" key={user.id}>
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
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Coursadminetudiant;
