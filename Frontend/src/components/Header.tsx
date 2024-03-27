import Link from "next/link";
import styles from "./Header.module.css"; // Adjust the import path as necessary

const Header = () => {
  return (
   <div>
      <header className={styles.header}>
        <nav>
          <div className={styles.LeafLog}>LeafLog</div>
          <br />
          <div className={styles.navContainer}>
            <Link href="/" legacyBehavior>
              <a id="homeLink" className={styles.navLink}>
                Home &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </a>
            </Link>
            <Link href="/getting-started" legacyBehavior>
              <a id="startLink" className={styles.navLink}>
                Getting Started &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;
              </a>
            </Link>
            <Link href="/plant-log" legacyBehavior>
              <a id="myPlantsLink" className={styles.navLink}>
                My Plants &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;
              </a>
            </Link>
            <Link href="/search" legacyBehavior>
              <a id="searchLink" className={styles.navLink}>
                Discover Plants &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;
              </a>
            </Link>
            <Link href="/signup" legacyBehavior>
              <a id="signupLink" className={styles.navLink}>
                Sign Up &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </a>
            </Link>
            <Link href="/login" legacyBehavior>
              <a id="loginLink" className={styles.navLink}>
                Log In &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </a>
            </Link>
            {/* Add other navigation links here */}
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
