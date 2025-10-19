const { nanoid } = require("nanoid");
const URL = require("../models/url");
const { json } = require("express");

async function handleGenerateShortURL(req, res) {
    
    const body = req.body;

    if (!body.url) return res.status(400).json({error: "URL is required."});
    
    const shortId = nanoid(8);
    await URL.create({
        shortId: shortId,
        redirectUrl: body.url,
        visitHistory: []
    });

    return res.json({id: shortId});
}

async function redirectToOriginalURL(req, res) {
    
    const shortId = req.params.id;
    
    const entry = await URL.findOneAndUpdate(
        { shortId },
        { $push: { visitHistory: { timestamp: Date.now() } } },
        { new: true }
    );

    if (!entry) return res.status(404).json({ error: "Short URL not found" });

    console.log("Visited History Logged.");
    return res.redirect(entry.redirectUrl);
}

async function getAnalytics(req, res) {
    
    const shortId = req.params.id;
    let analytics = await URL.findOne({shortId});
    
    if(!analytics) {
        return res.status(404).json({error: "URL not found."});
    }
    return res.json(analytics.visitHistory);
}

module.exports = { handleGenerateShortURL, redirectToOriginalURL, getAnalytics };