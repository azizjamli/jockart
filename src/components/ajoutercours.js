import React from "react";
import { useParams } from "react-router-dom";

const Ajoutercours = () => {
    const { id } = useParams(); // Get the course ID from the URL params

    return (
        <>
            <h2>ajouter cours</h2>
            <p>Course ID: {id}</p>
            <form>
                <input></input>
                <button className="btn" type="submit"></button>
            </form>
        </>
    );
};

export default Ajoutercours;
