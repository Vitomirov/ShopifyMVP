const Recommendations = ({ data, raw }) => {
  if (!data && !raw) {
    return (
      <div className="recommendations-container">
        <p>No recommendations available yet.</p>
      </div>
    );
  }

  const safeData = data || {};
  const { summary, recommendations = {}, biggest_opportunity } = safeData;

  const renderRecommendations = () => {
    // Order striktno po promptu
    const order = ["Conversion", "SEO", "UX", "Visuals", "Trust"];
    return order.map((key) => (
      <div key={key} className="recommendation-card">
        <h3>{key}</h3>
        <p>{recommendations[key] || "No recommendation provided."}</p>
      </div>
    ));
  };



  return (
    <div className="recommendations-container">
      {summary && (
        <div className="recommendation-card">
          <h3>Summary</h3>
          <p>{summary}</p>
        </div>
      )}

      <div className="recommendations-list">{renderRecommendations()}</div>

      {biggest_opportunity && (
        <div className="recommendation-card">
          <h3>Biggest Opportunity</h3>
          <p>{biggest_opportunity}</p>
        </div>
      )}


      {!summary &&
        Object.keys(recommendations).length === 0 &&
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
