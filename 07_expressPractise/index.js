const express = require('express');
const app = express();

app.use((req, res, next)=> {
    console.log('Request method is:',req.method);
    console.log('Request URL is:', req.url);
    next();
})

app.get('/hello', (req, res) => {
    res.send('Hello, World!');
});

// params
app.get('/user/:name', (req, res) => {
    const name = req.params.name;
    console.log(`Received request for user: ${name}`);
    res.send(`Hello, ${name}!`);
});

// query
app.get('/search', (req, res)=>{
    const name = req.query.name;
    console.log(`Received search query: ${name}`);
    res.send(`Search results for: ${name}`);
});

app.listen(3000, ()=> {
    console.log('Server is running on port 3000');
})