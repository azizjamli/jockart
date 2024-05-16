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
        {pdfs.map(pdf => (
          <div key={pdf.pdf_id} className='card'>
            <div className='card-body'>
              <h5 className='card-title'>{pdf.pdf_name}</h5>
              {/* Display other PDF details as needed */}
              <embed src={`data:application/pdf;base64,${pdf.pdf_content}`} type="application/pdf" width="100%" height="500px" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chapitreetud;
