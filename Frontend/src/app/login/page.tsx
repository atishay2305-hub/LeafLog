// pages/login.tsx
"use client";

import Head from "next/head";
import { useState, FormEvent, ChangeEvent } from "react";
import styles from "./Login.module.css"; // Make sure to create a Login.module.css or reuse Signup.module.css

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
    <div className={styles.container}>
      <Head>
        <title>Login</title>
        <meta name="description" content="Log in to your account" />
      </Head>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>Log In</h1>
        <p className={styles.description}>Please log in to continue.</p>
        {/* Login form */}
        <form onSubmit={handleSubmit} id="loginForm" className={styles.form}>
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
          <button type="submit" className={styles.redirectButton}>
            Login
          </button>
        </form>
        <br />
        <br />
        <div className={styles.bottom}>
          <a className={styles.bottomText}> Dont have an account?</a>
          <button type="submit" className={styles.redirectButton}>
            <a href="http://localhost:3000/signup">Sign Up</a>
          </button>
          {/* Consider adding functionality like 'Forgot Password?' or 'Remember me' checkbox here */}
        </div>{" "}
      </div>
    </div>
  );
}
