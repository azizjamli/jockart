import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; // Assuming you use axios for API requests

const Coursadminetudiant = () => {
  const { id } = useParams();
  const courseId = id; // Extract courseId from URL
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/usercours/getCoursUsers/${courseId}`);
        setUsers(response.data); // Set users state with API response
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers(); // Call the fetchUsers function when component mounts
  }, [courseId]); // Include courseId in the dependency array

  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    user.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.prenom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Users in Course</h2>
      {/* Search input */}
      <input
        type="text"
        placeholder="Search by name or email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredUsers.map((user) => (
          <li key={user.id}>
            <strong>Nom:</strong> {user.nom}<br />
            <strong>Prénom:</strong> {user.prenom}<br />
            <strong>Email:</strong> {user.email}<br />
            <strong>Numéro de téléphone:</strong> {user.numtel}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Coursadminetudiant;
