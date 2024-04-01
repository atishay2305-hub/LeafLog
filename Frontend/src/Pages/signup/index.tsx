import Head from "next/head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useState, FormEvent, ChangeEvent } from "react";
import styles from "./Signup.module.css";
import { useRouter } from 'next/router'; // Import useRouter from Next.js
import "../../style.css";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const router = useRouter(); // Initialize the Next.js router

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Send signup request to the server
      const res = await fetch("/signup", { // Adjust the route as needed
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const contentType = res.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        const data = await res.json();
        if (data.error) {
          console.error("Signup error:", data.error);
        } else {
          console.log("User signed up successfully:", data);
          // Redirect the user to the login page upon successful signup
          router.push('/login'); // Use Next.js router to navigate
        }
      } else {
        // Handle non-JSON error responses
        const text = await res.text();
        console.error("Failed to sign up:", text);
      }
    } catch (error) {
      console.error("An error occurred while signing up:", error);
    }
  };

  const handleGoogleSignUp = () => {
    window.location.href = "/google"; // Your backend endpoint for Google OAuth
  };

  return (
    <>
      <Header />
      <div className="home">
        <div className="top-level">
          <div className={styles.container}>
            <Head>
              <title>Sign Up</title>
              <meta name="description" content="Sign up for a new account" />
            </Head>
            <h1 className={styles.title}>Sign Up</h1>
            <p className={styles.description}>Please sign up to continue.</p>
            <form
              onSubmit={handleSubmit}
              id="signupForm"
              className={styles.form}
            >
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={styles.inputField}
                placeholder="Email"
                required
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={styles.inputField}
                placeholder="Password"
                required
              />
              <button type="submit" className={styles.button}>
                Sign Up
              </button>
            </form>
            <div className={styles.bottom}>
              <button onClick={handleGoogleSignUp} className={styles.button}>
                Sign Up with Google
              </button>
              <br />
              <p className={styles.bottomText}>Have an account?</p>
              <a href="/login" className={styles.redirectButton}>
                Login
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
