import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddMember = () => {
  const [memberName, setMemberName] = useState('');
  const [position, setPosition] = useState('');
  const navigate = useNavigate();

  const handlePositionChange = (e) => {
    setPosition(e.target.value);
  };

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

    let priority;
    switch (position) {
      case 'president':
        priority = 1;
        break;
      case 'vice president':
        priority = 2;
        break;
      case 'secretary':
        priority = 3;
        break;
      case 'treasurer':
        priority = 4;
        break;
      case 'member':
        priority = 6;
        break;
      default:
        priority = 5; // All heads
        break;
    }

    const memberData = { memberName, position, priority };

    try {
      await axios.post('http://localhost:4000/admin/addMember', memberData);
      alert('Member added successfully');
      navigate('/admin/adminDashboard');
    } catch (error) {
      alert('Error adding member');
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Add Member</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Member Name:</label>
          <input 
            type="text" 
            value={memberName} 
            onChange={(e) => setMemberName(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Position:</label>
          <select value={position} onChange={handlePositionChange} required>
            <option value="">Select Position</option>
            <option value="president">President</option>
            <option value="vice president">Vice President</option>
            <option value="secretary">Secretary</option>
            <option value="treasurer">Treasurer</option>
            <option value="photography head">Photography Head</option>
            <option value="event and management head">Event and Management Head</option>
            <option value="publicity head">Publicity Head</option>
            <option value="creativity head">Creativity Head</option>
            <option value="technical head">Technical Head</option>
            <option value="documentation head">Documentation Head</option>
            <option value="content and media head">Content and Media Head</option>
            <option value="member">Member</option>
          </select>
        </div>
        <button type="submit">Add Member</button>
      </form>
    </div>
  );
};

export default AddMember;

