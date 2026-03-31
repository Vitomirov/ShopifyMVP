const Footer = () => {
  return (
    <footer className="border-t border-gray-800 py-6 text-center text-white text-lg flex flex-col sm:flex-row justify-center items-center gap-4">
      © Designed and Developed by Dejan Vitomirov
      <a
        href="https://portfolio.devitowarranty.xyz/"
        target="_blank"
        className="text-lg text-white hover:text-blue-400 transition"
      >
      Portfolio
      </a>
      <a>│</a>
      <a
        href="https://github.com/Vitomirov/ShopifyMVP"
        target="_blank"
        className="text-lg text-white hover:text-blue-400 transition "
      >
        GitHub
      </a>
    </footer>
  );
};

export default Footer;
