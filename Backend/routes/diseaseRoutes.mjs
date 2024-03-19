import express from 'express';
import { diseases } from '../config/mongoCollections.mjs';

const router = express.Router();


router.get('/api/diseasedata', async (req, res) => {
    try {
        const collection = await diseases();
        const allDiseaseData = await collection.find().toArray();

        const filteredData = allDiseaseData.flatMap(disease =>
            disease.data ? disease.data.map(diseaseEntry => ({
                common_name: diseaseEntry.common_name,
                scientific_name: diseaseEntry.scientific_name[0],
                other_name: diseaseEntry.other_name ? diseaseEntry.other_name[0] : null,
                family: diseaseEntry.family,
                description: diseaseEntry.description,
                host: diseaseEntry.host
            })) : []
        );

        const first100Records = filteredData.slice(0, 100);
        res.json(first100Records);
    } catch (error) {
        console.error('Error: ', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


export default router;
