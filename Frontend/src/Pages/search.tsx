// pages/search/index.tsx

import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState, FormEvent, ChangeEvent } from "react";
import styles from './search.module.css';
import "./index.module.css";

// Define the interface for our plant objects
interface Plant {
  common_name: string;
  scientific_name: string;
  other_name?: string;
  cycle?: string;
  watering?: string;
  sunlight?: string;
  description?: string; // Assuming you have a description field
  // add any additional fields that you expect from the API
}

export default function Search() {
  const [plantQuery, setPlantQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(false); // For tracking loading state
  const [error, setError] = useState<string | null>(null); // For tracking error state

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPlantQuery(event.target.value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null); // Reset error state on new submission
    setLoading(true); // Start loading

    try {
      const response = await fetch(
        `http://localhost:3000/api/plantdata/search?name=${encodeURIComponent(
          plantQuery
        )}`
      );

      // Assuming the server returns a non-200 response for not found
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("No plants found matching your query.");
        }
        throw new Error("An error occurred while searching.");
      }

      const results = await response.json();
      setSearchResults(results);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message); // Store the error message
      } else {
        setError("An unexpected error occurred."); // Fallback for non-Error throwables
      }
    } finally {
      setLoading(false); // End loading whether or not an error occurred
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
            <h1 className={styles.title}>Discover Plants</h1>
            <br />
            <form onSubmit={handleSubmit} className={styles.form}>
              <input
                type="text"
                id="plantQuery"
                name="plantQuery"
                value={plantQuery}
                onChange={handleSearchChange}
                className={styles.searchInput} // Reused input style
                placeholder="Type and search for a plant species"
                required
              />
              <br />
              <button type="submit" className={styles.button}>
                {" "}
                {/* Reused button style */}
                Search
              </button>
            </form>
            {/* Results styling needs to be added or reused accordingly */}
            <div className={styles.resultsContainer}>
              {" "}
              {/* Updated to match plant-log styles */}
              {searchResults.map((plant, index) => (
                <div key={index} className={styles.resultItem}>
                  {" "}
                  {/* Updated to match plant-log styles */}
                  {/* ... display plant details ... */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
