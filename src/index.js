import server from './app/routes/index';
import keys from './app/config/keys';
import MongoConnection from './app/config/database'

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
