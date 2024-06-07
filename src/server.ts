import app from './app';
import config from './app/config';

// Establish database connection
const startServer = async () => {
  try {
    // Start Express server
    app.listen(config.port, () => {
      console.log(`Server running on port: ${config.port}`);
    });
  } catch (error) {
    // Log if unable to connect to database
    console.error('Error starting server:', error);
  }
};

startServer();
