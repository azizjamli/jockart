import React from 'react';
import { useParams } from 'react-router-dom';

const Chapitreetud = () => {
  const { chapitre_id } = useParams();

  return (
    <div>
      <h2>Chapitreetud Component</h2>
      <p>Chapitre ID: {chapitre_id}</p>
    </div>
  );
};

export default Chapitreetud;
