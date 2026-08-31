

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-canvas py-10 sm:py-16 lg:py-32 px-4 sm:px-6 lg:px-20 border-t border-canvas-border">
      <div className="max-w-[1400px] w-full mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-start lg:items-end mb-8 sm:mb-12 lg:mb-32">
          <div>
            <h2 className="text-2xl sm:text-4xl lg:text-6xl xl:text-massive font-sans font-bold tracking-tighter mb-3 sm:mb-4 lg:mb-12">
              VASANTH SHETTY
            </h2>
            <p className="text-sm sm:text-base lg:text-2xl xl:text-3xl text-content-secondary font-light max-w-xl">
              Building custom, high-converting websites and landing pages for service businesses.
            </p>
          </div>

          <div className="flex flex-col lg:items-end gap-4 sm:gap-6 lg:gap-12">
            <nav className="flex flex-wrap gap-4 sm:gap-6 lg:gap-16">
              {['SERVICES', 'PROJECTS', 'FAQ', 'CONTACT', 'LINKEDIN'].map((link) => (
                <a
                  key={link}
                  href={link === 'LINKEDIN' ? 'https://www.linkedin.com/in/vasanth-shetty-dev' : `#${link.toLowerCase()}`}
                  target={link === 'LINKEDIN' ? '_blank' : undefined}
                  rel={link === 'LINKEDIN' ? 'noopener noreferrer' : undefined}
                  className="text-[10px] sm:text-xs font-bold tracking-widest text-content-secondary hover:text-content-accent transition-colors min-h-[44px] flex items-center"
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 sm:pt-8 lg:pt-12 border-t border-canvas-border text-[10px] font-bold tracking-[0.2em] text-content-secondary/40 uppercase text-center sm:text-left">
          <span>&copy; {currentYear} VASANTH SHETTY. ALL RIGHTS RESERVED.</span>
          <div className="flex gap-6 sm:gap-8">
            <a href="#" className="hover:text-content-primary transition-colors py-2">PRIVACY POLICY</a>
            <a href="#" className="hover:text-content-primary transition-colors py-2">TERMS OF SERVICE</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
