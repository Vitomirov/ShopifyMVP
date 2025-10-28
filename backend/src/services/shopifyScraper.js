const axios = require("axios");
const cheerio = require("cheerio");

/**
 * scrapeShopify
 * Fetches basic data from a Shopify store
 * @param {string} url - Shopify store URL
 * @returns {Object} - title, description, headings
 */
const scrapeShopify = async (url) => {
  try {
    // Fetch HTML from the given URL
    const { data } = await axios.get(url);

    // Load HTML into cheerio for parsing
    const $ = cheerio.load(data);

    // Extract <title> and meta description
    const title = $("title").text() || "";
    const description = $('meta[name="description"]').attr("content") || "";

    // Extract up to 10 heading tags (h1, h2)
    const headings = $("h1, h2")
      .map((i, el) => $(el).text())
      .get()
      .slice(0, 10);

    return { title, description, headings };
  } catch (error) {
    console.error("Error in scrapeShopify:", error.message);
    return { title: "", description: "", headings: [] };
  }
};

module.exports = { scrapeShopify };
