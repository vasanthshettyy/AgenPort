

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-canvas py-16 lg:py-32 px-6 lg:px-20 border-t border-canvas-border">
      <div className="max-w-[1400px] w-full mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start lg:items-end mb-12 lg:mb-32">
          <div>
            <h2 className="text-3xl sm:text-6xl lg:text-massive font-sans font-bold tracking-tighter mb-4 lg:mb-12">
              VASANTH SHETTY
            </h2>
            <p className="text-base sm:text-2xl lg:text-3xl text-content-secondary font-light max-w-xl">
              Engineering the systems that power the next generation of enterprise.
            </p>
          </div>

          <div className="flex flex-col lg:items-end gap-8 lg:gap-12">
            <nav className="flex flex-wrap gap-6 lg:gap-16">
              {['SERVICES', 'PROJECTS', 'CONTACT', 'LINKEDIN'].map((link) => (
                <a 
                  key={link} 
                  href={link === 'LINKEDIN' ? 'https://www.linkedin.com/in/vasanth-shetty-dev' : `#${link.toLowerCase()}`}
                  target={link === 'LINKEDIN' ? '_blank' : undefined}
                  rel={link === 'LINKEDIN' ? 'noopener noreferrer' : undefined}
                  className="text-xs font-bold tracking-widest text-content-secondary hover:text-content-accent transition-colors min-h-[44px] flex items-center"
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-8 lg:pt-12 border-t border-canvas-border text-[10px] font-bold tracking-[0.2em] text-content-secondary/40 uppercase text-center sm:text-left">
          <span>&copy; {currentYear} VASANTH SHETTY. ALL RIGHTS RESERVED.</span>
          <div className="flex gap-8">
            <a href="#" className="hover:text-content-primary transition-colors py-2">PRIVACY POLICY</a>
            <a href="#" className="hover:text-content-primary transition-colors py-2">TERMS OF SERVICE</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
