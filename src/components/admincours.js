import React, { useState } from "react";
import Coursdetails from "./coursdetails";  // Ensure these components are defined
// import Etudiants from "./Etudiants";        // Ensure these components are defined
// import Formateur from "./Formateur";        // Ensure these components are defined

const Admincours = () => {
  const [selectedSection, setSelectedSection] = useState("coursdetails");

  const renderContent = () => {
    switch (selectedSection) {
      case "coursdetails":
        return <Coursdetails />;
      case "etudiants":
        // return <Etudiants />;
      case "formateur":
        // return <Formateur />;
      default:
        return <Coursdetails />;
    }
  };

  return (
    <div className="container">
      <ul className="nav nav-pills nav-justified my-3">
        <li className="nav-item">
          <button
            className={`nav-link${selectedSection === "coursdetails" ? " active" : ""}`}
            onClick={() => setSelectedSection("coursdetails")}
          >
            Cours Details
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link${selectedSection === "etudiants" ? " active" : ""}`}
            onClick={() => setSelectedSection("etudiants")}
          >
            Etudiants
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link${selectedSection === "formateur" ? " active" : ""}`}
            onClick={() => setSelectedSection("formateur")}
          >
            Formateur
          </button>
        </li>
      </ul>
      <div className="mt-4">
        {renderContent()}
      </div>
    </div>
  );
};

export default Admincours;
