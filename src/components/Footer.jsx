

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-canvas py-32 px-6 lg:px-20 border-t border-canvas-border">
      <div className="max-w-[1400px] w-full mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-end mb-32">
          <div>
            <h2 className="text-massive font-sans font-bold tracking-tighter mb-12">
              VASANTH SHETTY
            </h2>
            <p className="text-2xl lg:text-3xl text-content-secondary font-light max-w-xl">
              Engineering the systems that power the next generation of enterprise.
            </p>
          </div>

          <div className="flex flex-col lg:items-end gap-12">
            <nav className="flex flex-wrap gap-8 lg:gap-16">
              {['SERVICES', 'PROJECTS', 'CONTACT', 'LINKEDIN'].map((link) => (
                <a 
                  key={link} 
                  href={link === 'LINKEDIN' ? 'https://www.linkedin.com/in/vasanth-shetty-dev' : `#${link.toLowerCase()}`}
                  target={link === 'LINKEDIN' ? '_blank' : undefined}
                  rel={link === 'LINKEDIN' ? 'noopener noreferrer' : undefined}
                  className="text-xs font-bold tracking-widest text-content-secondary hover:text-content-accent transition-colors"
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 pt-12 border-t border-canvas-border text-[10px] font-bold tracking-[0.2em] text-content-secondary/30 uppercase">
          <span>&copy; {currentYear} VASANTH SHETTY.</span>
          <div className="flex gap-12">
            <a href="#" className="hover:text-content-primary transition-colors">PRIVACY POLICY</a>
            <a href="#" className="hover:text-content-primary transition-colors">TERMS OF SERVICE</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
