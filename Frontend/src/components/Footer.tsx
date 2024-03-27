import Link from "next/link";
import styles from "./Header.module.css"; // Adjust the import path as necessary

const Footer = () => {
  return (
   <div>
      <footer className={styles.header}>
        <nav>
          <br />
          <div className={styles.navContainer}>
            <Link href="/tos" legacyBehavior>
              <a id="tosLink" className={styles.navLink}>
                Terms of Service &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </a>
            </Link>
            <Link href="/feedback" legacyBehavior>
              <a id="feedbackLink" className={styles.navLink}>
                Feedback Form &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
      </footer>
    </div>
  );
};

export default Footer;
