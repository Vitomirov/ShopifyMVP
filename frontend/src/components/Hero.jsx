import { useState } from "react";
import axios from "axios";

const Hero = ({ setResult, setLoading }) => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const res = await axios.post("http://localhost:3001/api/analyze", { url });
      setResult(res.data);
    } catch (err) {
      setError("Invalid Shopify store or server error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="text-center py-20 px-4">
      <h2 className="text-4xl font-bold text-white mt-10">
        AI Shopify Store Optimizer
      </h2>

      <p className="text-gray-400 max-w-xl mx-auto mb-8">
        Analyze your Shopify store with AI and get actionable SEO, UX, and
        conversion improvements instantly.
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
      >
        <input
          type="text"
          placeholder="Enter Shopify URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full sm:w-96 px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
        >
          Analyze
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </section>
  );
};

export default Hero;