const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * getAIRecommendations
 * Sends scraped shop data to OpenAI and returns clean, structured JSON
 */
const getAIRecommendations = async (shopData) => {
  const prompt = `
You are a Shopify conversion optimization AI and UX strategist.
Analyze the store data below and provide a professional report.

Requirements:
1. Store summary: what the store sells, target audience, and presentation.
2. 5 actionable recommendations:
   - Conversion
   - SEO
   - UX
   - Visuals
   - Trust & retention
Each recommendation must be specific, include why it matters, and be 2-3 sentences max.
3. End with a 1-2 line summary of the store's biggest missed opportunity.

Store data:
Title: ${shopData.title}
Description: ${shopData.description}
Headings: ${shopData.headings.join(", ")}
Meta tags: ${shopData.metaTags || "N/A"}
Keywords: ${shopData.keywords || "N/A"}

Output only valid JSON. Format exactly like this:
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
`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are a Shopify conversion optimization AI. Always respond with strictly valid JSON only."
        },
        { role: "user", content: prompt }
      ],
      temperature: 0.5, // stable and focused output
      max_tokens: 700
    });

    let aiContent = response.choices[0].message.content;

    // Try parsing JSON directly
    try {
      return JSON.parse(aiContent);
    } catch (err) {
      // Cleanup any markdown or newlines and try parsing again
      const cleaned = aiContent
        .replace(/```json|```/g, "")
        .trim();
      try {
        return JSON.parse(cleaned);
      } catch (err2) {
        console.error("AI returned invalid JSON:", aiContent);
        return {
          error: "AI returned invalid JSON",
          raw: aiContent
        };
      }
    }
  } catch (error) {
    console.error("Error in getAIRecommendations:", error.message);
    return { error: "AI could not generate recommendations at this time." };
  }
};

module.exports = { getAIRecommendations };
