const express = require('express');    // Import the Express library
const app = express();    // Create an instance of the Express application

app.get('/', (req, res) => {    // Define a route for the root URL, req and res are the request and response objects
  res.send('Hello, World!');        // Send a response back to the client with the message "Hello, World!"
});

app.get('/about', (req, res) => {               // Define a route for the "/about" URL
  res.send(`This is the about page. Hey ${req.query.name || 'Guest'}!`);  // Send a response back to the client with a message that includes the name query parameter if provided, or "Guest" if not provided  
});

app.listen(3000, () => {     // Start the server and listen on port 3000
  console.log('Server is running on port 3000');    // Log a message to the console when the server is successfully started
});