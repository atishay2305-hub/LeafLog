import Link from "next/link";
import React from "react";
import "./Header.css"

const Header = () => {
  return (
    <div>
      <header className="navbar">
        <div className="links">
          <Link href="/" legacyBehavior>
            <a id="homeLink" className="navLink">
              Home &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </a>
          </Link>
          <Link href="/plant-log" legacyBehavior>
            <a id="myPlantsLink" className="navLink">
              My Plants &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </a>
          </Link>
          <Link href="/search" legacyBehavior>
            <a id="searchLink" className="navLink">
              Discover Plants &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </a>
          </Link>

          <Link href="/profile" legacyBehavior>
            <a id="profileLink" className="navLink">
              Profile &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </a>
          </Link>
          <Link href="/logout" legacyBehavior>
            <a id="logoutLink" className="navLink">
              Log Out &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </a>
          </Link>
          <Link href="/tos" legacyBehavior>
            <a id="tosLink" className="navLink">
              Terms of Service &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </a>
          </Link>
        </div>
      </header>
    </div>
  );
};

export default Header;
