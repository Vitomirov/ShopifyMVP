import React, { useState } from "react";
import axios from "axios";

const URLForm = ({ setRecommendations, setLoading }) => {
  const [url, setUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setRecommendations(null);

    try {
      const response = await axios.post("http://localhost:5000/api/analyze", { url });
      setRecommendations(response.data);
    } catch (error) {
      console.error("Error calling API:", error.message);
      alert("Error fetching AI recommendations. Check the URL or backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="url-form">
      <input
        type="text"
        placeholder="Enter Shopify URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button type="submit">Analyze</button>
    </form>
  );
};

export default URLForm;
