// page/signup.tsx
"use client";

import Head from "next/head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useState, FormEvent, ChangeEvent } from "react";
import styles from "./Signup.module.css";

export default function SignupPage() {
  // Client-side state for the sign-up form
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
      const res = await fetch("../../pages/api/signup.tsx", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Check if the response is ok and the content is JSON
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      if (
        res.ok &&
        res.headers.get("Content-Type")?.includes("application/json")
      ) {
        const data = await res.json();
        if (data.error) {
          console.error("Signup error:", data.error);
          // Implement error handling logic
        } else {
          console.log("User signed up successfully:", data);
          // Redirect user or show success message
        }
      } else {
        // Handle non-JSON response or non-ok status
        const text = await res.text(); // Read the response as text
        console.error("Failed to sign up:", text);
        // Show the text or a error message to the user
      }
    } catch (error) {
      console.error("An error occurred while signing up:", error);
      // Implement network error handling logic
    }
  };

  // Redirect user to Google OAuth flow
  const handleGoogleSignUp = () => {
    window.location.href = "/auth/google"; // Your backend endpoint for Google OAuth
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.formWrapper}>
          <h1 className={styles.title}>Sign Up</h1>
          <p className={styles.description}>Please sign up to continue.</p>

          {/* Sign up form */}
          <form onSubmit={handleSubmit} id="signupForm" className={styles.form}>
            <input
              className={styles.inputField}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />

            <input
              className={styles.inputField}
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
            <button
              type="submit"
              id="buttonStyle"
              className={styles.redirectButton}
            >
              Sign Up
            </button>
          </form>
        </div>{" "}
        <div className={styles.bottom}>
          {/* Google OAuth sign up */}
          <button
            onClick={handleGoogleSignUp}
            className={styles.googleSignupButton}
          >
            Sign Up with Google
          </button>
          <br />
          <br />

          <a className={styles.bottomText}>Have an account?</a>

          <button type="submit" className={styles.redirectButton}>
            <a href="http://localhost:3000/login">Login</a>
          </button>
        </div>
      </div>{" "}
      <Footer />
    </>
  );
}
