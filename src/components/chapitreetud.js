import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Chapitreetud = () => {
  const { chapitre_id } = useParams();
  const [pdfs, setPdfs] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pdfResponse = await axios.get(`http://localhost:3001/api/pdfchapitre/getPdfChapitresByChapitreId/${chapitre_id}`);
        setPdfs(pdfResponse.data);

        const videoResponse = await axios.get(`http://localhost:3001/api/videos/getVideosByChapitreId/${chapitre_id}`);
        setVideos(videoResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [chapitre_id]);

  const handlePdfDownload = (pdfName, pdfContent) => {
    try {
      const byteCharacters = atob(pdfContent);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = pdfName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error during PDF download:', error);
    }
  };

  return (
    <div className='container'>
      <h2>Chapitreetud Component</h2>
      <p>Chapitre ID: {chapitre_id}</p>

      <div className='row'>
        <div className='col-md-12'>
          <h3>PDFs</h3>
          <div className='d-flex justify-content-around'>
            {pdfs.map(pdf => (
              <div key={pdf.pdf_id} className='card col-md-3'>
                <div className='card-body'>
                  <h5 className='card-title'>{pdf.pdf_name}</h5>
                  {pdf.pdf_content ? (
                    <>
                      <object
                        data={`data:application/pdf;base64,${pdf.pdf_content}`}
                        type="application/pdf"
                        width="100%"
                        height="300px"
                      ></object>
                      <button
                        className="btn btn-primary border-0 mt-2"
                        onClick={() => handlePdfDownload(pdf.pdf_name, pdf.pdf_content)}
                      >
                        Download PDF
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
      </div>

      <div className='row mt-5'>
        <div className='col-md-12'>
          <h3>Videos</h3>
          <div className='d-flex justify-content-around'>
            {videos.map(video => (
              <div key={video.id} className='card col-md-6'>
                <div className='card-body'>
                  <h5 className='card-title'>{video.video_titre}</h5>
                  {video.video ? (
                    <video controls width="100%" height="300px">
                      <source src={`data:video/mp4;base64,${video.video}`} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <p>No video content available.</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chapitreetud;
