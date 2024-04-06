// pages/plant-log.tsx

import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import React, { useState, FormEvent } from "react";

import styles from "./getting-started.module.css";

interface SubmittedData {
  plantSpecies: string;
  petName: string;
  otherNotes: string;
}

interface PlantLogItem {
  label: string;
  placeholder: string;
  type: "text" | "textarea";
  value: string;
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
}

const PlantLogForm: React.FC<{ items: PlantLogItem[] }> = ({ items }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg">
    <form className={styles.form}>
      {items.map((item, index) => (
        <div key={index} className="flex flex-col">
          <label htmlFor={item.label} className={styles.label}>
            {item.label}
          </label>
          {item.type === "text" && (
            <input
              type="text"
              id={item.label}
              name={item.label}
              value={item.value}
              // Use the input event type here
              onChange={
                item.onChange as React.ChangeEventHandler<HTMLInputElement>
              }
              className={styles.input}
              placeholder={item.placeholder}
            />
          )}
          {item.type === "textarea" && (
            <textarea
              id={item.label}
              name={item.label}
              value={item.value}
              // Use the textarea event type here
              onChange={
                item.onChange as React.ChangeEventHandler<HTMLTextAreaElement>
              }
              className={styles.input}
              placeholder={item.placeholder}
            />
          )}
        </div>
      ))}
      <br />
      <button type="submit" className={styles.button}>
        Submit Log Entry
      </button>
    </form>
  </div>
);

export default function PlantLog() {
  const [plantSpecies, setPlantSpecies] = useState("");
  const [petName, setPetName] = useState("");
  const [otherNotes, setOtherNotes] = useState("");
  const [submittedDataList, setSubmittedDataList] = useState<SubmittedData[]>(
    []
  );

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // Append the new entry to the submitted data list
    setSubmittedDataList((prevList) => [
      ...prevList,
      { plantSpecies, petName, otherNotes },
    ]);
    // Reset the form fields
    setPlantSpecies("");
    setPetName("");
    setOtherNotes("");
  };

  return (
    <>
      <Header />
      <div className="home">
        <div className="top-level">
          <div className={styles.container}>
            {" "}
            <Head>
              <title>Log Your Plant</title>
              <meta name="description" content="Create a new plant log entry" />
            </Head>
            <h1 className={styles.title}>Create Plant Log Entry</h1>
            <br />
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
        </div>
      </div>
      {submittedDataList.map((data, index) => (
        <div key={index} className={styles.submittedBox}>
          <h2>Submitted Information:</h2>
          <p>Plant Species: {data.plantSpecies}</p>
          <p>Pet Name: {data.petName}</p>
          <p>Other Notes: {data.otherNotes}</p>
        </div>
      ))}
      <Footer />
    </>
  );
}
