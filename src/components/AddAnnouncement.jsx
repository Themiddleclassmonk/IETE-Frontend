import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/styles/addAnouncement.css';

const AddAnnouncement = () => {
  const [announcement, setAnnouncement] = useState('');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/admin/addAnnouncement', { msg: announcement });
      alert('Announcement added successfully');
      navigate('/admin/adminDashboard');
    } catch (error) {
      alert('Error adding announcement: ' + error.response?.data?.message || 'Unknown error');
    }
  };

  return (
    <div className="addannouncement" style={{ padding: '20px', textAlign: 'center' }}>
  <h1>Add Announcement</h1>
  <form onSubmit={handleSubmit} id="announcementForm">
    <textarea
      id="announcementInput"
      className="announcement-textarea"
      rows="5"
      cols="50"
      placeholder="Enter announcement"
      value={announcement}
      onChange={(e) => setAnnouncement(e.target.value)}
      required
    />
    <br />
    <button type="submit" className="add-announcement-button" style={{ marginTop: '10px' }}>
      Add Announcement
    </button>
  </form>
</div>

  );
};

export default AddAnnouncement;
