import { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import axios from 'axios';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './search.module.css';
import Cookies from 'js-cookie';
import Router from 'next/router';

interface Plant {
  _id: string;
  common_name: string;
  scientific_name: string;
  other_name?: string;
}

export default function Search() {
  const [plantQuery, setPlantQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Plant[] | null>(null);
  const [allPlants, setAllPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      Router.push('/login');
    } else {
      const fetchAllPlants = async () => {
        setLoading(true);
        try {
          const response = await axios.get('http://localhost:5002/api/plantdata');
          setAllPlants(response.data);
        } catch (error) {
          setError('An error occurred while fetching plant data.');
        } finally {
          setLoading(false);
        }
      };
  
      fetchAllPlants();
    }
  }, []);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPlantQuery(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await axios.get(
        `http://localhost:5002/api/plantdata/search/common_name?name=${encodeURIComponent(plantQuery)}`
      );

      const results = response.data;
      setSearchResults(results);
    } catch (e: any) {
      if (e.response && e.response.status === 404) {
        setError("No plants found matching your query.");
      } else {
        setError("An error occurred while searching.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddToLog = (plant: Plant) => {
    // Navigate to the PlantLog page with plant data
    Router.push({
      pathname: '/plant-log',
      query: { plantId: plant._id, commonName: plant.common_name, scientificName: plant.scientific_name }
    });
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
          <h2>Search Results</h2>
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {Array.isArray(searchResults) && searchResults.map((plant, index) => (
            <div key={index} className={styles.resultItem}>
              <h3>{plant.common_name}</h3>
              <p>Scientific Name: {plant.scientific_name}</p>
              {plant.other_name && <p>Other Name: {plant.other_name}</p>}
              <button onClick={() => handleAddToLog(plant)}>Add to Log</button>
            </div>
          ))}
        </div>
        <div className={styles.resultsContainer}>
          <h2>All Plants</h2>
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {allPlants.map((plant, index) => (
            <div key={index} className={styles.resultItem}>
              <h3>{plant.common_name}</h3>
              <p>Scientific Name: {plant.scientific_name}</p>
              {plant.other_name && <p>Other Name: {plant.other_name}</p>}
              <button onClick={() => handleAddToLog(plant)}>Add to Log</button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
