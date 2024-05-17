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

  const handleDownload = (pdfName, pdfContent) => {
    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = pdfName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className='container'>
      <h2>Chapitreetud Component</h2>
      <p>Chapitre ID: {chapitre_id}</p>
      
      <div className='row d-flex justify-content-around'>
        {pdfs.map(pdf => (
          <div key={pdf.pdf_id} className='card col-md-4'>
            <div className='card-body'>
              <h5 className='card-title'>{pdf.pdf_name}</h5>
              {pdf.pdf_content ? (
                <>
                  <object 
                    data={`data:application/pdf;base64,${pdf.pdf_content}`} 
                    type="application/pdf" 
                    width="80%" 
                    height="500px" 
                  ></object>
                  <button 
                    className="btn btn-primary border-0 mt-2" 
                    onClick={() => handleDownload(pdf.pdf_name, atob(pdf.pdf_content))}
                  >
                    Download
                  </button>
                </>
              ) : (
                <p>No PDF content available.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chapitreetud;
