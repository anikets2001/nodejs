const express = require('express');

const app = express();

/*---
middlewares are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. 
They can execute any code, make changes to the request and response objects, end the request-response cycle, or call the next middleware function in the stack.
---*/

// middleware
app.use((req,res,next)=> {
    console.log('first middleware');
    // here we are modifying the request object by adding a new property 'myName' (this will transfer to next middleware and route handler)
    req.myName = 'Aniket Singh'
    next();
})

app.use((req,res,next)=> {
    console.log('second middleware');
    next();
})

// routes
app.get('/', (req, res) => {
    res.send(`Hello, ${req.myName}!`);
});

// error handling middleware
app.use((err, req, res, next)=> {
    console.error(err.stack);
    res.status(500).send('Something broke!');
})

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});