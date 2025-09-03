import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Portfolio from './components/Portfolio';
import NewsletterSection from './components/NewsletterSection';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import LeadCapture from './components/LeadCapture';
import VisitorTracking from './components/VisitorTracking';
import CookieConsent from './components/CookieConsent';
import EmailJSSetupGuide from './components/EmailJSSetupGuide';

function App() {
  return (
    <div className="min-h-screen bg-dark-950 text-white">
      <Header />
      <Hero />
      <About />
      <Skills />
      <Portfolio />
      <NewsletterSection />
      <Contact />
      <Footer />
      <WhatsAppButton />
      <LeadCapture />
      <VisitorTracking />
      <CookieConsent />
      <EmailJSSetupGuide />
    </div>
  );
}

export default App;
