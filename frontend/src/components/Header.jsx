const Header = () => {
  return (
    <header className="w-full border-b border-green-800 bg-green-500/80 backdrop-blur">
      <div className="max-w-8xl mx-auto p-9 mx-5 flex justify-between items-center">
        <h1 className="text-lg font-bold text-white">
          Shopify AI Optimizer
        </h1>

        <a
          href="https://github.com/Vitomirov/ShopifyMVP"
          target="_blank"
          className="text-lg text-white hover:text-black transition"
        >
          GitHub
        </a>
      </div>
    </header>
  );
};

export default Header;