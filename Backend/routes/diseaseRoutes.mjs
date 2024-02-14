// Import necessary modules and functions
import express from 'express';
import { diseases } from '../config/mongoCollections.mjs';

const router = express.Router();

// Define a route to get disease data
router.get('/api/diseasedata', async (req, res) => {
    try {
        const collection = await diseases();
        const allDiseaseData = await collection.find().toArray();
        const filteredData = allDiseaseData.flatMap(disease => disease.data.map(disease => ({
            common_name: disease.common_name,
            scientific_name: disease.scientific_name[0],
            other_name: disease.other_name ? disease.other_name[0] : null,
            family: disease.family,
            description: disease.description,
            host: disease.host
        })))
        res.json(filteredData);
    } catch (error) {
        console.error('Error: ', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
