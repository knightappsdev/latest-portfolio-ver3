import React, { useState, useEffect } from 'react';
import { sendLeadCaptureEmail } from '../services/emailService';

const LeadCapture: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Show lead capture after user has been on site for 30 seconds
    const timer = window.setTimeout(() => {
      const hasSeenPopup = localStorage.getItem('leadCaptureShown');
      if (!hasSeenPopup) {
        setShowPopup(true);
      }
    }, 30000);

    // Show on scroll (when user scrolls 50% down the page)
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent > 50 && !isVisible) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isVisible]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const result = await sendLeadCaptureEmail({
        email,
        timestamp: new Date().toISOString(),
        page: window.location.pathname,
        referrer: document.referrer
      });

      if (result.success) {
        setIsSubmitted(true);
        localStorage.setItem('leadCaptureSubmitted', 'true');
        // Hide after 3 seconds
        window.setTimeout(() => {
          setShowPopup(false);
          setIsVisible(false);
        }, 3000);
      }
    } catch (error) {
      console.error('Error submitting lead:', error);
    }
  };

  const handleClose = () => {
    setShowPopup(false);
    setIsVisible(false);
    localStorage.setItem('leadCaptureShown', 'true');
  };

  // Exit Intent Popup
  const ExitIntentPopup = () => {
    if (!showPopup || isSubmitted) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
        <div className="bg-dark-800 rounded-2xl p-8 max-w-md w-full mx-4 border border-dark-700 relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <i className="bi bi-x-lg text-xl"></i>
          </button>
          
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-lime-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="bi bi-envelope-heart text-2xl text-lime-400"></i>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Wait! Don't Miss Out
            </h3>
            <p className="text-gray-400">
              Get exclusive insights and project updates delivered to your inbox.
            </p>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-lime-400 transition-colors"
              />
              <button
                type="submit"
                className="w-full px-6 py-3 bg-lime-500 text-dark-900 font-semibold rounded-lg hover:bg-lime-400 transition-colors"
              >
                <i className="bi bi-envelope mr-2"></i>
                Stay Updated
              </button>
            </form>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="bi bi-check-circle text-2xl text-green-400"></i>
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">Thank You!</h4>
              <p className="text-gray-400">You'll hear from me soon with exciting updates.</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Scroll-triggered Newsletter Signup
  const ScrollNewsletter = () => {
    if (!isVisible || showPopup || localStorage.getItem('leadCaptureSubmitted')) return null;

    return (
      <div className="fixed bottom-6 left-6 z-40 max-w-sm">
        <div className="bg-dark-800 rounded-xl p-6 border border-dark-700 shadow-xl">
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors"
          >
            <i className="bi bi-x text-lg"></i>
          </button>
          
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-lime-500/20 rounded-lg flex items-center justify-center mr-3">
              <i className="bi bi-bell text-lime-400"></i>
            </div>
            <div>
              <h4 className="text-white font-semibold">Stay Connected</h4>
              <p className="text-gray-400 text-sm">Get project updates</p>
            </div>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
                className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-lime-400 transition-colors text-sm"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-lime-500 text-dark-900 font-semibold rounded-lg hover:bg-lime-400 transition-colors text-sm"
              >
                Subscribe
              </button>
            </form>
          ) : (
            <div className="text-center">
              <i className="bi bi-check-circle text-2xl text-green-400 mb-2"></i>
              <p className="text-green-400 text-sm">Subscribed successfully!</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <ExitIntentPopup />
      <ScrollNewsletter />
    </>
  );
};

export default LeadCapture;
