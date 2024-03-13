import axios from 'axios';
import { plants as plantCollection, details as detailsCollection } from '../config/mongoCollections.mjs';

const plantApiKey = "sk-1cDo65c5314199c384079";
const plantApiURL = 'https://perenual.com/api/species-list';

const detailsApiKey = "sk-1cDo65c5314199c384079";
const detailsApiURL = 'https://perenual.com/api/species/details/2';

export const plant_data = async () => {
    try {
        const plantResponse = await axios.get(plantApiURL, {
            params: { key: plantApiKey },
        });

        const plantData = plantResponse.data;
        const plantCollectionRef = await plantCollection();

        if (Array.isArray(plantData)) {
            await plantCollectionRef.insertMany(plantData);
            console.log(`${plantData.length} documents have been stored in MongoDB`);
        } else {
            console.error('Error: The data received from the Plants API is not an array.');
        }
    } catch (error) {
        console.error('Error: ', error.message || (error.response && error.response.data));
    }
};

export const detailsData = async () => {
    try {
        const detailsResponse = await axios.get(detailsApiURL, {
            params: { key: detailsApiKey },
        });

        const detailsData = detailsResponse.data;
        const detailsCollectionRef = await detailsCollection(); 
        await detailsCollectionRef.insertOne(detailsData);

        console.log('Plant Details Data has been stored in MongoDB');
    } catch (error) {
        console.error('Error: ', error.message || (error.response && error.response.data));
    }
};

plant_data();
detailsData();
