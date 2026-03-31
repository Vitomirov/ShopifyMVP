import RecommendationCard from "./RecommendationCard";

const Dashboard = ({ data }) => {
  if (!data) return null;

  const { summary, recommendations = {}, biggest_opportunity } = data;

  return (
    <section className="max-w-5xl mx-auto px-4 pb-20">
      
      {/* Summary */}
      {summary && (
        <div className="bg-blue-600/10 border border-blue-600 p-6 rounded-xl mb-8">
          <h3 className="text-xl font-semibold text-white mb-2">Summary</h3>
          <p className="text-gray-300">{summary}</p>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <RecommendationCard title="Conversion" content={recommendations.Conversion} />
        <RecommendationCard title="SEO" content={recommendations.SEO} />
        <RecommendationCard title="UX" content={recommendations.UX} />
        <RecommendationCard title="Visuals" content={recommendations.Visuals} />
      </div>

      {/* Trust */}
      <div className="mb-8">
        <RecommendationCard title="Trust" content={recommendations.Trust} />
      </div>

      {/* Biggest Opportunity */}
      {biggest_opportunity && (
        <div className="bg-green-600/10 border border-green-600 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-white mb-2">
            Biggest Opportunity
          </h3>
          <p className="text-gray-300">{biggest_opportunity}</p>
        </div>
      )}
    </section>
  );
};

export default Dashboard;