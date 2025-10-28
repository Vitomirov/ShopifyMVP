import React, { useState } from "react";
import axios from "axios";

const URLForm = ({ setRecommendations, setLoading }) => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setRecommendations(null);
    setError(null);

    try {
      const response = await axios.post("http://localhost:5000/api/analyze", { url });
      setRecommendations(response.data);
    } catch (err) {
      console.error("Error calling API:", err.message);

      // Check if server sent a specific error message
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("Error fetching AI recommendations. Check the URL or backend.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="url-form">
        <input
          type="text"
          placeholder="Enter Shopify URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button type="submit">Analyze</button>
      </form>
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
    </>
  );
};

export default URLForm;
