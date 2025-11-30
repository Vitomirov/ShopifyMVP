const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * getAIRecommendations
 * Sends scraped Shopify store data to OpenAI and returns frontend-ready JSON
 * Format expected by Recommendations.jsx:
 * {
 *   summary: "...",
 *   recommendations: {
 *     Conversion: "...",
 *     SEO: "...",
 *     UX: "...",
 *     Visuals: "...",
 *     Trust: "..."
 *   },
 *   biggest_opportunity: "..."
 * }
 */
const getAIRecommendations = async (shopData) => {
  // Safely extract scraped data
  const seo = shopData.seo || {};
  const theme = shopData.theme_config || {};
  const css = shopData.css_summary || {};

  const title = seo.title || "N/A";
  const description = seo.description || "N/A";
  const headings = Array.isArray(seo.headings) ? seo.headings.join(", ") : "N/A";

  const themeKeys = theme.themeSchema ? Object.keys(theme.themeSchema).join(", ") : "";
  const themeDataKeys = theme.themeData ? Object.keys(theme.themeData).join(", ") : "";
  const buttonStyles = typeof css.button_styles === "string" ? css.button_styles : "";

  const prompt = `
You are a world-class Shopify Growth Analyst (CRO, UX, SEO, front-end audit).
Analyze this store data and return **strictly valid JSON** in this exact format:

{
  "summary": "...",
  "recommendations": {
    "Conversion": "...",
    "SEO": "...",
    "UX": "...",
    "Visuals": "...",
    "Trust": "..."
  },
  "biggest_opportunity": "..."
}

Requirements:
- Provide **5 actionable recommendations**: Conversion, SEO, UX, Visuals, Trust.
- Each recommendation must include **why it matters** and a **practical, merchant-ready fix**.
- End with 1–2 sentence **biggest missed opportunity**.
- Do NOT return markdown, do NOT include extraneous text, only valid JSON.

Store data:
Title: ${title}
Description: ${description}
Headings: ${headings}
Theme Keys: ${themeKeys}
Theme Data Keys: ${themeDataKeys}
Button Styles: ${buttonStyles}
`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a Shopify conversion optimization AI. Respond only with strictly valid JSON in the required format."
        },
        { role: "user", content: prompt }
      ],
      temperature: 0.5,
      max_tokens: 1000,
    });

    let aiContent = response.choices[0].message.content;

    // Remove any accidental markdown or code blocks
    aiContent = aiContent.replace(/```json|```/g, "").trim();

    try {
      return JSON.parse(aiContent);
    } catch (err) {
      console.error("AI returned invalid JSON:", aiContent);
      return {
        summary: "AI analysis failed",
        recommendations: {
          Conversion: "N/A",
          SEO: "N/A",
          UX: "N/A",
          Visuals: "N/A",
          Trust: "N/A"
        },
        biggest_opportunity: "AI could not generate recommendations.",
        raw: aiContent
      };
    }
  } catch (error) {
    console.error("Error in getAIRecommendations:", error.message);
    return {
      summary: "AI analysis failed",
      recommendations: {
        Conversion: "N/A",
        SEO: "N/A",
        UX: "N/A",
        Visuals: "N/A",
        Trust: "N/A"
      },
      biggest_opportunity: "AI could not generate recommendations at this time."
    };
  }
};

module.exports = { getAIRecommendations };
