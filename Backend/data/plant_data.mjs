// main file
import axios from 'axios';
import { plants as plantCollection } from '../config/mongoCollections.mjs';
import { mongoConfig } from '../config/settings.mjs';

const apiKey = "sk-1cDo65c5314199c384079";
const apiURL = 'https://perenual.com/api/species-list';

const fetchData = async () => {
    try {
        const response = await axios.get(apiURL, {
            params: {key: apiKey},
        });

        const plantData = response.data;
        const collection = await plantCollection(); // Call the function to get the collection
        await collection.insertOne(plantData);

        console.log('Data has been stored in MongoDB');
    } catch (error) {
        console.error('Error: ', error.message || (error.response && error.response.data));
    }
};

fetchData();
