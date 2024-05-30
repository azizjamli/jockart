import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Chapireformateur = () => {
  const { chapitre_id } = useParams();
  const [pdfs, setPdfs] = useState([]);
  const [videos, setVideos] = useState([]);
  const [activeTab, setActiveTab] = useState('inspecter');
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfTitle, setPdfTitle] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [videoTitle, setVideoTitle] = useState("");

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

  const handlePdfUpload = async (event) => {
    event.preventDefault();
    if (!pdfFile || !pdfTitle) {
      alert("Please provide a title and select a PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append('pdf', pdfFile);
    formData.append('title', pdfTitle);

    try {
      const response = await axios.post(`http://localhost:3001/api/pdfchapitre/createPdfChapitre/${chapitre_id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('PDF uploaded successfully!');
      setPdfs([...pdfs, response.data]);
      setPdfTitle("");
      setPdfFile(null);
    } catch (error) {
      console.error('Error uploading PDF:', error);
      alert('Error uploading PDF');
    }
  };

  const handleVideoUpload = async (event) => {
    event.preventDefault();
    if (!videoFile || !videoTitle) {
      alert("Please provide a title and select a video file.");
      return;
    }

    const formData = new FormData();
    formData.append('video', videoFile);
    formData.append('title', videoTitle);

    try {
      const response = await axios.post(`http://localhost:3001/api/videos/createVideo/${chapitre_id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Video uploaded successfully!');
      setVideos([...videos, response.data]);
      setVideoTitle("");
      setVideoFile(null);
    } catch (error) {
      console.error('Error uploading video:', error);
      alert('Error uploading video');
    }
  };

  const handlePdfDelete = async (pdfId, pdfContent) => {
    try {
      await axios.delete(`http://localhost:3001/api/pdfchapitre/deletePdfChapitre/${pdfId}`);
      setPdfs(pdfs.filter(pdf => pdf.pdf_id !== pdfId));
      alert('PDF deleted successfully!');
    } catch (error) {
      console.error('Error deleting PDF:', error);
      alert('Error deleting PDF');
    }
  };

  const handleVideoDelete = async (videoId) => {
    try {
      await axios.delete(`http://localhost:3001/api/videos/deleteVideo/${videoId}`);
      setVideos(videos.filter(video => video.id !== videoId));
      alert('Video deleted successfully!');
    } catch (error) {
      console.error('Error deleting video:', error);
      alert('Error deleting video');
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'inspecter':
        return (
          <div>
            <h3>PDFs</h3>
            <div className='d-flex justify-content-around mt-3 flex-wrap'>
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
                        <button className="btn btn-danger border-0 mt-2" onClick={() => handlePdfDelete(pdf.pdf_id, pdf.pdf_content)}>
                          Supprimer PDF
                        </button>
                      </>
                    ) : (
                      <p>No PDF content available.</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
  
            <div className='row mt-5'>
              <div className='col-md-12'>
                <h3>Videos</h3>
                <div className='d-flex justify-content-around flex-wrap gap-2 mt-4'>
                  {videos.map(video => (
                    <div key={video.id} className='card col-md-5'>
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
                         <button className="btn btn-danger border-0 mt-2" onClick={() => handleVideoDelete(video.id)}>
                          Supprimer ce vidéo
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 'ajouter-pdf':
        return (
          <div>
            <h3>Ajouter un PDF</h3>
            <form onSubmit={handlePdfUpload}>
              <div className="mb-3">
                <label htmlFor="pdfTitle" className="form-label">PDF Title</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="pdfTitle" 
                  value={pdfTitle} 
                  onChange={(e) => setPdfTitle(e.target.value)} 
                  required 
                />
              </div>
              <div className="mb-3">
                <label htmlFor="pdfFile" className="form-label">PDF File</label>
                <input 
                  type="file" 
                  className="form-control" 
                  id="pdfFile" 
                  onChange={(e) => setPdfFile(e.target.files[0])} 
                  accept="application/pdf" 
                  required 
                />
              </div>
              <button type="submit" className="btn btn-primary">Upload PDF</button>
            </form>
          </div>
        );
      case 'ajouter-video':
        return (
          <div>
            <h3>Ajouter une vidéo</h3>
            <form onSubmit={handleVideoUpload}>
              <div className="mb-3">
                <label htmlFor="videoTitle" className="form-label">Video Title</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="videoTitle" 
                  value={videoTitle} 
                  onChange={(e) => setVideoTitle(e.target.value)} 
                  required 
                />
              </div>
              <div className="mb-3">
                <label htmlFor="videoFile" className="form-label">Video File</label>
                <input 
                  type="file" 
                  className="form-control" 
                  id="videoFile" 
                  onChange={(e) => setVideoFile(e.target.files[0])} 
                  accept="video/*" 
                  required 
                />
              </div>
              <button type="submit" className="btn btn-primary">Upload Video</button>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className='container'>
      <h2>Chapireformateur Component</h2>
      <p>Chapitre ID: {chapitre_id}</p>

      <div className='btn-group' role='group'>
        <button type='button' className={`btn btn-outline-primary ${activeTab === 'inspecter' ? 'active' : ''}`} onClick={() => setActiveTab('inspecter')}>Inspecter contenu</button>
        <button type='button' className={`btn btn-outline-primary ${activeTab === 'ajouter-pdf' ? 'active' : ''}`} onClick={() => setActiveTab('ajouter-pdf')}>Ajouter un PDF</button>
        <button type='button' className={`btn btn-outline-primary ${activeTab === 'ajouter-video' ? 'active' : ''}`} onClick={() => setActiveTab('ajouter-video')}>Ajouter une vidéo</button>
      </div>

      <div className='mt-4'>
        {renderContent()}
      </div>
    </div>
  );
};

export default Chapireformateur;
