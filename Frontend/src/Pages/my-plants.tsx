import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import Cookies library to work with cookies
import Header from "../components/Header";
import Footer from "../components/Footer";

const IndexPage = () => {
  const [plants, setPlants] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const tokenFromCookie = Cookies.get('token'); // Get JWT token from cookie
        console.log(tokenFromCookie); // Log the token to the console
        if (!tokenFromCookie) {
          throw new Error('Token not found.');
        }

        const response = await axios.get('http://localhost:5002/userplants', {
          headers: {
            Authorization: `Bearer ${tokenFromCookie}`,
          },
        });
        setPlants(response.data);
      } catch (error) {
        console.error('Error fetching plants:', error);
        setError(error); // Set error state to the detailed error object
      }
    };

    fetchPlants();
  }, []);

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">My Plants</h1>
        {error && <div className="text-red-500">Error: {error.message}</div>} {/* Display error message if there's an error */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {plants.map((plant) => (
            <div key={plant._id} className="bg-green-200 p-4 rounded shadow">
              <h2 className="text-lg font-bold mb-2">{plant.plantSpecies}</h2>
              <p>Scientific Name: {plant.scientificName}</p>
              <p>Other Name: {plant.otherName}</p>
              <p>Cycle: {plant.cycle}</p>
              <p>Watering: {plant.watering}</p>
              <p>Sunlight: {plant.sunlight}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default IndexPage;
