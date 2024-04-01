import Head from "next/head";
import Header from "../../components/Header";
import { useState, FormEvent, ChangeEvent } from "react";
import styles from "./Search.module.css"; // Make sure to create a Login.module.css or reuse Signup.module.css

export default function Search() {
  const [plantQuery, setPlantQuery] = useState("");

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPlantQuery(event.target.value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    // Use plantQuery to make API call to search for plants
    console.log("Searching for:", plantQuery);
    // Implement the search functionality here
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
        </div>
      </div>
    </>
  );
}
