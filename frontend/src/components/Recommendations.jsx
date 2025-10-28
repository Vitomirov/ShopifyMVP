import React from "react";

const Recommendations = ({ data }) => {
  return (
    <div className="recommendations-container">
      {Object.entries(data).map(([category, value]) => (
        <div key={category} className="recommendation-card">
          <h3>{category.toUpperCase()}</h3>
          <p>{value}</p>
        </div>
      ))}
    </div>
  );
};

export default Recommendations;
