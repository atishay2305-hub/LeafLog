import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Header from "../components/Header";
import Footer from "../components/Footer";

const IndexPage = () => {
  const [plants, setPlants] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const tokenFromCookie = Cookies.get('token');
        console.log(tokenFromCookie);
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
        setError(error);
      }
    };

    fetchPlants();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="container mx-auto p-4 flex-grow">
        <h1 className="text-3xl font-bold mb-4">My Plants</h1>
        <div className="text-green-600 mb-4">To add a plant, go to the Log A Plant or Search page.</div>
        {error && <div className="text-red-500">Error: {error.message}</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {plants.map((plant) => (
            <div key={plant._id} className="bg-green-300 p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-2">{plant.plantSpecies}</h2>
              <p>Scientific Name: {plant.scientificName}</p>
              <p>Other Name: {plant.otherName}</p>
              <p>Cycle: {plant.cycle}</p>
              <p>Watering: {plant.watering}</p>
              <p>Sunlight: {plant.sunlight}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default IndexPage;
