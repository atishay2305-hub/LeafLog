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

export const getPlantCommonNames = async () => {
    try {
        const plantCollectionRef = await plantCollection();
        const plants = await plantCollectionRef.find({}, { common_name: 1 }).toArray();
        const commonNames = plants.map(plant => plant.common_name);
        return commonNames;
    } catch (error) {
        console.error('Error: ', error.message);
        return [];
    }
};


export const getScientificNames = async () => {
    try {
        const plantCollectionRef = await plantCollection();
        const plants = await plantCollectionRef.find({}, {scientific_name: 1}).toArray();
        const scientificNames = plants.map(plant => plant.scientific_name);
        return scientificNames;
    } catch(error){
        console.error('Error:', error.message);
        return [];
    }
}




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

export const getPlantDetailsByCommonName = async (commonName) => {
    try {
        const plantCollectionRef = await plantCollection();
        const plantDetails = await plantCollectionRef.findOne({ common_name: commonName });
        return plantDetails;
    } catch (error) {
        console.error('Error:', error.message);
        return null;
    }
};

export const getPlantDetailsByScientificName = async (scientificName) => {
    try {
        const plantCollectionRef = await plantCollection();
        const plantDetails = await plantCollectionRef.findOne({ scientific_name: scientificName });
        return plantDetails;
    } catch (error) {
        console.error('Error:', error.message);
        return null;
    }
};


export const getAllOtherNames = async () => {
    try {
        const detailsCollectionRef = await detailsCollection();
        const details = await detailsCollectionRef.find({}, { other_name: 1 }).toArray();
        const otherNames = details.map(detail => detail.other_name);
        return otherNames;
    } catch (error) {
        console.error('Error:', error.message);
        return [];
    }
};

export const getAllFamilies = async () => {
    try {
        const detailsCollectionRef = await detailsCollection();
        const details = await detailsCollectionRef.find({}, { family: 1 }).toArray();
        const families = details.map(detail => detail.family);
        return families;
    } catch (error) {
        console.error('Error:', error.message);
        return [];
    }
};

export const getAllOrigins = async () => {
    try {
        const detailsCollectionRef = await detailsCollection();
        const details = await detailsCollectionRef.find({}, { origin: 1 }).toArray();
        const origins = details.flatMap(detail => detail.origin || []);
        return origins;
    } catch (error) {
        console.error('Error:', error.message);
        return [];
    }
};



plant_data();
detailsData();
