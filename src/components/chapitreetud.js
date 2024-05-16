import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Chapitreetud = () => {
  const { chapitre_id } = useParams();
  const chapitreId = chapitre_id;
  const [pdfs, setPdfs] = useState([]);

  useEffect(() => {
    const fetchPdfChapitres = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/pdfchapitre/getPdfChapitresByChapitreId/${chapitre_id}`, {
            params:{chapitreId},
        });
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
            <div className='card-body pdfs'>
              <h5 className='card-title'>{pdf.pdf_name}</h5>
              {/* Display other PDF details as needed */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chapitreetud;
