import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EventDetails = () => {
  const location = useLocation();
  const { event } = location.state;
  const navigate = useNavigate();

   useEffect(() => {
       const fetchUserData = async () => {
         try {
           const response = await fetch('http://localhost:4000/auth/check-session', {
             method: 'GET',
             credentials: 'include',
           });
   
           if (!response.ok) {
             navigate('/admin/loginForm');
           }
         } catch (err) {
           alert('Failed');
           navigate('/admin/loginForm');
         }
       };
   
       fetchUserData();
     }, [navigate]);

  const handleOpenPdf = (pdfId) => {
    window.open(`http://localhost:4000/file/${pdfId}`, '_blank'); // Use full URL to request the PDF file from backend
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this event? This action cannot be undone.");
  
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:4000/admin/deleteEvent/${event._id}`);
        alert('Event deleted successfully');
        navigate('/admin/adminDashboard');
      } catch (error) {
        alert('Error deleting event');
      }
    } else {
      // User canceled the delete action
      alert('Event deletion canceled.');
    }
  };
  

  const handleUpdate = () => {
    navigate('/admin/updateEvent', { state: { event } });
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>{event.eventName}</h1>
      <p>{event.eventAbout}</p>
      <h3>Winner: {event.eventWinner}</h3>
      <h3>Runner Up: {event.eventRunnerUp}</h3>

      <div style={{ margin: '20px 0' }}>
  {event.guestImages.length > 0 && (
    <>
      <h2>Guest Images</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {event.guestImages.map((imageId) => (
          <img 
            key={imageId} 
            src={`http://localhost:4000/file/${imageId}`} 
            alt="Guest" 
            style={{ width: '200px', height: 'auto', margin: '10px' }} 
          />
        ))}
      </div>
    </>
  )}
</div>

<div style={{ margin: '20px 0' }}>
  {event.winnerImages.length > 0 && (
    <>
      <h2>Winner & Runner-Up Images</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {event.winnerImages.map((imageId) => (
          <img 
            key={imageId} 
            src={`http://localhost:4000/file/${imageId}`} 
            alt="Winner or Runner-Up" 
            style={{ width: '200px', height: 'auto', margin: '10px' }} 
          />
        ))}
      </div>
    </>
  )}
</div>

<div style={{ margin: '20px 0' }}>
  {event.randomImages.length > 0 && (
    <>
      <h2>Event Images</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {event.randomImages.map((imageId) => (
          <img 
            key={imageId} 
            src={`http://localhost:4000/file/${imageId}`} 
            alt="Event" 
            style={{ width: '200px', height: 'auto', margin: '10px' }} 
          />
        ))}
      </div>
    </>
  )}
</div>

      {event.pdfFile && (
        <button onClick={() => handleOpenPdf(event.pdfFile)} style={{ margin: '20px', padding: '10px 20px' }}>
          Open PDF
        </button>
      )}

      <div style={{ margin: '20px 0' }}>
      {event.guests.length > 0 && (
        <>
        <h2>Guests</h2>
        <ul style={{ listStyleType: 'none', padding: '0' }}>
          {event.guests.map((guest, index) => (
            <li key={index} style={{ margin: '5px 0' }}>{guest}</li>
          ))}
        </ul>
        </>
      )}
      </div>

      <div style={{ margin: '20px 0' }}>
      {event.organizers.length > 0 && (
        <>
        <h2>Organizers</h2>
        <ul style={{ listStyleType: 'none', padding: '0' }}>
          {event.organizers.map((organizer, index) => (
            <li key={index} style={{ margin: '5px 0' }}>{organizer}</li>
          ))}
        </ul>
        </>
      )}
      </div>

      <div style={{ marginTop: '30px' }}>
        <button onClick={handleUpdate} style={{ marginRight: '10px', padding: '10px 20px' }}>
          Update
        </button>
        <button onClick={handleDelete} style={{ padding: '10px 20px', backgroundColor: 'red', color: 'white' }}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default EventDetails;
