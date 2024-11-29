const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
app.use(express.json());

// Puppeteer Task: Take Screenshot
app.post('/screenshot', async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        const browser = await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-gpu',
                '--disable-software-rasterizer',
            ],
        });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' });
        const screenshotBuffer = await page.screenshot();
        await browser.close();

        res.set('Content-Type', 'image/png');
        res.send(screenshotBuffer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to take screenshot' });
    }
});

app.post('/scrapeTitle', async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        const browser = await puppeteer.launch({
            headless: false,
            args: ['--no-sandbox', '--disable-setuid-sandbox'], // Required for non-root environments
        });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' });
        const title = await page.title();
        await browser.close();
        res.send( title);
    } catch (error){
        console.error(error);
        res.status(500).json({ error: 'Failed to Get Title' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
