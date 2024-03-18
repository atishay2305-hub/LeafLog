// pages/search/index.tsx

import Head from "next/head";
import Header from "../../components/Header";
import { useState, FormEvent, ChangeEvent } from "react";
import styles from "./Search.module.css";

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

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPlantQuery(event.target.value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    // Use the correct URL for your backend
    const backendUrl = "http://localhost:3000"; // Replace with the actual backend URL
    try {
      const response = await fetch(
        `${backendUrl}/api/plantdata/search?name=${encodeURIComponent(
          plantQuery
        )}`
      );
      if (!response.ok) {
        throw new Error("Plant not found");
      }
      const results = await response.json();
      // Assuming the backend returns an array of plants
      setSearchResults(results);
    } catch (error) {
      console.error("Searching error:", error);
      setSearchResults([]);
    }
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.searchContainer}>
          <Head>
            <title>Search Plants</title>
            <meta name="description" content="Search for a variety of plants" />
          </Head>
          <h1 className={styles.title}>Discover Plants</h1>
          <form onSubmit={handleSubmit} className={styles.searchForm}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Type and search for a plant species"
              value={plantQuery}
              onChange={handleSearchChange}
              required
            />
            <button type="submit" className={styles.searchButton}>
              Search
            </button>
          </form>
          <div className={styles.resultsContainer}>
            {searchResults.map((plant, index) => (
              <div key={index} className={styles.resultItem}>
                <h2>
                  {plant.common_name} ({plant.scientific_name})
                </h2>
                <p>{plant.other_name}</p>
                <p>{plant.cycle}</p>
                <p>{plant.watering}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
