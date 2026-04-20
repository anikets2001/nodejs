const express = require('express');
const userRouter = require('./routes/user');
require('dotenv').config();
const { connectMongoDb } = require('./connection');

const app = express();
app.use(express.json());
app.use('/api/users', userRouter);

const PORT = 5000;
const mongoUri = process.env.MONGO_CONNECTION_STRING;

app.get('/', (req, res) => {
    res.send('Hello, MongoDB!');
});

async function start() {
    try {
        await connectMongoDb(mongoUri);
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    } catch (err) {
        console.error('MongoDB connection failed:', err.message);
        process.exit(1);
    }
}

start();