import React from "react";

const Recommendations = ({ data, raw }) => {
  // Fallback placeholder ako nema ni data ni raw
  if (!data && !raw) {
    return (
      <div className="recommendations-container">
        <p>No recommendations available yet.</p>
      </div>
    );
  }

  const safeData = data || {};
  const { summary, recommendations = {}, biggest_opportunity } = safeData;

  // Funkcija za sigurno mapiranje recommendations
  const renderRecommendations = () => {
    if (!recommendations || Object.keys(recommendations).length === 0) {
      return <p>No detailed recommendations available.</p>;
    }

    return Object.entries(recommendations).map(([key, value]) => (
      <div key={key} className="recommendation-card">
        <h3>{key.toUpperCase()}</h3>
        <p>{value || "No content provided."}</p>
      </div>
    ));
  };

  // Renderovanje raw JSON sa formatiranjem
const renderRawJSON = () => {
  if (!raw) return null;

  const displayRaw = { ...raw };

  // Proveravamo da li postoji dug CSS string i da li je tip string
  if (
    displayRaw.css_summary?.button_styles &&
    typeof displayRaw.css_summary.button_styles === "string"
  ) {
    displayRaw.css_summary.button_styles = displayRaw.css_summary.button_styles
      .split("}")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((s) => s + "}");
  }

  return (
    <div className="raw-json-output">
      <h3>RAW JSON OUTPUT</h3>
      <pre className="jsonData">{JSON.stringify(displayRaw, null, 2)}</pre>
    </div>
  );
};


  return (
    <div className="recommendations-container">
      {/* Summary */}
      {summary && (
        <div className="recommendation-card">
          <h3>SUMMARY</h3>
          <p>{summary}</p>
        </div>
      )}

      {/* Recommendations */}
      <div className="recommendations-list">{renderRecommendations()}</div>

      {/* Biggest opportunity */}
      {biggest_opportunity && (
        <div className="recommendation-card">
          <h3>BIGGEST OPPORTUNITY</h3>
          <p>{biggest_opportunity}</p>
        </div>
      )}

      {/* Raw JSON */}
      {renderRawJSON()}

      {/* Ako ništa od gore navedenog ne postoji */}
      {!summary &&
        (!recommendations || Object.keys(recommendations).length === 0) &&
        !biggest_opportunity &&
        !raw && (
          <div className="recommendation-card">
            <p>No valid recommendation data received from AI.</p>
          </div>
        )}
    </div>
  );
};

export default Recommendations;
