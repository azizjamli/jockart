import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

//import './incours.css'; // Assuming you have a CSS file for styling

const Incours = () => {
    const navigate = useNavigate();

    const { courseId } = useParams();
    const [courseData, setCourseData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/cours/getCoursById/${courseId}`);
                setCourseData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching course data:', error);
                setLoading(false);
            }
        };

        fetchCourseData();
    }, [courseId]);

    const renderCoursePhoto = (photo) => {
        if (photo) {
            const photoUrl = `http://localhost:3001/uploads/cours/${photo}`;
            console.log('Course photo URL:', photoUrl); // Debugging: Log the complete photo URL
            return <img src={photoUrl} alt="Course"  className='img-fluid imgtgrp mt-5' />;
        } else {
            return <div>No Photo</div>;
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!courseData) {
        return <div>Course not found</div>;
    }

    return (
        <>
            <h1 className="container ban5 mt-5">
                <span className="aposs">“</span>{courseData.titre}<span className="aposs">”</span>
            </h1>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 text1 section2 p-5">
                        <p>{courseData.description}</p>
                    </div>
                    <div className="col-md-6 d-flex flex-column justify-content-around  align-items-center">
                        {renderCoursePhoto(courseData.photo)}
                        <button className="btn" onClick={() => navigate('/login')}>Acheter</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Incours;
