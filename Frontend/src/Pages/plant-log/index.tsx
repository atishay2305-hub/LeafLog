// pages/plant-log.tsx
import Head from "next/head";
import Header from "../../components/Header";
import { useState, FormEvent } from "react";
import styles from "./plant-log.module.css";

export default function PlantLog() {
  const [plantSpecies, setPlantSpecies] = useState("");
  const [petName, setPetName] = useState("");
  const [otherNotes, setOtherNotes] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    // Construct the form data payload
    const plantLogEntry = { plantSpecies, petName, otherNotes };
    // Submit the form data to your API route
    const response = await fetch("/api/submit-plant-log", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(plantLogEntry),
    });
    // Handle the response from your API route
    const data = await response.json();
    if (response.ok) {
      // Do something with the successful response
    } else {
      // Handle errors
    }
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <Head>
          <title>Log your plants!</title>
          <meta name="description" content="Log in to your account" />
        </Head>
        <form onSubmit={handleSubmit}>
          <h1>Log your plants!</h1>
          {/* Add your input fields and submit button here */}
          {/* ... */}
        </form>
      </div>
    </>
  );
}
