const { scrapeShopify } = require("../services/shopifyScraper");
const { getAIRecommendations } = require("../services/openaiService");
const { formatAIResponse } = require("../utils/formatResponse");

const analyzeController = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "URL nije prosleđen" });

    // Scrape podaci sa sajta
    const shopData = await scrapeShopify(url);

    // Poziv AI
    const aiRawResponse = await getAIRecommendations(shopData);

    // Formatiranje u JSON
    const formattedResponse = formatAIResponse(aiRawResponse);

    res.json(formattedResponse);
  } catch (error) {
    console.error("Greška u analyzeController:", error.message);
    res.status(500).json({ error: "Došlo je do greške na serveru" });
  }
};

module.exports = { analyzeController };
