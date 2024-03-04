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
    console.log({ plantSpecies, petName, otherNotes });
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
        {" "}
        <Head>
          <title>Log Your Plant</title>
          <meta name="description" content="Create a new plant log entry" />
        </Head>
        <h1 className={styles.title}>Create Plant Log Entry</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="plantSpecies" className={styles.label}>
            Plant Species
          </label>
          <input
            type="text"
            id="plantSpecies"
            name="plantSpecies"
            value={plantSpecies}
            onChange={(e) => setPlantSpecies(e.target.value)}
            className={styles.input}
            placeholder="Type and search for a plant species"
            required
          />
          {/* Placeholder for search functionality */}

          <label htmlFor="petName" className={styles.label}>
            Pet Name
          </label>
          <input
            type="text"
            id="petName"
            name="petName"
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
            className={styles.input}
            placeholder="What do you call your plant?"
          />

          <label htmlFor="otherNotes" className={styles.label}>
            Other Notes
          </label>
          <textarea
            id="otherNotes"
            name="otherNotes"
            value={otherNotes}
            onChange={(e) => setOtherNotes(e.target.value)}
            className={styles.inputField} // Changed class for textarea to use inputField for better spacing
            placeholder="Any special care instructions or notes?"
          />

          <button type="submit" className={styles.button}>
            Submit Log Entry
          </button>
        </form>
      </div>
    </>
  );
}
