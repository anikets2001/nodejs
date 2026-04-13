const fs = require('fs');
const http = require('http');

const myServer = http.createServer((req, res) => {
    const log = `${Date.now().toLocaleString()} - Request URL: ${req.url}\n New Request Received\n`;
    fs.appendFile('log.txt', log, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });

    console.log('Request received');
    res.end('Hello From Server');
})

myServer.listen(3000, () => {
    console.log('Server is listening on port 3000');
})