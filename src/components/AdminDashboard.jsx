import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/AdminDashboard.css'; // Import your CSS file

const AdminDashboard = () => { 
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:4000/admin/dashboard', {
          method: 'GET',
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          setEvents(data.events);
        } else {
          navigate('/admin/loginForm');
        }
      } catch (err) {
        alert('Failed to fetch events');
        navigate('/admin/loginForm');
      }
    };

    fetchEvents();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:4000/admin/logout', {
        method: 'POST',
        credentials: 'include',
      });
      if (response.ok) {
        navigate('/admin/loginForm');
      } else {
        console.error('Logout failed');
      }
    } catch (err) {
      console.error('Error during logout', err);
    }
  };

  const handleAddEvent = () => navigate('/admin/addEvent');
  const handleEventClick = (event) => navigate('/admin/eventDetails', { state: { event } });
  const handleAddAnnouncementClick = () => navigate('/admin/addAnnouncement');
  const handleShowAnnouncementClick = () => navigate('/admin/ShowAnnouncement');
  const handleAddMemberClick = () => navigate('/admin/addMember');
  const handleShowMemberClick = () => navigate('/admin/showMembers');
  const handleAddAdminClick = () => navigate('/admin/addAdmin');

  return (
    <div className="adminBody">
    <div className="adminContainer">
      <div className="adminSidebar">
        <h2 className="adminHto">Welcome Admin!</h2>
        <ul>
          <li><button onClick={handleAddMemberClick} id="addMemberBtn"><i className="fa-solid fa-user-plus"></i> Add Member</button></li>
          <li><button onClick={handleShowMemberClick} id="showMemberBtn"><i className="fa-solid fa-user-minus"></i> Show Members</button></li>
          <li><button onClick={handleAddEvent} id="addEventBtn"><i className="fa fa-calendar-plus"></i> Add Event</button></li>
          <li><button onClick={handleAddAdminClick} id="addAdminBtn"><i className="fa-solid fa-user-shield"></i> Add Admin</button></li>
          <li><button onClick={handleShowAnnouncementClick} id="showAnnouncementBtn"><i className="fa fa-bullhorn"></i> Show Announcements</button></li>
          <li><button onClick={handleAddAnnouncementClick} id="addAnnouncementBtn"><i className="fa fa-plus-circle"></i> Add Announcement</button></li>
          <li><button onClick={handleLogout} id="logoutBtn"><i className="fa-solid fa-right-from-bracket"></i> Logout</button></li>
        </ul>
      </div>

      <div className="adminmain-content">
        <div className="adminboxes">
          {events.length > 0 ? (
            events.map((event, index) => (
              <div className="adminbox" id={`box${index + 1}`} key={index} onClick={() => handleEventClick(event)}>
                <img src={`http://localhost:4000/file/${event.randomImages[0]}`} alt="Event" />
                <p><b>{event.eventName.toUpperCase()}</b></p>
                <p><b>About:</b> {event.eventAbout}</p>
              </div>
            ))
          ) : (
            <p>No events available. Please add an event.</p>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default AdminDashboard;
