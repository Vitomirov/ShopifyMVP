import React, { useState } from "react";
import URLForm from "./components/URLForm";
import Recommendations from "./components/Recommendations";
import "./styles/App.css";

function App() {
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="app-container">
      <h1>Shopify AI Conversion Optimizer</h1>
      <URLForm setRecommendations={setRecommendations} setLoading={setLoading} />
      {loading && <p>Loading AI recommendations...</p>}
      {recommendations && <Recommendations data={recommendations} />}
    </div>
  );
}

export default App;
