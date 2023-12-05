import server from './app/routes/index.js';
import keys from './app/config/keys.js';
import MongoConnection from './app/config/database.js';

const Port = keys.port

async function start() {
  try {
    await MongoConnection();
    server.listen(Port, () => {
      logger.info(`Server started on port ${Port}`);
    });
  } catch (error) {
    logger.error(`Error starting server: ${error.message}`);
  }
}

start();
