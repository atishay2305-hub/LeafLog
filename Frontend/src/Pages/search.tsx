// search.tsx

import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState, FormEvent, ChangeEvent } from "react";
import styles from './search.module.css';

interface Plant {
  common_name: string;
  scientific_name: string;
  other_name?: string;
  cycle?: string;
  watering?: string;
  sunlight?: string;
  description?: string;
}

export default function Search() {
  const [plantQuery, setPlantQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPlantQuery(event.target.value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:3000/api/plantdata/search?name=${encodeURIComponent(
          plantQuery
        )}`
      );

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
        setError(e.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Search Plants</title>
      </Head>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.title}>Discover Plants</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            value={plantQuery}
            onChange={handleSearchChange}
            className={styles.searchInput}
            placeholder="Type and search for a plant species"
            required
          />
          <button type="submit" className={styles.button}>
            Search
          </button>
        </form>
        <div className={styles.resultsContainer}>
          {searchResults.map((plant, index) => (
            <div key={index} className={styles.resultItem}>
              <h2>{plant.common_name}</h2>
              <p>Scientific Name: {plant.scientific_name}</p>
              <p>Other Name: {plant.other_name}</p>
              {/* Additional plant details can be displayed here */}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
