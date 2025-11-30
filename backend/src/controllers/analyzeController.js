const axios = require("axios");
const { fetchShopifyData } = require("../services/shopifyScraper");
const { getAIRecommendations } = require("../services/openaiService");

// --- Shopify URL validator ---
const isShopifyStore = async (url) => {
  const cleanUrl = url.replace(/\/$/, "").toLowerCase();

  // MyShopify subdomain check
  if (cleanUrl.includes(".myshopify.com")) return true;

  // Check for cart.js (JSON) to confirm Shopify
  try {
    const res = await axios.get(`${cleanUrl}/cart.js`, { timeout: 4000 });
    if (res.headers["content-type"]?.includes("application/json")) return true;
  } catch {}

  // Check HTML for Shopify fingerprints
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
    return fingerprints.some(fp => html.includes(fp));
  } catch {
    return false;
  }
};

// --- Safe accessor helpers ---
const safeArray = (arr) => Array.isArray(arr) ? arr : [];
const safeString = (str) => typeof str === "string" ? str : "";

// --- Main analyze controller ---
const analyzeController = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "URL is required" });

    console.log(`\n🔍 Checking if ${url} is a Shopify store...`);
    const validShopify = await isShopifyStore(url);
    if (!validShopify) return res.status(400).json({ error: "Not a valid Shopify store." });

    console.log(`✅ Shopify store confirmed: ${url}`);

    // --- Fetch scraped data safely ---
    const scraped = await fetchShopifyData(url);
    console.log("🔹 Scraped data:", scraped);


// Flatten relevant SEO info
const flatShopData = {
  title: scraped.seo?.title || "N/A",
  description: scraped.seo?.description || "N/A",
  headings: scraped.seo?.headings || [],
  metaTags: scraped.seo?.metaTags || "N/A",
  keywords: scraped.seo?.keywords || "N/A"
};

    // --- AI recommendations ---
    const ai = await getAIRecommendations(flatShopData);

    return res.json({
      success: true,
      scrapedData: scraped,
      recommendations: ai,
    });
  } catch (error) {
    console.error("analyzeController error:", error.stack || error.message);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { analyzeController };
