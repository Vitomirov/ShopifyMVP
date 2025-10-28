import React from "react";

const Recommendations = ({ data }) => {
  if (!data) return null;

  return (
    <div className="recommendations-container">
      {data.summary && (
        <div className="recommendation-card">
          <h3>SUMMARY</h3>
          <p>{data.summary}</p>
        </div>
      )}

      {data.recommendations &&
        Object.entries(data.recommendations).map(([category, text], idx) => (
          <div key={idx} className="recommendation-card">
            <h3>{category.toUpperCase()}</h3>
            <p>{text}</p>
          </div>
        ))}

      {data.biggest_opportunity && (
        <div className="recommendation-card">
          <h3>BIGGEST OPPORTUNITY</h3>
          <p>{data.biggest_opportunity}</p>
        </div>
      )}
    </div>
  );
};

export default Recommendations;
