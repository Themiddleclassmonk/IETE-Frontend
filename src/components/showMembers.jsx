import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/styles/showMembers.css'; // Import the external CSS file

const ShowMembers = () => {
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch('http://localhost:4000/showMembers', {
          method: 'GET',
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          setMembers(data.members);
        } else {
          navigate('/admin/loginForm');
        }
      } catch (error) {
        console.error('Failed to fetch members:', error);
        navigate('/admin/loginForm');
      }
    };

    fetchMembers();
  }, [navigate]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      try {
        await axios.delete(`http://localhost:4000/deleteMember/${id}`);
        setMembers(members.filter((member) => member._id !== id));
      } catch (error) {
        console.error('Failed to delete member:', error);
        alert('Error deleting member');
      }
    }
  };

  return (
    <div id="membersContainer" className="show-members-container">
      <h1 className="show-members-title">Members</h1>
      <div className="show-inner-box">
        <table className="show-members-table">
          <thead>
            <tr>
              <th className="show-table-header">Name</th>
              <th className="show-table-header">Position</th>
              <th className="show-table-header">Action</th>
            </tr>
          </thead>
          <tbody>
            {members.length > 0 ? (
              members.map((member) => (
                <tr key={member._id} className="show-table-row">
                  <td className="show-table-cell">{member.memberName}</td>
                  <td className="show-table-cell">{member.position}</td>
                  <td className="show-table-cell">
                    <button
                      className="show-delete-button"
                      onClick={() => handleDelete(member._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="show-no-members">No members found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShowMembers;
