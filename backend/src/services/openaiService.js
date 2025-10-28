const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * getAIRecommendations
 * Sends scraped shop data to OpenAI and returns recommendations
 * @param {Object} shopData - { title, description, headings }
 * @returns {string} - raw AI response
 */
const getAIRecommendations = async (shopData) => {
  // Construct the prompt for the AI
  const prompt = `
You are an AI assistant for Shopify stores. Analyze the store and give 5 actionable recommendations 
to improve conversion, UX, SEO, and visuals.

Store data:
Title: ${shopData.title}
Description: ${shopData.description}
Headings: ${shopData.headings.join(", ")}
`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    // Return the raw content of AI message
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error in getAIRecommendations:", error.message);
    return "AI could not generate recommendations at this time.";
  }
};

module.exports = { getAIRecommendations };
