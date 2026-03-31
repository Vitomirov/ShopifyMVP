import { useState } from "react";
import Hero from "./components/Hero";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      <main className="flex-1">
        <Hero
          className="flex-1"
          setResult={setResult}
          setLoading={setLoading}
        />
      </main>
      {loading && (
        <p className="text-center text-gray-400 min-h-60">Analyzing store...</p>
      )}

      {result && <Dashboard data={result.recommendations} />}

      <Footer />
    </div>
  );
}

export default App;
