import express from 'express';
import urlRoute from './routes/url.js';
import { connectDB } from './connection.js';
import URL from './models/url.js';
import 'dotenv/config';

const app = express()
const PORT = 8001;

app.use(express.json());
app.use('/url', urlRoute)

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOne({ shortId });
    if(!entry){
        return res.status(400).json({ error: 'Short ID not found' });
    }
    entry.visitHistory.push({ timestamp: Date.now() });
    await entry.save();
    res.redirect(entry.redirectUrl);
})

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () => {
            console.log(`server running at port: ${PORT}`)
        })
    } catch (error) {
        console.log(error);
        process.exit(1);
    }

}

start();