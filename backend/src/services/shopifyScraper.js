const axios = require("axios");
const cheerio = require("cheerio");

const DEFAULT_USER_AGENT =
  "Mozilla/5.0 (compatible; GenericAuditBot/1.0; +https://yourdomain.com)";

/**
 * Helper: Fetch public JSON asset safely
 */
const fetchPublicJsonAsset = async (url) => {
  try {
    const res = await axios.get(url, {
      timeout: 5000,
      headers: {
        "User-Agent": DEFAULT_USER_AGENT,
        Accept: "application/json, text/plain, */*",
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

/**
 * Helper: Sanitize HTML, keep only tag names + text content
 */
const sanitizeHTML = (html) => {
  const $ = cheerio.load(html || "");
  const elements = $("*")
    .map((i, el) => {
      const tag = el.tagName.toLowerCase();
      const text = $(el).text().replace(/\s+/g, " ").trim();
      if (!text) return null;
      return { tag, text };
    })
    .get();
  return elements;
};

/**
 * Scrape SEO + content sections
 */
const scrapePublicSEOData = async (storeUrl) => {
  try {
    const { data } = await axios.get(storeUrl, {
      timeout: 5000,
      headers: { "User-Agent": DEFAULT_USER_AGENT },
    });
    const $ = cheerio.load(data);

    const title = $("title").text().trim() || "";
    const description = $('meta[name="description"]').attr("content")?.trim() || "";

    const headings = $("h1, h2, h3")
      .map((i, el) => $(el).text().replace(/\s+/g, " ").trim())
      .get()
      .filter(Boolean)
      .slice(0, 20);

    return {
      title,
      description,
      headings,
      html_sections: {
        header: sanitizeHTML($("header").html()),
        main: sanitizeHTML($("main").html()),
        footer: sanitizeHTML($("footer").html()),
      },
    };
  } catch {
    return {
      title: "",
      description: "",
      headings: [],
      html_sections: { header: [], main: [], footer: [] },
    };
  }
};

/**
 * Fetch CSS summary (colors, fonts, button styles)
 */
const fetchCSSSummary = async (storeUrl) => {
  try {
    const { data } = await axios.get(storeUrl, {
      timeout: 5000,
      headers: { "User-Agent": DEFAULT_USER_AGENT },
    });
    const $ = cheerio.load(data);

    // Inline styles
    const inlineStyles = $("style").map((i, el) => $(el).html() || "").get();

    // External styles
    const linkHrefs = $("link[rel='stylesheet']")
      .map((i, el) => $(el).attr("href"))
      .get()
      .filter(Boolean);

    const externalCSS = await Promise.all(
      linkHrefs.map(async (href) => {
        const url = href.startsWith("http") ? href : storeUrl + href;
        try {
          const res = await axios.get(url, { timeout: 5000, headers: { "User-Agent": DEFAULT_USER_AGENT } });
          return typeof res.data === "string" ? res.data : "";
        } catch {
          return "";
        }
      })
    );

    const allCSS = [...inlineStyles, ...externalCSS].filter(Boolean).join(" ");

    return {
      primary_colors: [...new Set(allCSS.match(/#([0-9a-fA-F]{3,6})/g) || [])],
      fonts: [...new Set(allCSS.match(/font-family:\s*([^;]+)/gi) || [])],
      button_styles: [...new Set(allCSS.match(/button\s*{[^}]+}/gi) || [])].join(" "),
    };
  } catch {
    return { primary_colors: [], fonts: [], button_styles: "" };
  }
};

/**
 * Fetch Shopify theme JSON safely
 */
const fetchThemeConfig = async (storeUrl) => {
  const paths = ["/config/settings_schema.json", "/assets/settings_data.json"];
  const [schema, data] = await Promise.all(paths.map((p) => fetchPublicJsonAsset(storeUrl + p)));
  return {
    themeSchema: schema || null, // null signalizira da nije dostupan
    themeData: data || null,
  };
};

/**
 * Combined scraper for AI
 */
const fetchShopifyData = async (storeUrl) => {
  if (!storeUrl) return {};

  const [seo, cssSummary, themeConfig] = await Promise.all([
    scrapePublicSEOData(storeUrl),
    fetchCSSSummary(storeUrl),
    fetchThemeConfig(storeUrl),
  ]);

  return {
    seo,
    css_summary: cssSummary,
    theme_config: themeConfig,
  };
};

module.exports = {
  fetchShopifyData,
  scrapePublicSEOData,
  fetchCSSSummary,
  fetchThemeConfig,
};
