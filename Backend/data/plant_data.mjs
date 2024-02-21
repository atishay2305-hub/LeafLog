import axios from 'axios';
import { plants as plantCollection } from '../config/mongoCollections.mjs';

const apiKey = "sk-1cDo65c5314199c384079";
const apiURL = 'https://perenual.com/api/species-list';

export const plant_data = async () => {
    try {
        const response = await axios.get(apiURL, {
            params: { key: apiKey },
        });

        const plantData = response.data;
        const collection = await plantCollection();

        if (Array.isArray(plantData)) {
            await collection.insertMany(plantData);
            console.log(`${plantData.length} documents have been stored in MongoDB`);
        } else {
            console.error('Error: The data received from the API is not an array.');
        }
    } catch (error) {
        console.error('Error: ', error.message || (error.response && error.response.data));
    }
};

// Call the function asynchronously
plant_data();
