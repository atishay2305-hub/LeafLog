import express from 'express';
import { plant_data } from '../data/plant_data.mjs';
import { plants as plantCollection } from '../config/mongoCollections.mjs';

const router = express.Router();

router.get('/api/plantdata', async (req, res) => {
    try {
        const collection = await plantCollection();
        const allPlantData = await collection.find().toArray();

        const filteredData = allPlantData.flatMap(plant => plant.data.map(plant => ({
            common_name: plant.common_name,
            scientific_name: plant.scientific_name[0],
            other_name: plant.other_name ? plant.other_name[0] : null,
            cycle: plant.cycle,
            watering: plant.watering,
            sunlight: plant.sunlight ? plant.sunlight[0] : null,
        })));

        res.json(filteredData);
    } catch (error) {
        console.error('Error: ', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
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
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



export default router;
