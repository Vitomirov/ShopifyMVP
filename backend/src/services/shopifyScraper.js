const axios = require("axios");
const cheerio = require("cheerio");

const DEFAULT_USER_AGENT =
  "Mozilla/5.0 (compatible; GenericAuditBot/1.0; +https://yourdomain.com)";

const fetchPublicJsonAsset = async (url) => {
  try {
    const res = await axios.get(url, {
      timeout: 3000,
      headers: {
        "User-Agent": DEFAULT_USER_AGENT,
        "Accept": "application/json, text/plain, */*",
      },
    });

    if (typeof res.data === "string") {
      try {
        return JSON.parse(res.data);
      } catch {
        return null;
      }
    }
    return res.data;
  } catch {
    return null;
  }
};

const scrapePublicSEOData = async (url) => {
  try {
    const { data } = await axios.get(url, {
      timeout: 5000,
      headers: { "User-Agent": DEFAULT_USER_AGENT },
    });

    const $ = cheerio.load(data);

    const title = $("title").text().trim() || "";
    const description =
      $('meta[name="description"]').attr("content")?.trim() || "";

    const headings = $("h1, h2")
      .map((i, el) => $(el).text().replace(/\s+/g, " ").trim())
      .get()
      .filter(Boolean)
      .slice(0, 10);

    return { title, description, headings };
  } catch {
    return { title: "", description: "", headings: [] };
  }
};

const fetchThemeConfig = async (storeUrl) => {
  const paths = [
    "/config/settings_schema.json",
    "/assets/settings_data.json",
  ];

  const [schema, data] = await Promise.all(
    paths.map((p) => fetchPublicJsonAsset(storeUrl + p))
  );

  return { themeSchema: schema, themeData: data };
};

const fetchShopifyData = async (storeUrl) => {
  if (!storeUrl) return {};

  const [seo, themeConfig] = await Promise.all([
    scrapePublicSEOData(storeUrl),
    fetchThemeConfig(storeUrl),
  ]);

  return {
    title: seo.title,
    description: seo.description,
    headings: seo.headings,
    themeConfig,
  };
};

module.exports = {
  fetchShopifyData,
  scrapePublicSEOData,
  fetchThemeConfig,
};
