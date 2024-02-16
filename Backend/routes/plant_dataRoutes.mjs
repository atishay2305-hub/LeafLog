import express from 'express';
import { detailsData } from '../data/details.mjs';
import { plants as plantCollection } from '../config/mongoCollections.mjs';

const router = express.Router();

router.get('/api/plantdata', async (req, res) => {
    try {
        const collection = await plantCollection();
        const allPlantData = await collection.find().toArray();

        const filteredData = allPlantData.flatMap(plant =>
            plant.data ? plant.data.map(plantEntry => ({
                common_name: plantEntry.common_name,
                scientific_name: plantEntry.scientific_name[0],
                other_name: plantEntry.other_name ? plantEntry.other_name[0] : null,
                cycle: plantEntry.cycle,
                watering: plantEntry.watering,
                sunlight: plantEntry.sunlight ? plantEntry.sunlight[0] : null,
            })) : []
        );

        res.json(filteredData);
    } catch (error) {
        console.error('Error: ', error.message);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});



router.get('/api/plantdata/search', async (req, res) => {
    try {
        const collection = await plantCollection();
        const nameQuery = req.query.name;

        if (!nameQuery) {
            return res.status(400).json({ error: 'Bad Request: Missing name query parameter' });
        }

        const searchCriteria = { 'data.common_name': new RegExp(nameQuery, 'i') };
        const searchResults = await collection.find(searchCriteria).toArray();

        if (searchResults.length > 0) {
            const result = searchResults.map(plantDoc => {
                const plantData = plantDoc.data.find(plant => plant.common_name.toLowerCase() === nameQuery.toLowerCase());

                if (plantData) {
                    return {
                        common_name: plantData.common_name,
                        scientific_name: plantData.scientific_name[0],
                        other_name: plantData.other_name ? plantData.other_name[0] : null,
                        cycle: plantData.cycle,
                        watering: plantData.watering,
                        sunlight: plantData.sunlight ? plantData.sunlight[0] : null,
                    };
                }
            }).filter(Boolean);

            if (result.length > 0) {
                // Return only the first result
                res.json(result[0]);
            } else {
                res.status(404).json({ error: 'Plant not found' });
            }
        } else {
            res.status(404).json({ error: 'Plant not found' });
        }
    } catch (error) {
        console.error('Error: ', error.message);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

router.post('/api/plantdata', async (req, res) => {
    try {
        const collection = await plantCollection();

        const newPlantData = req.body;

        if (
            // Uncomment these lines if the newPlantData and newPlantData.data checks are needed
            // !newPlantData || 
            // !newPlantData.data ||
            !newPlantData.common_name ||
            !newPlantData.scientific_name ||
            !newPlantData.cycle || 
            !newPlantData.watering ||
            !newPlantData.sunlight
        ){
            return res.status(400).json({ error: 'All parameters are required.' });
        }

        const result = await collection.insertOne(newPlantData);
        res.status(201).json({ success: true, insertedId: result.insertedId });

    } catch (error) {
        console.error('Error: ', error.message);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});




router.get('/api/plantdata/:id', async (req, res) => {
    try {
        const apiKey = "sk-1cDo65c5314199c384079";
        const plantId = req.params.id;

        const apiURL = `https://perenual.com/api/species/details/${plantId}?key=${apiKey}`;

        const response = await axios.get(apiURL, {
            params: { key: apiKey },
        });

        const detailsData = response.data;
        const collection = await detailsCollection();
        await collection.insertOne(detailsData);

        console.log('Plant Details Data has been stored in MongoDB');

        res.status(200).json({ message: 'Plant details stored successfully' });
    } catch (error) {
        console.error('Error: ', error.message || (error.response && error.response.data));
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



export default router;
