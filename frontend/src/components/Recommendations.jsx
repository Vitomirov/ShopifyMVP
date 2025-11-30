import React from "react";

const Recommendations = ({ data, raw }) => {
  if (!data && !raw) return null;

  const { summary, recommendations, biggest_opportunity } = data || {};

  return (
    <div className="recommendations-container">

      {summary && (
        <div className="recommendation-card">
          <h3>SUMMARY</h3>
          <p>{summary}</p>
        </div>
      )}

      {recommendations &&
        Object.entries(recommendations).map(([key, value]) => (
          <div key={key} className="recommendation-card">
            <h3>{key.toUpperCase()}</h3>
            <p>{value}</p>
          </div>
        ))}

      {biggest_opportunity && (
        <div className="recommendation-card">
          <h3>BIGGEST OPPORTUNITY</h3>
          <p>{biggest_opportunity}</p>
        </div>
      )}

      {raw && (
        <div className="raw-json-output">
          <h3>SCRAPED JSON DATA</h3>
          <pre className="jsonData">{JSON.stringify(raw, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Recommendations;
