// main file
import axios from 'axios';
import { diseases as diseasesCollection } from '../config/mongoCollections.mjs';
import { mongoConfig } from '../config/settings.mjs';

const apiKey = "sk-1cDo65c5314199c384079";
const apiURL = 'https://perenual.com/api/pest-disease-list?key=sk-1cDo65c5314199c384079';

const fetchData = async () => {
    try {
        const response = await axios.get(apiURL, {
            params: {key: apiKey},
        });

        const diseaseData = response.data;
        const collection = await diseasesCollection(); // Call the function to get the collection
        await collection.insertOne(diseaseData);

        console.log('Disease Data has been stored in MongoDB');
    } catch (error) {
        console.error('Error: ', error.message || (error.response && error.response.data));
    }
};

fetchData();
