import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/styles/HomePage.css';

const EventCard = ({ event }) => (
  <div>
    <div className="homecard">
    <img src={`http://localhost:4000/file/${event.randomImages[0]}`} alt="Event" />
    <div className="homecontent">
      <h3>{event.eventName}</h3>
      <p>{event.eventAbout}</p>
    </div>
    <div className="homeview-more"><a href="#">View more</a></div>
  </div>
  </div>
  
);

const HomePage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:4000/events', { withCredentials: true });
        setEvents(response.data.events);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <main className="main">

      <div className="Quote">
      "Empowering students with knowledge, skills, and innovation—because the future belongs to those who prepare for it today."
      </div>

      <div className='homemain' >
        <div className="homecard-container">
        <button className="homenotification-button">Notifications</button>
        {events.map(event => <EventCard key={event._id} event={event} />)}
      </div>

      <div className="homecard-container">
        <button className="homenotification-button">Notifications</button>
        {events.map(event => <EventCard key={event._id} event={event} />)}
      </div>

      <div className="homecard-container">
        <button className="homenotification-button">Notifications</button>
        {events.map(event => <EventCard key={event._id} event={event} />)}
      </div>

      <div className="homecard-container">
        <button className="homenotification-button">Notifications</button>
        {events.map(event => <EventCard key={event._id} event={event} />)}
      </div>

      <div className="homecard-container">
        <button className="homenotification-button">Notifications</button>
        {events.map(event => <EventCard key={event._id} event={event} />)}
      </div>

      <div className="homecard-container">
        <button className="homenotification-button">Notifications</button>
        {events.map(event => <EventCard key={event._id} event={event} />)}
      </div>

     </div>
    </main>
  );
};

export default HomePage;
