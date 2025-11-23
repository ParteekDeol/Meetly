export default async function handler(req, res) {
    const apiKey = process.env.UNSPLASH_ACCESS_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: "Unsplash API key missing" });
    }

    const location = JSON.parse(req.body).location;
    
    const amountOfImages = 4;
    try {
        const resp = await fetch(
            `https://api.unsplash.com/search/photos?query=${encodeURIComponent(location)}&per_page=${amountOfImages}&orientation=landscape&client_id=${apiKey}`
        );
        const data = await resp.json();
        const images = data.results.map(photo => ({
            image: photo.urls.regular,
            author: photo.user.name,
            authorLink: photo.user.links.html,
            unsplashLink: photo.links.html
        }));
        return res.status(200).json(images);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}