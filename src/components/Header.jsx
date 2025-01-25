import React from 'react';
import '../assets/styles/Header.css';
import ieteLogo from '../assets/images/ietelogo.png';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={ieteLogo} id="iete-logo" alt="IETE Logo" />
      </div>
      <nav className="navbar">
        <div className="navbar-list">
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Events</a></li>
            <li><a href="#">Tech Team</a></li>
            <li><a href="#">Dean</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="/admin/loginForm">Log in/Sign up</a></li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
