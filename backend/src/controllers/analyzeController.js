const axios = require("axios");
const { scrapeShopify } = require("../services/shopifyScraper");
const { getAIRecommendations } = require("../services/openaiService");

/**
 * Detects if the given URL belongs to a Shopify store.
 * Checks:
 *  - if the domain contains .myshopify.com
 *  - if /cart.js endpoint works
 *  - if HTML source includes Shopify-specific fingerprints
 */
const isShopifyStore = async (url) => {
  const cleanUrl = url.replace(/\/$/, "");
  const lowerUrl = cleanUrl.toLowerCase();

  // --- DOMAIN CHECK ---
  if (lowerUrl.includes(".myshopify.com")) {
    console.log(`[Shopify Check] Detected .myshopify.com domain ✅`);
    return true;
  }

  try {
    // --- CART ENDPOINT CHECK ---
    const cartRes = await axios.get(`${cleanUrl}/cart.js`, { timeout: 4000 });
    if (cartRes.headers["content-type"]?.includes("application/json")) {
      console.log(`[Shopify Check] /cart.js endpoint valid ✅`);
      return true;
    }
  } catch {
    console.log(`[Shopify Check] /cart.js endpoint failed`);
  }

  try {
    // --- HTML FINGERPRINT CHECK ---
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

    for (const fp of fingerprints) {
      if (html.includes(fp)) {
        console.log(`[Shopify Check] Found Shopify fingerprint: ${fp}`);
        return true;
      }
    }

    console.log(`[Shopify Check] No Shopify fingerprints found`);
  } catch (err) {
    console.log(`[Shopify Check] HTML fetch failed:`, err.message);
  }

  console.log(`[Shopify Check] Not a Shopify store`);
  return false;
};

/**
 * Main analyze controller
 */
const analyzeController = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "URL is required" });

    console.log(`\n🔍 Checking if ${url} is a Shopify store...`);

    const validShopify = await isShopifyStore(url);
    if (!validShopify) {
      return res
        .status(400)
        .json({ error: "This website is not a valid Shopify store." });
    }

    console.log(` Shopify store confirmed: ${url}`);

    // Scrape Shopify store data
    const shopData = await scrapeShopify(url);

    // Get AI recommendations (already JSON)
    const aiResponse = await getAIRecommendations(shopData);

    // Send JSON directly
    res.json(aiResponse);

  } catch (error) {
    console.error("analyzeController error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { analyzeController };
