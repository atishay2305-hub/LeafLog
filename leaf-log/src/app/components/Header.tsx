import Link from "next/link";
import styles from "./Header.module.css"; // Adjust the import path as necessary

const Header = () => {
  return (
    <header className={styles.header}>
      <nav>
        <Link href="/" legacyBehavior>
          <a id="homeLink">Home</a>
        </Link>
        <Link href="/my-plants" legacyBehavior>
          <a id="myPlantsLink">My Plants</a>
        </Link>
        <Link href="/signup" legacyBehavior>
          <a id="signupLink">Sign Up</a>
        </Link>
        <Link href="/login" legacyBehavior>
          <a id="loginLink">Log In</a>
        </Link>
        {/* Add other navigation links here */}
      </nav>
    </header>
  );
};

export default Header;
