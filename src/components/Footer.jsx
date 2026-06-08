import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-canvas border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="text-xl font-bold tracking-tight text-white flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-md bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center">
                <span className="text-canvas-light font-black text-sm">AG</span>
              </div>
              <span>Agency</span>
            </div>
            <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
              We engineer custom, scalable digital infrastructure for elite B2B companies worldwide.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Sitemap</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#services" className="hover:text-accent-primary transition-colors">Services</a></li>
              <li><a href="#work" className="hover:text-accent-primary transition-colors">Work</a></li>
              <li><a href="#process" className="hover:text-accent-primary transition-colors">Process</a></li>
              <li><a href="#contact" className="hover:text-accent-primary transition-colors">Book a Call</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-accent-primary transition-colors">GitHub</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-accent-primary transition-colors">LinkedIn</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-accent-primary transition-colors">Twitter (X)</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
          <div>
            &copy; {currentYear} Agency Engineering Ltd. All rights reserved.
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
