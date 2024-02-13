// main file
import axios from 'axios';
import { details as detailsCollection } from '../config/mongoCollections.mjs';
import { mongoConfig } from '../config/settings.mjs';

const apiKey = "sk-1cDo65c5314199c384079";

// TODO: Below I have entered "2" manually, so it should be taken from user from req.params.id
const apiURL = 'https://perenual.com/api/species/details/2?key=sk-1cDo65c5314199c384079';

const fetchData = async () => {
    try {
        const response = await axios.get(apiURL, {
            params: {key: apiKey},
        });

        const detailsData = response.data;
        const collection = await detailsCollection(); // Call the function to get the collection
        await collection.insertOne(detailsData);

        console.log('Plant Details Data has been stored in MongoDB');
    } catch (error) {
        console.error('Error: ', error.message || (error.response && error.response.data));
    }
};

fetchData();
