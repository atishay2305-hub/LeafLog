import Link from "next/link";
import React, { useState } from "react";
import "./Header.css";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div>
      <header className="navbar">
        <div className="menu-toggle" onClick={toggleMenu}>
          <div className="icon"></div>
          <div className="icon"></div>
          <div className="icon"></div>
        </div>
        <div className={`links ${showMenu ? 'show' : ''}`}>
          <Link href="/LandingPage" legacyBehavior>
            <a id="homeLink" className="navLink">
              Home
            </a>
          </Link>
          <Link href="/plant-log" legacyBehavior>
            <a id="myPlantsLink" className="navLink">
              My Plants
            </a>
          </Link>
          <Link href="/search" legacyBehavior>
            <a id="searchLink" className="navLink">
              Discover Plants
            </a>
          </Link>
          <Link href="/tos" legacyBehavior>
            <a id="tosLink" className="navLink">
              Terms of Service
            </a>
          </Link>
          <Link href="/" legacyBehavior>
            <a id="logoutLink" className="navLink">
              Log Out
            </a>
          </Link>
        </div>
      </header>
    </div>
  );
};

export default Header;
