import { MongoClient } from 'mongodb';
import { mongoConfig } from './settings.mjs';

let _connection = undefined;
let _db = undefined;

const dbConnection = async () => {
  if (!_connection) {
    _connection = await MongoClient.connect(mongoConfig.serverUrl);
    _db = _connection.db(mongoConfig.database);
  }

  return _db;
};

const closeConnection = async () => {
  if (_connection) {
    await _connection.close();
  }
};

export { dbConnection, closeConnection };
