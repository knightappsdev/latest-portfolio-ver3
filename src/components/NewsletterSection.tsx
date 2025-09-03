import React, { useState } from 'react';
import { sendNewsletterEmail } from '../services/serverEmailService';

const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const result = await sendNewsletterEmail({
        email,
        source: 'newsletter_section',
        timestamp: new Date().toISOString()
      });

      if (result.success) {
        setIsSubmitted(true);
        setEmail('');
        window.setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        throw new Error('Failed to subscribe');
      }
    } catch (error: any) {
      console.error('Error subscribing to newsletter:', error);
      setErrorMessage(error.message || 'Failed to subscribe. Please try again.');
      window.setTimeout(() => setErrorMessage(''), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-dark-800 to-dark-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Stay in the <span className="text-lime-400">Loop</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Get exclusive insights, project updates, and industry tips delivered 
            straight to your inbox. No spam, just valuable content.
          </p>
        </div>

        {errorMessage && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg max-w-md mx-auto">
            <div className="flex items-center justify-center text-red-400">
              <i className="bi bi-exclamation-circle mr-2"></i>
              <span>{errorMessage}</span>
            </div>
          </div>
        )}

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 px-6 py-4 bg-dark-900 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-lime-400 transition-colors"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-4 bg-lime-500 text-dark-900 font-semibold rounded-lg hover:bg-lime-400 disabled:opacity-50 transition-colors flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <i className="bi bi-arrow-clockwise animate-spin mr-2"></i>
                    Subscribing...
                  </>
                ) : (
                  <>
                    <i className="bi bi-envelope-plus mr-2"></i>
                    Subscribe
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-center p-4 bg-lime-500/20 border border-lime-500/50 rounded-lg">
              <i className="bi bi-check-circle text-lime-400 text-2xl mr-3"></i>
              <div className="text-left">
                <h4 className="text-lime-400 font-semibold">Successfully Subscribed!</h4>
                <p className="text-gray-300 text-sm">Thank you for joining my newsletter.</p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex items-center justify-center space-x-6 text-sm text-gray-500">
          <div className="flex items-center">
            <i className="bi bi-shield-check mr-2 text-lime-400"></i>
            No spam, ever
          </div>
          <div className="flex items-center">
            <i className="bi bi-envelope-slash mr-2 text-lime-400"></i>
            Unsubscribe anytime
          </div>
          <div className="flex items-center">
            <i className="bi bi-calendar-week mr-2 text-lime-400"></i>
            Weekly updates
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
