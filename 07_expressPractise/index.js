const express = require('express');
const app = express();

app.use((req, res, next)=> {
    console.log('Request method is:',req.method);
    console.log('Request URL is:', req.url);
    next();
})

// app.use((req, res, next) => {
//     const token = req.headers.token;

//     if (token !== "123") {
//         return res.status(401).send('Unauthorized: Invalid token');
//     }

//     next();
// });

app.use((req, res, next) => {
    req.user = {name: "Aniket"};
    next();
})

app.get('/hello', (req, res) => {
    console.log('user:', req.user);
    res.send('Hello, ' + req.user.name + '!');
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