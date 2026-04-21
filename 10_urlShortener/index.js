import express from 'express';
import path from 'path';
import urlRoute from './routes/url.js';
import { connectDB } from './connection.js';
import URL from './models/url.js';
import 'dotenv/config';
import staticRouter from './routes/staticRouter.js';

const app = express()
const PORT = 8001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/url', urlRoute)
app.use('/', staticRouter);

app.set('view engine', 'ejs');
app.set("views", path.resolve("./views"));

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

app.get('/url/test', async (req, res) => {
    const allUrls = await URL.find({});
    return res.render("home", {urls: allUrls})
});

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