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
      // POST request ka backendu
      const response = await axios.post("http://localhost:3000/api/analyze", { url });

      // backend vraća: { data: {...}, shopify: {...}, audit: {...} }
      setRecommendations(response.data); // cela struktura ide u state

    } catch (err) {
      console.error("Error calling API:", err.message);

      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Error fetching AI recommendations. Check URL or backend.");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="url-form-container">
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
    </div>
  );
};

export default URLForm;
