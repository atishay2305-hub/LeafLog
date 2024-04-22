import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Router from 'next/router';

const IndexPage = () => {
  const [plants, setPlants] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const tokenFromCookie = Cookies.get('token');
    if (!tokenFromCookie) {
      // Redirect user to login page if token is not found
      Router.push('/login');
      return;
    }

    const fetchPlants = async () => {
      try {
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

  const viewPlantDetails = async (commonName) => {
    try {
      const response = await axios.get(`http://localhost:5002/api/plantdata/details?common_name=${commonName}`);
      const plantDetails = response.data;
      // Display plant details here (e.g., show in a modal)
      console.log("Plant Details:", plantDetails);
    } catch (error) {
      console.error('Error fetching plant details:', error);
      // Show toast message for no matching details
      alert('No details match for this plant.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="container mx-auto p-4 flex-grow">
        <h1 className="text-3xl font-bold mb-4">My Plants</h1>
        <div className="text-green-600 mb-4">To add a plant, go to the Log A Plant or Search page.</div>
        {error && <div className="text-red-500">Error: {error.message}</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {plants.map((plant) => (
            <div key={plant._id} className="bg-green-300 p-6 rounded-lg shadow-lg cursor-pointer" onClick={() => viewPlantDetails(plant.common_name)}>
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
