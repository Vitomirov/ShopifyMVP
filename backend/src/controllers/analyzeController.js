const axios = require("axios");
const { fetchShopifyData } = require("../services/shopifyScraper");
const { getAIRecommendations } = require("../services/openaiService");

// Shopify detection helper
const isShopifyStore = async (url) => {
  const cleanUrl = url.replace(/\/$/, "");
  const lower = cleanUrl.toLowerCase();

  if (lower.includes(".myshopify.com")) return true;

  try {
    const cart = await axios.get(cleanUrl + "/cart.js", { timeout: 4000 });
    if (cart.headers["content-type"]?.includes("application/json")) return true;
  } catch {}

  try {
    const { data: html } = await axios.get(cleanUrl, { timeout: 5000 });

    const fingerprints = [
      "cdn.shopify.com",
      "window.Shopify",
      "Shopify.theme",
      "shopify-checkout",
      "Shopify.designMode",
      "ShopifyAnalytics",
      "Shopify.locale",
    ];

    return fingerprints.some((fp) => html.includes(fp));
  } catch {
    return false;
  }
};

// Main controller
const analyzeController = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "URL is required" });

    const shopify = await isShopifyStore(url);
    if (!shopify) {
      return res
        .status(400)
        .json({ error: "This website is not a Shopify store." });
    }

    // SCRAPING
    const scraped = await fetchShopifyData(url);

    // AI ANALYSIS
    const ai = await getAIRecommendations(scraped);

    return res.json({
      success: true,
      data: ai,      // AI summary, opportunity, recommendations
      raw: scraped,  // original scraped data
    });
  } catch (err) {
    console.error("analyzeController error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { analyzeController };
