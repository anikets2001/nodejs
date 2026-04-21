import { nanoid } from 'nanoid';
import URL from '../models/url.js';

export async function handleGenerateNewShortURL(req, res){
    const body = req.body;
    let redirectUrl = (body?.url || body?.redirectUrl || '').trim();

    if(!redirectUrl){
        return res.status(400).json({ error: 'url is required' });
    }

    // Browser submissions often omit protocol; store absolute URL for redirect.
    if (!/^https?:\/\//i.test(redirectUrl)) {
        redirectUrl = `https://${redirectUrl}`;
    }
    const shortID = nanoid(8);

    await URL.create({
        shortId: shortID,
        redirectUrl,
        visitHistory: []
    });

    if (req.accepts('html')) {
        return res.render('home', { id: shortID });
    }

    return res.json({ id: shortID });
}

export async function handleGetAnalytics(req, res) {
    const shortId = req.params.id;
    const result = await URL.findOne({ shortId });

    if (!result) {
        return res.status(404).json({ error: 'Short ID not found' });
    }

    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    });
}