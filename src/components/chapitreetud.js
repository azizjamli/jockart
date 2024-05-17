import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Chapitreetud = () => {
  const { chapitre_id } = useParams();
  const [pdfs, setPdfs] = useState([]);

  useEffect(() => {
    const fetchPdfChapitres = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/pdfchapitre/getPdfChapitresByChapitreId/${chapitre_id}`);
        setPdfs(response.data);
      } catch (error) {
        console.error('Error fetching PDF chapitres:', error);
      }
    };

    fetchPdfChapitres();
  }, [chapitre_id]);

  return (
    <div>
      <h2>Chapitreetud Component</h2>
      <p>Chapitre ID: {chapitre_id}</p>
      
      <div className='row'>
      {pdfs.map(pdf => {
  console.log(pdf.pdf_content); // Add this line for debugging
  return (
    <div key={pdf.pdf_id} className='card'>
      <div className='card-body'>
        <h5 className='card-title'>{pdf.pdf_name}</h5>
        {pdf.pdf_content ? (
          <object 
          data={`data:application/pdf;base64,${pdf.pdf_content}`} 
          type="application/pdf" 
          width="100%" 
          height="500px" 
        ></object>
        ) : (
          <p>No PDF content available.</p>
        )}
      </div>
    </div>
  );
})}

      </div>
    </div>
  );
};

export default Chapitreetud;
