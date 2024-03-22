import Link from "next/link";

import "./Header.scss"; // Adjust the import path as necessary

const Header = () => {
  return (
    <div>
      {" "}
      <header className="header-area">
        <div className="alazea-main-menu">
          <div className="classy-nav-container breakpoint-off">
            <div className="container">
              <nav
                className="classy-navbar justify-content-between"
                id="alazeaNav"
              >
                <a href="index.html" className="nav-brand">
                  <img src="img/core-img/logo.png" alt="" />
                </a>
                <div className="classy-navbar-toggler">
                  <span className="navbarToggler">
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                </div>
                <div className="classy-menu">
                  <div className="classycloseIcon">
                    <div className="cross-wrap">
                      <span className="top"></span>
                      <span className="bottom"></span>
                    </div>
                  </div>

                  <div className="classynav">
                    <ul>
                      <li>
                        <Link href="/" legacyBehavior>
                          <a id="homeLink" className="navLink, font20">
                            Home &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/getting-started" legacyBehavior>
                          <a id="homeLink" className="navLink, font20">
                            Getting Started
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/plant-log" legacyBehavior>
                          <a id="myPlantsLink" className="navLink">
                            My Plants &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/search" legacyBehavior>
                          <a id="searchLink" className="navLink">
                            Discover Plants &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/signup" legacyBehavior>
                          <a id="signupLink" className="navLink">
                            Sign Up &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/login" legacyBehavior>
                          <a id="loginLink" className="navLink">
                            Log In &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/tos" legacyBehavior>
                          <a id="tosLink">
                            Terms of Service
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          </a>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
              <div className="search-form">
                <form action="#" method="get">
                  <input
                    type="search"
                    name="search"
                    id="search"
                    placeholder="Type keywords &amp; press enter..."
                  />
                  <button type="submit" className="d-none"></button>
                </form>
                <div className="closeIcon">
                  <i className="fa fa-times" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};
export default Header;
