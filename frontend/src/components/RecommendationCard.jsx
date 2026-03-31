const RecommendationCard = ({ title, content }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow">
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{content}</p>
    </div>
  );
};

export default RecommendationCard;