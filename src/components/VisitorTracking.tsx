import React, { useEffect } from 'react';
import { sendVisitorTrackingEmail } from '../services/emailService';

const VisitorTracking: React.FC = () => {
  useEffect(() => {
    const trackVisitor = async () => {
      // Only track with user consent
      const hasConsent = localStorage.getItem('analyticsConsent') === 'true';
      if (!hasConsent) return;

      const visitorData = {
        timestamp: new Date().toISOString(),
        page: window.location.pathname + window.location.search,
        referrer: document.referrer || 'Direct',
        userAgent: navigator.userAgent,
        screenResolution: `${screen.width}x${screen.height}`,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        language: navigator.language,
      };

      try {
        await sendVisitorTrackingEmail(visitorData);
      } catch (error) {
        console.error('Error tracking visitor:', error);
      }
    };

    // Track page view
    trackVisitor();

    // Track session duration
    const startTime = Date.now();
    const trackSessionEnd = () => {
      const sessionDuration = Math.round((Date.now() - startTime) / 1000);
      if (sessionDuration > 10) { // Only track if user stayed more than 10 seconds
        // You can create a separate email template for session tracking if needed
        console.log('Session duration:', sessionDuration, 'seconds');
      }
    };

    window.addEventListener('beforeunload', trackSessionEnd);
    return () => window.removeEventListener('beforeunload', trackSessionEnd);
  }, []);

  return null; // This component doesn't render anything
};

export default VisitorTracking;
