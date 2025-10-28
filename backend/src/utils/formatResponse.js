/**
 * formatAIResponse
 * Converts AI raw text into structured JSON
 * @param {string} aiText
 * @returns {Object} - categorized recommendations
 */
const formatAIResponse = (aiText) => {
  // Simple split by line as minimal processing
  const lines = aiText.split("\n").filter((line) => line.trim() !== "");

  const result = {
    conversion: lines[0] || "",
    ux: lines[1] || "",
    seo: lines[2] || "",
    visuals: lines[3] || "",
    extra: lines[4] || "",
  };

  return result;
};

module.exports = { formatAIResponse };
