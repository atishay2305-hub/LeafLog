import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer">
        <div className="social-media">
          <p>Follow Us:</p>
          <div className="social-links">
            <a href="#" className="social-button">
              <i className="fa fa-facebook"></i>
            </a>
            <a href="#" className="social-button">
              <i className="fa fa-twitter"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
