import Link from "next/link";
import "./Header.scss"; // Adjust the import path as necessary

const Header = () => {
  return (
    <div>
      <header className="header">
        <nav>
          <div className="LeafLog">LeafLog</div>
          <br />
          <div className="navContainer">
            <Link href="/" legacyBehavior>
              <a id="homeLink" className="navLink, font20">
                Home &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </a>
            </Link>
            <Link href="/getting-started" legacyBehavior>
              <a id="startLink" className={styles.navLink}>
                Getting Started &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;
              </a>
            </Link>
            <Link href="/plant-log" legacyBehavior>
              <a id="myPlantsLink" className="navLink">
                My Plants &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;
              </a>
            </Link>
            <Link href="/search" legacyBehavior>
              <a id="searchLink" className="navLink">
                Discover Plants &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;
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
            <Link href="/tos" legacyBehavior>
              <a id="tosLink">
                Terms of Service &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </a>
            </Link>          
             <Link href="/tos" legacyBehavior>
              <a id="loginLink" className={styles.navLink}>
                Terms of Service &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </a>
            </Link>
            {/* Add other navigation links here */}
          </div>
        </nav>
      </header>
    </div>
  );
}
  ;

export default Header;
