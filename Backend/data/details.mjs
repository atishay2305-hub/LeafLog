import axios from 'axios';
import { details as detailsCollection } from '../config/mongoCollections.mjs';
import { mongoConfig } from '../config/settings.mjs';

const apiKey = "sk-1cDo65c5314199c384079";
const apiURL = 'https://perenual.com/api/species/details/2?key=sk-1cDo65c5314199c384079';

export const detailsData = async () => {
    try {
        const response = await axios.get(apiURL, {
            params: { key: apiKey },
        });

        const detailsData = response.data;
        const collection = await detailsCollection(); 
        await collection.insertOne(detailsData);

        console.log('Plant Details Data has been stored in MongoDB');
    } catch (error) {
        console.error('Error: ', error.message || (error.response && error.response.data));
    }
};

detailsData();
