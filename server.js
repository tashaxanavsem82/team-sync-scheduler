const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
// Middleware to enable CORS
app.use(cors());
// Middleware to parse JSON request bodies
app.use(express.json());

// Define the port to run the server on
const PORT = process.env.PORT || 5000;

// Connect to MongoDB using MONGODB_URI from environment variables
// Using { useNewUrlParser: true, useUnifiedTopology: true } to avoid deprecation warnings
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Sample route to check if API is running
app.get('/api', (req, res) => {
  res.send('API is running');
});

// Error handling middleware for catching errors and responding to client
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});