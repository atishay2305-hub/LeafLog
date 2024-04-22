// mongoCollections.mjs
import { dbConnection } from './mongoConnection.mjs';

const getCollection = (collectionName) => {
    let collection = null;

    return async () => {
        try {
            if (!collection) {
                const db = await dbConnection();
                collection = await db.collection(collectionName);
            }

            return collection;
        } catch (error) {
            console.error('Error getting collection:', error.message);
            throw error;
        }
    };
};

export const plants = getCollection('plants');
export const details = getCollection('details');
export const diseases = getCollection('diseases');
export const feedback = getCollection('feedback');




