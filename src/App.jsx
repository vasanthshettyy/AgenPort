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
  if (currentPath === '/privacy-policy' || currentPath === '/privacy-policy/') {
    return (
      <SmoothScroll>
        <CustomCursor />
        <Header />
        <main>
          <ErrorBoundary>
            <Suspense fallback={<SkeletonLoader />}>
              <PrivacyPolicy />
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
        {/* Phase 7E.2: Meta Tags */}
        <title>Vasanth Shetty — Full-Stack Web Developer</title>
        <meta name="description" content="Custom-coded websites, landing pages, and small e-commerce sites for service businesses. Built by a solo developer to generate leads and scale your business." />
        <link rel="canonical" href="https://dev-vasanth.vercel.app/" />

        {/* Phase 7E.4: Open Graph */}
        <meta property="og:title" content="Vasanth Shetty — Full-Stack Web Developer" />
        <meta property="og:description" content="Custom-coded websites, landing pages, and small e-commerce sites for service businesses. Built by a solo developer." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dev-vasanth.vercel.app/" />
        <meta property="og:locale" content="en_US" />

        {/* Phase 7E.5: Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Vasanth Shetty — Full-Stack Web Developer" />
        <meta name="twitter:description" content="Custom-coded websites, landing pages, and small e-commerce sites for service businesses. Built by a solo developer." />

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
            <ProcessSection />
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
            <FaqSection />
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

      <FloatingBadge />
    </SmoothScroll>
  );
}

export default App;
