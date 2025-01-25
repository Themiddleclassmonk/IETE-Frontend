import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddEvent() {
  const [eventData, setEventData] = useState({
    eventName: '',
    eventAbout: '',
    eventWinner: '',
    eventRunnerUp: '',
    guests: [],
    organizers: [],
    guestImages: [],
    winnerRunnerUpImages: [],
    eventImages: [],
    pdfFile: null,
  });

  const [imageCounts, setImageCounts] = useState({
    guestImages: 0,
    winnerRunnerUpImages: 0,
    eventImages: 0,
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files[0]) {
      setEventData({ ...eventData, [name]: files[0] });
    }
  };

  const handleImageFileChange = (e, index, imageType) => {
    const { files } = e.target;
    if (files[0]) {
      const newImages = [...eventData[imageType]];
      newImages[index] = files[0];
      setEventData({ ...eventData, [imageType]: newImages });
    }
  };

  const handleImageCountChange = (e, imageType, maxCount) => {
    const count = Math.min(Number(e.target.value), maxCount);
    setImageCounts({ ...imageCounts, [imageType]: count });
    setEventData({ ...eventData, [imageType]: Array(count).fill(null) });
  };

  const handleArrayInputChange = (e, index, type) => {
    const newArray = [...eventData[type]];
    newArray[index] = e.target.value;
    setEventData({ ...eventData, [type]: newArray });
  };

  const handleNumberChange = (e, type) => {
    const count = Number(e.target.value);
    setEventData({ ...eventData, [type]: Array(count).fill('') });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('eventName', eventData.eventName);
    formData.append('eventAbout', eventData.eventAbout);
    formData.append('eventWinner', eventData.eventWinner);
    formData.append('eventRunnerUp', eventData.eventRunnerUp);
    eventData.guests.forEach((guest, index) => {
      formData.append(`guests[${index}]`, guest);
    });
    eventData.organizers.forEach((organizer, index) => {
      formData.append(`organizers[${index}]`, organizer);
    });

    if (eventData.pdfFile) {
      formData.append('pdfFile', eventData.pdfFile);
    }

    ['guestImages', 'winnerRunnerUpImages', 'eventImages'].forEach((imageType) => {
      eventData[imageType].forEach((image, index) => {
        if (image) {
          formData.append(`${imageType}[${index}]`, image);
        }
      });
    });

    try {
      await axios.post('http://localhost:4000/admin/addEvent', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Event submitted successfully');
      navigate('/admin/adminDashboard');
    } catch (error) {
      alert('Error submitting event');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <input type="text" name="eventName" placeholder="Event Name" onChange={handleInputChange} />
      <textarea name="eventAbout" placeholder="Event About" onChange={handleInputChange}></textarea>
      <input type="text" name="eventWinner" placeholder="Event Winner" onChange={handleInputChange} />
      <input type="text" name="eventRunnerUp" placeholder="Event Runner-Up" onChange={handleInputChange} />

      <label>Number of Guests</label>
      <input type="number" onChange={(e) => handleNumberChange(e, 'guests')} />
      {eventData.guests.map((_, index) => (
        <input
          key={index}
          type="text"
          placeholder={`Guest ${index + 1} Name`}
          onChange={(e) => handleArrayInputChange(e, index, 'guests')}
        />
      ))}

      <label>Number of Organizers</label>
      <input type="number" onChange={(e) => handleNumberChange(e, 'organizers')} />
      {eventData.organizers.map((_, index) => (
        <input
          key={index}
          type="text"
          placeholder={`Organizer ${index + 1} Name`}
          onChange={(e) => handleArrayInputChange(e, index, 'organizers')}
        />
      ))}

      <label>Upload PDF</label>
      <input type="file" name="pdfFile" onChange={handleFileChange} accept="application/pdf" />

      <label>Number of Guest Images (Max 5)</label>
      <input
        type="number"
        max="5"
        value={imageCounts.guestImages}
        onChange={(e) => handleImageCountChange(e, 'guestImages', 5)}
      />
      {Array.from({ length: imageCounts.guestImages }, (_, index) => (
        <div key={index}>
          <label>Guest Image {index + 1}</label>
          <input
            type="file"
            onChange={(e) => handleImageFileChange(e, index, 'guestImages')}
            accept="image/*"
          />
        </div>
      ))}

      <label>Number of Winner & Runner-Up Images (Max 2)</label>
      <input
        type="number"
        max="2"
        value={imageCounts.winnerRunnerUpImages}
        onChange={(e) => handleImageCountChange(e, 'winnerRunnerUpImages', 2)}
      />
      {Array.from({ length: imageCounts.winnerRunnerUpImages }, (_, index) => (
        <div key={index}>
          <label>Winner/Runner-Up Image {index + 1}</label>
          <input
            type="file"
            onChange={(e) => handleImageFileChange(e, index, 'winnerRunnerUpImages')}
            accept="image/*"
          />
        </div>
      ))}

      <label>Number of Event Images (Max 8)</label>
      <input
        type="number"
        max="8"
        value={imageCounts.eventImages}
        onChange={(e) => handleImageCountChange(e, 'eventImages', 8)}
      />
      {Array.from({ length: imageCounts.eventImages }, (_, index) => (
        <div key={index}>
          <label>Event Image {index + 1}</label>
          <input
            type="file"
            onChange={(e) => handleImageFileChange(e, index, 'eventImages')}
            accept="image/*"
          />
        </div>
      ))}

      <button type="submit">Submit</button>
    </form>
  );
}

export default AddEvent;
