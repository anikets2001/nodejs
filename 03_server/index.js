const fs = require('fs');      // Import the built-in 'fs' module for file system operations   
const http = require('http');  // Import the built-in 'http' module to create an HTTP server

const myServer = http.createServer((req, res) => {          // Create an HTTP server and define a callback function that will be executed for each incoming request. The callback function takes two parameters: 'req' (the request object) and 'res' (the response object).
    const log = `${Date.now().toLocaleString()} - Request URL: ${req.url}\n New Request Received\n`;        // Create a log string that includes the current date and time, the requested URL, and a message indicating that a new request has been received. The log string is formatted with a newline character at the end for better readability in the log file.
    fs.appendFile('log.txt', log, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });

    // Check the requested URL and send an appropriate response based on the URL. If the URL is '/', send "HomePage". If the URL is '/about', send "About Page". If the URL is '/contact', send "Contact Page". For any other URL, send "404 Not Found".
    if(req.url === '/'){
        res.end('HomePage')
    }else if(req.url === '/about'){
        res.end('About Page')
    }else if(req.url === '/contact'){
        res.end('Contact Page')
    }else{
        res.end('404 Not Found')
    }
})


// Start the server and listen on port 3000. When the server is successfully started, log a message to the console indicating that the server is listening on port 3000.
myServer.listen(3000, () => {
    console.log('Server is listening on port 3000');
})