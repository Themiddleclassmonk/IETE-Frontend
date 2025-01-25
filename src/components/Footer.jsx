import React from 'react';
import '../assets/styles/Footer.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <h2 className="footer-heading">Important Links</h2>
        <ul className="footerlist">
          <li><a className="footerlinks" id="link1" href="#">About</a></li>
          <li><a className="footerlinks" id="link2" href="#">Contact Us</a></li>
          <li><a className="footerlinks" id="link3" href="#">Tech Team</a></li>
          <li><a className="footerlinks" id="link4" href="#">Dean</a></li>
          <li><a className="footerlinks" id="link5" href="#">Events</a></li>
        </ul>
      </div>

      <div className="footer-right">
        <h3>Follow Us</h3>
        <div className="social-icons">
          <a href="#"><i className="bi bi-facebook"></i></a>
          <a href="#"><i className="bi bi-twitter"></i></a>
          <a href="#"><i className="bi bi-linkedin"></i></a>
          <a href="#"><i className="bi bi-instagram"></i></a>
          <a href="#"><i className="bi bi-youtube"></i></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
