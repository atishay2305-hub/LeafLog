// pages/login.tsx
"use client";

import Head from "next/head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useState, FormEvent, ChangeEvent } from "react";
import styles from "./Login.module.css"; // Make sure to create a Login.module.css or reuse Signup.module.css
import "../../style.css";

export default function LoginPage() {
  // Client-side state for the login form
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Update form state on user input
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handle form submission by sending data to the server
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.error) {
        console.error(data.error);
        // Implement error handling logic, perhaps show an error message to the user
      } else {
        // Redirect user to their dashboard or previous page
        console.log("User logged in successfully:", data);
        // Redirect logic here...
      }
    } catch (error) {
      console.error("An error occurred while logging in:", error);
      // Implement error handling logic, perhaps show an error message to the user
    }
  };

  return (
    <>
      <Header />
      <div className="home">
        {" "}
        <div className="top-level">
          {" "}
          <div className={styles.container}>
            {" "}
            {/* Reused className for the form container */}
            <Head>
              <title>Login</title>
              <meta name="description" content="Log in to your account" />
            </Head>
            <h1 className={styles.title}>Log In</h1>
            <p className={styles.description}>Please log in to continue.</p>
            <form
              onSubmit={handleSubmit}
              id="loginForm"
              className={styles.form}
            >
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={styles.inputField} // Reused input style
                placeholder="Email"
                required
              />

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={styles.inputField} // Reused input style
                placeholder="Password"
                required
              />
              <button type="submit" className={styles.button}>
                Login
              </button>
            </form>
            <div className={styles.bottom}>
              <br />
              <p className={styles.bottomText}>Don't have an account?</p>
              <a
                href="http://localhost:3000/signup"
                className={styles.redirectButton}
              >
                Sign Up
              </a>

              {/* Consider adding functionality like 'Forgot Password?' or 'Remember me' checkbox here */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
