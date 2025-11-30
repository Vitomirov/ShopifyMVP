import React, { useState } from "react";
import URLForm from "./components/URLForm";
import Recommendations from "./components/Recommendations";
import "./styles/App.css";

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="app-container">
      <h1>Shopify AI Conversion Optimizer</h1>

      <URLForm setRecommendations={setResult} setLoading={setLoading} />

      {loading && <p>Loading AI recommendations...</p>}

      {result && (
        <Recommendations data={result.data} raw={result.raw} />
      )}
    </div>
  );
}

export default App;
