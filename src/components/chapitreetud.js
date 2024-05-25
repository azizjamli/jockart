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

  const handlePdfDownload = (pdfPath) => {
    const url = `http://localhost:3001/uploads/pdfchapitres/${pdfPath}`;
    const a = document.createElement('a');
    a.href = url;
    a.download = pdfPath;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
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
                        data={`http://localhost:3001/uploads/pdfchapitres/${pdf.pdf_content}`}
                        type="application/pdf"
                        width="100%"
                        height="300px"
                      >
                        <p>Your browser does not support PDFs. Please download the PDF to view it: 
                          <a href={`http://localhost:3001/uploads/pdfchapitres/${pdf.pdf_content}`} download>Download PDF</a>.
                        </p>
                      </object>
                      <button
                        className="btn btn-primary border-0 mt-2"
                        onClick={() => handlePdfDownload(pdf.pdf_content)}
                      >
                        Télécharger PDF
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
                      <source src={`http://localhost:3001/uploads/videos/${video.video}`} type="video/mp4" />
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
