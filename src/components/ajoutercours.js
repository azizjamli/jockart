import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

const Ajoutercours = () => {
    const { id } = useParams(); // Get the course ID from the URL params
    const userId = localStorage.getItem('userId'); // Get the userId from localStorage
    const navigate = useNavigate(); // Use useHistory hook to access history object


    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/usercours/addCourseToUser', { courseId: id, userId });
            console.log(response.data); // Handle the response as needed
            navigate('/Dashboardetud');

        } catch (error) {
            console.error('Error adding course to user:', error);
        }
    };

    return (
        <>
            <h2>ajouter cours</h2>
            <p>Course ID: {id}</p>
            <p>User ID: {userId}</p>
            <form onSubmit={handleFormSubmit}>
                <button className="btn" type="submit">Submit</button>
            </form>
        </>
    );
};

export default Ajoutercours;
