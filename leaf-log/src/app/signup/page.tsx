// page/signup.tsx
"use client";

import Head from "next/head";
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
      const res = await fetch("/api/signup", {
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
        // Redirect user or show success message
        console.log("User signed up successfully:", data);
      }
    } catch (error) {
      console.error("An error occurred while signing up:", error);
      // Implement error handling logic, perhaps show an error message to the user
    }
  };

  // Redirect user to Google OAuth flow
  const handleGoogleSignUp = () => {
    window.location.href = "/auth/google"; // Your backend endpoint for Google OAuth
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Sign Up</title>
        <meta name="description" content="Sign up for our service" />
      </Head>
      <h1 className={styles.title}>Sign Up</h1>
      <p>Please sign up to continue.</p>
      {/* Sign up form */}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      {/* Google OAuth sign up */}
      <button onClick={handleGoogleSignUp}>Sign Up with Google</button>
    </div>
  );
}
