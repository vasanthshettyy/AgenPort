import React, { Suspense, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from './components/Header';
import Hero from './components/Hero';
import ErrorBoundary from './components/ErrorBoundary';
import NotFound from './components/NotFound';
import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';

// Lazy load below-the-fold components (Phase 8E.1)
const ValueSection = React.lazy(() => import('./components/ValueSection'));
const ServicesSection = React.lazy(() => import('./components/ServicesSection'));
const PricingSection = React.lazy(() => import('./components/PricingSection'));
const ProjectGrid = React.lazy(() => import('./components/ProjectGrid'));
const ContactSection = React.lazy(() => import('./components/ContactSection'));
const Footer = React.lazy(() => import('./components/Footer'));

const SkeletonLoader = () => (
  <div className="w-full h-96 bg-canvas flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-accent-primary/30 border-t-accent-primary rounded-full animate-spin"></div>
  </div>
);

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', onLocationChange);
    return () => window.removeEventListener('popstate', onLocationChange);
  }, []);

  // Simple Native Router
  if (currentPath !== '/' && currentPath !== '/index.html') {
    return <NotFound />;
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "name": "Vasanth Shetty — Full-Stack Web Developer",
        "url": "https://dev-vasanth.vercel.app",
        "logo": "https://dev-vasanth.vercel.app/favicon.svg",
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
            "name": "What is the typical timeline for a custom core application?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Most MVPs are launched within 8-12 weeks, while full enterprise infrastructures typically require 4-6 months depending on integration complexity."
            }
          },
          {
            "@type": "Question",
            "name": "Do we own the intellectual property?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, 100%. Upon completion and final payment, the entire codebase and database schema are transferred directly to your control."
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
        {/* Phase 7E.2: Meta Tags */}
        <title>Custom Full-Stack Development Agency | USA, UK, AU</title>
        <meta name="description" content="Premium custom software systems for high-ticket international B2B clients. We build the systems that scale your business - without the SaaS tax." />
        <link rel="canonical" href="https://dev-vasanth.vercel.app/" />

        {/* Phase 7E.4: Open Graph */}
        <meta property="og:title" content="Custom Full-Stack Development Agency | USA, UK, AU" />
        <meta property="og:description" content="Premium custom software systems for high-ticket international B2B clients." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dev-vasanth.vercel.app/" />
        <meta property="og:locale" content="en_US" />

        {/* Phase 7E.5: Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Custom Full-Stack Development Agency" />
        <meta name="twitter:description" content="Premium custom software systems for high-ticket international B2B clients." />

        {/* Phase 7E.3: JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <Header />

      <main>
        <Hero />

        <ErrorBoundary>
          <Suspense fallback={<SkeletonLoader />}>
            <ValueSection />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary>
          <Suspense fallback={<SkeletonLoader />}>
            <ServicesSection />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary>
          <Suspense fallback={<SkeletonLoader />}>
            <PricingSection />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary>
          <Suspense fallback={<SkeletonLoader />}>
            <ProjectGrid />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary>
          <Suspense fallback={<SkeletonLoader />}>
            <ContactSection />
          </Suspense>
        </ErrorBoundary>
      </main>

      <ErrorBoundary>
        <Suspense fallback={<SkeletonLoader />}>
          <Footer />
        </Suspense>
      </ErrorBoundary>
    </SmoothScroll>
  );
}

export default App;
