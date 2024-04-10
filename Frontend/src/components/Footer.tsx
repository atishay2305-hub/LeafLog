import React from "react";
import Link from "next/link";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footerNavbar">
      <div
        style={{
          opacity: "1",
          backgroundImage: "url(https://wallpapercave.com/wp/wp7855405.jpg)",
          backgroundSize: "cover",
        }}
      >
        <div className="links">
          <Link href="/" legacyBehavior>
            <a id="homeLink" className="navLink">
              Home &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </a>
          </Link>

          <Link href="/signup" legacyBehavior>
            <a id="signupLink" className="navLink">
              Sign Up &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </a>
          </Link>
          <Link href="/login" legacyBehavior>
            <a id="loginLink" className="navLink">
              Log In &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </a>
          </Link>
          <Link href="/feedback" legacyBehavior>
            <a id="feedbackLink" className="navLink">
              Feedback &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </a>
          </Link>
          <Link href="/tos" legacyBehavior>
            <a id="tosLink" className="navLink">
              Terms of Service &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </a>
          </Link>
        </div>
        <div className="social-media">
          <p>Follow Us:</p>
          <div className="social-links">
            <a href="https://facebook.com" className="social-button">
              <i className="fa fa-facebook"></i>
            </a>
            <a href="https://twitter.com" className="social-button">
              <i className="fa fa-twitter"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
