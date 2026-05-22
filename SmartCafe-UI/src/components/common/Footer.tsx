const Footer = () => {
  return (
    <footer className="border-t border-border/70 bg-black px-6 py-10 text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 text-center md:flex-row md:items-center md:justify-between md:text-left">
        <div>
          <p className="text-sm uppercase tracking-[0.32em] text-orange-300">
            SmartCafe
          </p>
          <p className="mt-2 text-lg font-semibold">
            Food ordering built with a premium cafe feel.
          </p>
        </div>

        <p className="text-sm text-white/70">
          © 2026 SmartCafe. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
