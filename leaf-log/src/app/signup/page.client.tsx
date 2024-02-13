"use client";
import { useState, FormEvent, ChangeEvent } from "react";

// This is the client component which handles the interactive sign-up form.
// It will be rendered on the client-side and can use browser APIs and features like React state hooks.

export default function SignupClient() {
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission, e.g., post to an API
    console.log(formData);
  };
  return (
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
      {/* Add other inputs as needed */}
      <button type="submit">Sign Up</button>
    </form>
  );
}
