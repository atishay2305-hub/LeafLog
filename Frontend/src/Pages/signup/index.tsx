"use client";

import Head from "next/head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useState, FormEvent, ChangeEvent } from "react";
import styles from "./Signup.module.css";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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
      const res = await fetch("../../pages/api/signup.tsx", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

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
        } else {
          console.log("User signed up successfully:", data);
        }
      } else {
        const text = await res.text(); 
        console.error("Failed to sign up:", text);
      }
    } catch (error) {
      console.error("An error occurred while signing up:", error);
    }
  };

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
