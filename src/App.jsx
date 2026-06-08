import { Helmet } from 'react-helmet-async';
import Header from './components/Header';
import Hero from './components/Hero';
import ValueSection from './components/ValueSection';
import ServicesSection from './components/ServicesSection';
import ProjectGrid from './components/ProjectGrid';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Helmet>
        <title>Custom Full-Stack Development Agency | USA, UK, AU</title>
        <meta name="description" content="Premium custom software systems for high-ticket international B2B clients. We build the systems that scale your business — without the SaaS tax." />
      </Helmet>
      
      <Header />
      
      <main>
        <Hero />
        <ValueSection />
        <ServicesSection />
        <ProjectGrid />
        <ContactSection />
      </main>
      
      <Footer />
    </>
  )
}

export default App;
