// pages/search/index.tsx

import Head from "next/head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
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
      </div>{" "}
      
      <Footer />
    </>
  );
}
