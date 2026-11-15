import React, { useEffect } from 'react';

export default function PrivacyPolicy({ onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-policy-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
      className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 lg:p-10"
    >
      <div className="relative w-full max-w-3xl max-h-[85vh] bg-canvas border border-canvas-border rounded-2xl p-6 sm:p-10 overflow-y-auto custom-scrollbar shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
        {/* Header bar with Close button */}
        <div className="flex items-start justify-between gap-4 pb-6 border-b border-canvas-border mb-6">
          <div>
            <h2 id="privacy-policy-title" className="text-2xl sm:text-4xl font-sans font-bold tracking-tighter text-content-primary">
              Privacy Policy
            </h2>
            <p className="text-xs sm:text-sm font-mono text-content-secondary uppercase tracking-widest mt-1">
              Last updated: September 4, 2026
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Privacy Policy Modal"
            className="w-10 h-10 rounded-full border border-canvas-border bg-canvas-surface flex items-center justify-center text-content-secondary hover:text-content-primary hover:border-content-accent transition-colors cursor-pointer text-lg flex-shrink-0"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6 text-content-secondary text-sm sm:text-base font-light leading-relaxed">
          <p>
            I'm Vasanth Shetty, and this is a simple explanation of what happens with your information when you use this website or get in touch with me.
          </p>

          <div>
            <h3 className="text-base sm:text-lg font-sans font-bold tracking-tight text-content-primary mb-2">
              What I collect
            </h3>
            <p>
              When you fill out the contact form, I collect your name, email address, and whatever project details you share. That's it. I don't use tracking cookies, ad pixels, or analytics scripts that follow you around the web.
            </p>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-sans font-bold tracking-tight text-content-primary mb-2">
              What I do with it
            </h3>
            <p>
              I use your information for one reason: to reply to you and discuss your project. I don't sell it, rent it, or share it with anyone else. It doesn't get added to a marketing list or used for anything beyond the conversation you started.
            </p>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-sans font-bold tracking-tight text-content-primary mb-2">
              How long I keep it
            </h3>
            <p>
              If we end up working together, I'll keep your details for as long as needed to complete the project and for basic record-keeping afterward. If we don't end up working together, I'll delete your information within a reasonable time after our conversation ends.
            </p>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-sans font-bold tracking-tight text-content-primary mb-2">
              Your rights
            </h3>
            <p>
              You can ask me at any time to tell you what information I have about you, correct it, or delete it completely. Just email me at{' '}
              <a href="mailto:vasanthshetty.dev@gmail.com" className="text-content-accent underline hover:text-content-primary transition-colors">
                vasanthshetty.dev@gmail.com
              </a>{' '}
              and I'll take care of it.
            </p>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-sans font-bold tracking-tight text-content-primary mb-2">
              Changes to this policy
            </h3>
            <p>
              If anything here changes, I'll update this modal. I won't make changes that reduce your rights without saying so clearly.
            </p>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-sans font-bold tracking-tight text-content-primary mb-2">
              Questions
            </h3>
            <p>
              If you have any questions about this, email me directly at{' '}
              <a href="mailto:vasanthshetty.dev@gmail.com" className="text-content-accent underline hover:text-content-primary transition-colors">
                vasanthshetty.dev@gmail.com
              </a>
              .
            </p>
          </div>

          <div className="pt-4 border-t border-canvas-border flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-full border border-canvas-border bg-canvas-surface text-xs font-mono uppercase tracking-widest text-content-primary hover:border-content-accent transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
