import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/styles/showAnnouncements.css'; // Import the CSS file

const ShowAnnouncement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get('http://localhost:4000/admin/showAnnouncements', {
          withCredentials: true,
        });
        setAnnouncements(response.data.announcements);
      } catch (err) {
        navigate('/admin/loginForm');
      }
    };

    fetchAnnouncements();
  }, [navigate]);

  const handleAddAnnouncement = () => {
    navigate('/admin/addAnnouncement');
  };

  const handleDeleteAnnouncement = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this announcement? This action cannot be undone.");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:4000/admin/deleteAnnouncement/${id}`, {
          withCredentials: true,
        });
        setAnnouncements(announcements.filter((announcement) => announcement._id !== id));
      } catch (error) {
        alert('Error deleting announcement');
      }
    } else {
      alert('Event deletion canceled.');
    }
  };

  return (
    <div className="announcements-container">
      <h1 className="announcements-title">Announcements</h1>
      {announcements.length > 0 ? (
        <table className="announcements-table">
          <thead>
            <tr>
              <th className="announcementstable-header">Message</th>
              <th className="announcementstable-header">Date</th>
              <th className="announcementstable-header">Actions</th>
            </tr>
          </thead>
          <tbody>
            {announcements.map((announcement) => (
              <tr key={announcement._id} className="announcementstable-row">
                <td className="announcementstable-cell">{announcement.msg}</td>
                <td className="announcementstable-cell">{new Date(announcement.createdAt).toLocaleString()}</td>
                <td className="announcementstable-cell">
                  <button
                    className="announcementsdelete-button"
                    onClick={() => handleDeleteAnnouncement(announcement._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="announcementsno-announcements">
          <p>No announcements available.</p>
          <button
            id="addAnnouncementButton"
            className="add-announcement-button"
            onClick={handleAddAnnouncement}
          >
            Add Announcement
          </button>
        </div>
      )}
    </div>
  );
};

export default ShowAnnouncement;
