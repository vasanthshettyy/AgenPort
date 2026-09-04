import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy — Vasanth Shetty</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <section className="py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-20 bg-canvas min-h-screen">
        <div className="max-w-3xl w-full mx-auto">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-content-secondary hover:text-content-accent transition-colors mb-8 sm:mb-12"
          >
            ← Back to Home
          </a>

          <h1 className="text-3xl sm:text-5xl font-sans font-bold tracking-tighter text-content-primary mb-3">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm font-mono text-content-secondary uppercase tracking-widest mb-10 pb-6 border-b border-canvas-border">
            Last updated: September 4, 2026
          </p>

          <div className="space-y-8 text-content-secondary text-base sm:text-lg font-light leading-relaxed">
            <p>
              I'm Vasanth Shetty, and this is a simple explanation of what happens with your information when you use this website or get in touch with me.
            </p>

            <div>
              <h2 className="text-lg sm:text-xl font-sans font-bold tracking-tight text-content-primary mb-3">
                What I collect
              </h2>
              <p>
                When you fill out the contact form, I collect your name, email address, and whatever project details you share. That's it. I don't use tracking cookies, ad pixels, or analytics scripts that follow you around the web.
              </p>
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-sans font-bold tracking-tight text-content-primary mb-3">
                What I do with it
              </h2>
              <p>
                I use your information for one reason: to reply to you and discuss your project. I don't sell it, rent it, or share it with anyone else. It doesn't get added to a marketing list or used for anything beyond the conversation you started.
              </p>
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-sans font-bold tracking-tight text-content-primary mb-3">
                How long I keep it
              </h2>
              <p>
                If we end up working together, I'll keep your details for as long as needed to complete the project and for basic record-keeping afterward. If we don't end up working together, I'll delete your information within a reasonable time after our conversation ends.
              </p>
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-sans font-bold tracking-tight text-content-primary mb-3">
                Your rights
              </h2>
              <p>
                You can ask me at any time to tell you what information I have about you, correct it, or delete it completely. Just email me at{' '}
                <a href="mailto:vasanthshetty.dev@gmail.com" className="text-content-accent underline hover:text-content-primary transition-colors">
                  vasanthshetty.dev@gmail.com
                </a>{' '}
                and I'll take care of it.
              </p>
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-sans font-bold tracking-tight text-content-primary mb-3">
                Changes to this policy
              </h2>
              <p>
                If anything here changes, I'll update this page. I won't make changes that reduce your rights without saying so clearly.
              </p>
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-sans font-bold tracking-tight text-content-primary mb-3">
                Questions
              </h2>
              <p>
                If you have any questions about this, email me directly at{' '}
                <a href="mailto:vasanthshetty.dev@gmail.com" className="text-content-accent underline hover:text-content-primary transition-colors">
                  vasanthshetty.dev@gmail.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
