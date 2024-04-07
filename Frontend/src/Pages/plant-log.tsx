import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import React, { useState, FormEvent } from "react";
import './plant-log.css'; // Assuming it's a regular CSS file

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
    <form className="form"> {/* Removed `styles.` prefix */}
      {items.map((item, index) => (
        <div key={index} className="flex flex-col">
          <label htmlFor={item.label} className="label"> {/* Removed `styles.` prefix */}
            {item.label}
          </label>
          {item.type === "text" && (
            <input
              type="text"
              id={item.label}
              name={item.label}
              value={item.value}
              onChange={
                item.onChange as React.ChangeEventHandler<HTMLInputElement>
              }
              className="input"
              placeholder={item.placeholder}
            />
          )}
          {item.type === "textarea" && (
            <textarea
              id={item.label}
              name={item.label}
              value={item.value}
              onChange={
                item.onChange as React.ChangeEventHandler<HTMLTextAreaElement>
              }
              className="input" 
              placeholder={item.placeholder}
            />
          )}
        </div>
      ))}
      <br />
      <button type="submit" className="button"> 
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
          <div className="container"> 
            {" "}
            <Head>
              <title>Log Your Plant</title>
              <meta name="description" content="Create a new plant log entry" />
            </Head>
            <h1 className="title">Create Plant Log Entry</h1> 
            <br />
            <form onSubmit={handleSubmit} className="form"> 
              <label htmlFor="plantSpecies" className="label"> 
                Plant Species
              </label>
              <input
                type="text"
                id="plantSpecies"
                name="plantSpecies"
                value={plantSpecies}
                onChange={(e) => setPlantSpecies(e.target.value)}
                className="input" 
                placeholder="Type and search for a plant species"
                required
              />

              <label htmlFor="petName" className="label">
                Pet Name
              </label>
              <input
                type="text"
                id="petName"
                name="petName"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                className="input" 
                placeholder="What do you call your plant?"
              />

              <label htmlFor="otherNotes" className="label"> {/* Removed `styles.` prefix */}
                Other Notes
              </label>
              <textarea
                id="otherNotes"
                name="otherNotes"
                value={otherNotes}
                onChange={(e) => setOtherNotes(e.target.value)}
                className="inputField" // Changed class for textarea to use inputField for better spacing
                placeholder="Any special care instructions or notes?"
              />

              <button type="submit" className="button"> {/* Removed `styles.` prefix */}
                Submit Log Entry
              </button>
            </form>
          </div>
        </div>
      </div>
      {submittedDataList.map((data, index) => (
        <div key={index} className="submittedBox"> {/* Removed `styles.` prefix */}
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
