import React, { useState,useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const UpdateEvent = () => {
  const location = useLocation();
  const { event } = location.state;
  const [eventName, setEventName] = useState(event.eventName);
  const [eventAbout, setEventAbout] = useState(event.eventAbout);
  const [guests, setGuests] = useState([...event.guests]);
  const [organizers, setOrganizers] = useState([...event.organizers]);
  const [eventWinner, setEventWinner] = useState(event.eventWinner);
  const [eventRunnerUp, setEventRunnerUp] = useState(event.eventRunnerUp);
  const [selectedImagesToDelete, setSelectedImagesToDelete] = useState([]);
  const [deletePdf, setDeletePdf] = useState(false);
  const [newGuestImages, setNewGuestImages] = useState([]);
  const [newWinnerImages, setNewWinnerImages] = useState([]);
  const [newRandomImages, setNewRandomImages] = useState([]);
  const [newPdfFile, setNewPdfFile] = useState(null); // New state for PDF file
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:4000/auth/check-session', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          navigate('/');
        }
      } catch (err) {
        alert('Failed');
        navigate('/');
      }
    };

    fetchUserData();
  }, [navigate]);

  
  const handleAddField = (type) => {
    if (type === 'guest') {
      setGuests([...guests, '']);
    } else {
      setOrganizers([...organizers, '']);
    }
  };

  const handleChange = (index, value, type) => {
    if (type === 'guest') {
      const newGuests = [...guests];
      newGuests[index] = value;
      setGuests(newGuests);
    } else {
      const newOrganizers = [...organizers];
      newOrganizers[index] = value;
      setOrganizers(newOrganizers);
    }
  };

  const handleOpenPdf = (pdfId, e) => {
    e.preventDefault();
    window.open(`http://localhost:4000/file/${pdfId}`, '_blank');
  };

  const handlePdfChange = (e) => {
    setNewPdfFile(e.target.files[0]);
  };


  const handleImageSelection = (imageId) => {
    setSelectedImagesToDelete((prevState) =>
      prevState.includes(imageId)
        ? prevState.filter((id) => id !== imageId)
        : [...prevState, imageId]
    );
  };

  const handleImageUpload = (e, category) => {
    const files = Array.from(e.target.files);
    if (category === 'guest') {
      setNewGuestImages((prevState) => [...prevState, ...files]);
    } else if (category === 'winner') {
      setNewWinnerImages((prevState) => [...prevState, ...files]);
    } else if (category === 'random') {
      setNewRandomImages((prevState) => [...prevState, ...files]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('eventName', eventName);
    formData.append('eventAbout', eventAbout);
    formData.append('guests', guests);
    formData.append('organizers', organizers);
    formData.append('eventWinner', eventWinner);
    formData.append('eventRunnerUp', eventRunnerUp);

    // Append selected images
    newGuestImages.forEach((file) => {
      formData.append('guestImages', file);
    });
    newWinnerImages.forEach((file) => {
      formData.append('winnerRunnerUpImages', file);
    });
    newRandomImages.forEach((file) => {
      formData.append('eventImages', file);
    });

    // Append delete image IDs
    selectedImagesToDelete.forEach((imageId) => {
      formData.append('deleteImages', imageId);
    });

    // Append delete PDF flag if necessary
    if (deletePdf) {
      formData.append('deletePdf', true);
    }

    // Append new PDF file if selected
    if (newPdfFile) {
      formData.append('pdfFile', newPdfFile);
    }

    try {
      await axios.put(`http://localhost:4000/admin/updateEvent/${event._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Event updated successfully');
      navigate('/adminDashboard');
    } catch (error) {
      alert('Error updating event: ' + error.response?.data?.message || 'Unknown error');
    }
  };
  

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Update Event</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Event Name:</label>
          <input 
            type="text" 
            value={eventName} 
            onChange={(e) => setEventName(e.target.value)} 
            style={{ marginLeft: '10px', padding: '5px' }} 
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Event About:</label>
          <textarea 
            value={eventAbout} 
            onChange={(e) => setEventAbout(e.target.value)} 
            style={{ marginLeft: '10px', padding: '5px', width: '300px', height: '100px' }} 
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
            <label>Event Winner:</label>
            <input 
                type="text" 
                value={eventWinner} 
                onChange={(e) => setEventWinner(e.target.value)} 
                style={{ marginLeft: '10px', padding: '5px' }} 
            />
        </div>

        <div style={{ marginBottom: '15px' }}>
            <label>Event RunnerUp:</label>
            <input 
                type="text" 
                value={eventRunnerUp} 
                onChange={(e) => setEventRunnerUp(e.target.value)} 
                style={{ marginLeft: '10px', padding: '5px' }} 
            />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Guests:</label>
          {guests.map((guest, index) => (
            <div key={index} style={{ marginTop: '5px' }}>
              <input 
                type="text" 
                value={guest} 
                onChange={(e) => handleChange(index, e.target.value, 'guest')} 
                style={{ padding: '5px', width: '200px' }} 
              />
            </div>
          ))}
          <button type="button" onClick={() => handleAddField('guest')} style={{ marginTop: '10px' }}>
            Add Guest
          </button>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Organizers:</label>
          {organizers.map((organizer, index) => (
            <div key={index} style={{ marginTop: '5px' }}>
              <input 
                type="text" 
                value={organizer} 
                onChange={(e) => handleChange(index, e.target.value, 'organizer')} 
                style={{ padding: '5px', width: '200px' }} 
              />
            </div>
          ))}
          <button type="button" onClick={() => handleAddField('organizer')} style={{ marginTop: '10px' }}>
            Add Organizer
          </button>
        </div>

        <div style={{ margin: '20px 0' }}>
          <h2>Guest Images</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {event.guestImages.map((imageId) => (
              <div key={imageId} style={{ margin: '10px' }}>
                <img
                  src={`http://localhost:4000/file/${imageId}`}
                  alt="Guest"
                  style={{ width: '200px', height: 'auto' }}
                />
                <div>
                  <input
                    type="checkbox"
                    onChange={() => handleImageSelection(imageId)}
                  />{' '}
                  Delete
                </div>
              </div>
            ))}
          </div>
          {event.guestImages.length + newGuestImages.length < 5 && (
            <>
                <div>
                  <input
                    type="file"
                    multiple
                    onChange={(e) => handleImageUpload(e, 'guest')}
                  />
                </div>
                </>
          )} 
          {newGuestImages.length > 0 && (
            <>
              <div>
                {newGuestImages.map((file, index) => (
                  <div key={index}>{file.name}</div>
                ))}
              </div>
            </>
          )} 
    
        </div>

        {/* Winner & Runner-Up Images Section */}
        <div style={{ margin: '20px 0' }}>
          <h2>Winner & Runner-Up Images</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {event.winnerImages.map((imageId) => (
              <div key={imageId} style={{ margin: '10px' }}>
                <img
                  src={`http://localhost:4000/file/${imageId}`}
                  alt="Winner"
                  style={{ width: '200px', height: 'auto' }}
                />
                <div>
                  <input
                    type="checkbox"
                    onChange={() => handleImageSelection(imageId)}
                  />{' '}
                  Delete
                </div>
              </div>
            ))}
          </div>
          {event.winnerImages.length + newWinnerImages.length < 2 && (
            <>
                <div>
                  <input
                    type="file"
                    multiple
                    onChange={(e) => handleImageUpload(e, 'winner')}
                  />
                </div>
            </>
          )}
          {newWinnerImages.length >0 && (
            <>
              <div>
                {newWinnerImages.map((file, index) => (
                  <div key={index}>{file.name}</div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Event Images Section */}
        <div style={{ margin: '20px 0' }}>
          <h2>Event Images</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {event.randomImages.map((imageId) => (
              <div key={imageId} style={{ margin: '10px' }}>
                <img
                  src={`http://localhost:4000/file/${imageId}`}
                  alt="Event"
                  style={{ width: '200px', height: 'auto' }}
                />
                <div>
                  <input
                    type="checkbox"
                    onChange={() => handleImageSelection(imageId)}
                  />{' '}
                  Delete
                </div>
              </div>
            ))}
          </div>
          {event.randomImages.length + newRandomImages.length < 8 && (
            <>
                <div>
                  <input
                    type="file"
                    multiple
                    onChange={(e) => handleImageUpload(e, 'random')}
                  />
                </div>
            </>
              )}
              {newRandomImages.length > 1 && (
            <>
              <div>
                {newRandomImages.map((file, index) => (
                  <div key={index}>{file.name}</div>
                ))}
              </div>
            </>
          )}
        </div>
        {event.pdfFile && !deletePdf && (
        <div>
          <button onClick={(e) => handleOpenPdf(event.pdfFile, e)}>Open PDF</button>
          <div>
            <input
              type="checkbox"
              onChange={(e) => setDeletePdf(e.target.checked)}
            />{' '}
            Delete PDF
          </div>
        </div>
      )}

      {(deletePdf || !event.pdfFile) && (
        <div>
          <input type="file" accept="application/pdf" onChange={handlePdfChange} />
        </div>
      )}
        <button type="submit" style={{ padding: '10px 20px', marginTop: '20px' }}>
          Update Event
        </button>
      </form>
    </div>
  );
};

export default UpdateEvent;
