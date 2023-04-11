const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });

const DB = process.env.DB_URI_LOCAL;
const port = process.env.PORT || 3100;

const app = require('./index');

// connnect database
mongoose.connect(DB, {}).then(() => {
  () => {
    console.log('Database is connected 🤣');
  },
    (err) => {
      console.log(err);
    };
});
app.listen(port, '127.0.0.1', () => {
  console.log(`Server is up and running on ${port} 🎈`);
});
