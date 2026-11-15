import React, { Suspense, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from './components/Header';
import Hero from './components/Hero';
import ErrorBoundary from './components/ErrorBoundary';
import NotFound from './components/NotFound';
import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import FloatingBadge from './components/FloatingBadge';

// Lazy load below-the-fold components (Phase 8E.1)
const ValueSection = React.lazy(() => import('./components/ValueSection'));
const ServicesSection = React.lazy(() => import('./components/ServicesSection'));
const ProcessSection = React.lazy(() => import('./components/ProcessSection'));
const PricingSection = React.lazy(() => import('./components/PricingSection'));
const ProjectGrid = React.lazy(() => import('./components/ProjectGrid'));
const ContactSection = React.lazy(() => import('./components/ContactSection'));
const FaqSection = React.lazy(() => import('./components/FaqSection'));
const Footer = React.lazy(() => import('./components/Footer'));
const PrivacyPolicy = React.lazy(() => import('./components/PrivacyPolicy'));

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', onLocationChange);
    return () => window.removeEventListener('popstate', onLocationChange);
  }, []);

  if (currentPath === '/privacy-policy' || currentPath === '/privacy-policy/') {
    return (
      <SmoothScroll>
        <CustomCursor />
        <Header />
        <main>
          <ErrorBoundary>
            <Suspense fallback={null}>
              <PrivacyPolicy />
            </Suspense>
          </ErrorBoundary>
        </main>
        <ErrorBoundary>
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        </ErrorBoundary>
      </SmoothScroll>
    );
  }

  if (currentPath !== '/' && currentPath !== '/index.html') {
    return <NotFound />;
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://dev-vasanth.vercel.app/#person",
        "name": "Vasanth Shetty",
        "alternateName": ["Vasant Shetty", "Vasanth", "dev-vasanth"],
        "jobTitle": "Freelance Web Developer & Automation Specialist",
        "url": "https://dev-vasanth.vercel.app/",
        "image": "https://dev-vasanth.vercel.app/vasanth-hero.webp",
        "knowsAbout": [
          "Web Development",
          "Website Chatbots",
          "Business Automations",
          "Lead Capture Systems",
          "React",
          "Social Media Automation",
          "Conversion Optimization"
        ],
        "sameAs": [
          "https://github.com/vasanthshettyy",
          "https://www.linkedin.com/in/vasanth-shetty-dev"
        ]
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://dev-vasanth.vercel.app/#service",
        "name": "Vasanth Shetty - Web Development & Automation",
        "url": "https://dev-vasanth.vercel.app/",
        "logo": "https://dev-vasanth.vercel.app/favicon.svg",
        "image": "https://dev-vasanth.vercel.app/og-image.png",
        "priceRange": "$$",
        "founder": {
          "@id": "https://dev-vasanth.vercel.app/#person"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "email": "vasanthshetty.dev@gmail.com",
          "contactType": "customer service"
        },
        "sameAs": [
          "https://github.com/vasanthshettyy",
          "https://www.linkedin.com/in/vasanth-shetty-dev"
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How long does a project take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A single landing page or redesign usually takes 1 to 2 weeks, while a multi-page custom website or booking integration takes 2 to 4 weeks."
            }
          },
          {
            "@type": "Question",
            "name": "Do I own my website and code?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, completely. Upon completion and final payment, full code ownership is transferred directly to you. No monthly software fees or lock-in."
            }
          }
        ]
      }
    ]
  };

  return (
    <SmoothScroll>
      <CustomCursor />
      <ScrollProgress />
      <Helmet>
        <title>Vasanth Shetty | Freelance Web Developer, AI Chatbots & Automations</title>
        <meta name="description" content="Official portfolio of Vasanth Shetty (Vasant Shetty) — Freelance Web Developer & Automation Specialist building high-converting websites, AI chatbots, and lead capture workflows." />
        <link rel="canonical" href="https://dev-vasanth.vercel.app/" />

        {/* Open Graph (WhatsApp, iMessage, Instagram, Facebook, LinkedIn, Gmail, Slack) */}
        <meta property="og:site_name" content="Vasanth Shetty" />
        <meta property="og:title" content="Vasanth Shetty | Freelance Web Developer, AI Chatbots & Automations" />
        <meta property="og:description" content="Official portfolio of Vasanth Shetty (Vasant Shetty) — Freelance Web Developer & Automation Specialist building high-converting websites, AI chatbots, and lead capture workflows." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dev-vasanth.vercel.app/" />
        <meta property="og:image" content="https://dev-vasanth.vercel.app/og-image.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Vasanth Shetty - Freelance Web Developer & Automation Specialist" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter / X Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Vasanth Shetty | Freelance Web Developer, AI Chatbots & Automations" />
        <meta name="twitter:description" content="Official portfolio of Vasanth Shetty (Vasant Shetty) — Freelance Web Developer & Automation Specialist building high-converting websites, AI chatbots, and lead capture workflows." />
        <meta name="twitter:image" content="https://dev-vasanth.vercel.app/og-image.png" />

        <link rel="alternate" type="text/plain" href="/llms.txt" title="AI Agent Specification" />
        <link rel="ard" href="/.well-known/ard.json" title="Agent Resource Discovery Manifest" />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json" id="json-ld-schema" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </Helmet>

      <Header />

      <main>
        <Hero />

        <ErrorBoundary>
          <Suspense fallback={null}>
            <ValueSection />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary>
          <Suspense fallback={null}>
            <ServicesSection />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary>
          <Suspense fallback={null}>
            <ProcessSection />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary>
          <Suspense fallback={null}>
            <PricingSection />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary>
          <Suspense fallback={null}>
            <ProjectGrid />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary>
          <Suspense fallback={null}>
            <FaqSection />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary>
          <Suspense fallback={null}>
            <ContactSection />
          </Suspense>
        </ErrorBoundary>
      </main>

      <ErrorBoundary>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </ErrorBoundary>

      <FloatingBadge />
    </SmoothScroll>
  );
}

export default App;
