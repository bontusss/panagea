const dotenv = require('dotenv');
const connectDB = require('./utils/connectDB');

dotenv.config({ path: './config.env' });

// handle failed synchronoous requests
process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  process.exit(1);
});
  
const app = require('./index');

// connnect database
connectDB();

// Start server
const port = process.env.PORT || 3000;
const server = app.listen(port, '127.0.0.1', () => {
  console.log(`Server is up and running on ${port} 🎈`);
});

// handle failed promises
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION! Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});
