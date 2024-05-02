export const mongoConfig = {
  serverUrl: process.env.MONGO_SERVER_URL || 'mongodb://localhost:27017',
  database: process.env.MONGO_DATABASE || 'leaflog'
};
  
