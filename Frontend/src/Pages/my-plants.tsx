// pages/index.tsx

import { useState, useEffect } from 'react';
import axios from 'axios';

const IndexPage = () => {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming you store the JWT token in local storage after login
        const response = await axios.get('/api/userplants', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPlants(response.data);
      } catch (error) {
        console.error('Error fetching plants:', error);
      }
    };

    fetchPlants();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">My Plants</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {plants.map((plant) => (
          <div key={plant._id} className="bg-green-200 p-4 rounded shadow">
            <h2 className="text-lg font-bold mb-2">{plant.plantSpecies}</h2>
            <p>Scientific Name: {plant.scientificName}</p>
            <p>Other Name: {plant.otherName}</p>
            <p>Cycle: {plant.cycle}</p>
            <p>Watering: {plant.watering}</p>
            <p>Sunlight: {plant.sunlight}</p>
            <p>User Email: {plant.userEmail}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndexPage;
