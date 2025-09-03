import React, { useState } from 'react';
import { sendEmailWithFallback } from '../services/serverEmailService';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setShowError(false);
    setErrorMessage('');

    try {
      const result = await sendEmailWithFallback(formData);

      if (result.success) {
        setShowSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        // Hide success message after 5 seconds
        window.setTimeout(() => setShowSuccess(false), 5000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error: any) {
      console.error('Error sending message:', error);
      setShowError(true);
      setErrorMessage(error.message || 'Failed to send message. Please try again or contact me directly via email or WhatsApp.');
      // Hide error message after 5 seconds
      window.setTimeout(() => {
        setShowError(false);
        setErrorMessage('');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: 'bi-envelope',
      title: 'Email',
      value: 'connect@ofemo.uk',
      link: 'mailto:connect@ofemo.uk'
    },
    {
      icon: 'bi-phone',
      title: 'Phone',
      value: '+44 (0) 7756 183 484',
      link: 'tel:+447756183484'
    },
    {
      icon: 'bi-whatsapp',
      title: 'WhatsApp',
      value: '+44 (0) 7756 183 484',
      link: 'https://wa.me/447756183484?text=Hello! I found your portfolio and would like to discuss a project with you.'
    },
    {
      icon: 'bi-geo-alt',
      title: 'Location',
      value: 'London, United Kingdom',
      link: '#'
    },
    {
      icon: 'bi-clock',
      title: 'Response Time',
      value: 'Within 24 hours',
      link: '#'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">
            Let's <span className="text-lime-400">Connect</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Ready to bring your ideas to life? Let's discuss your project and 
            create something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8">
              Get in <span className="text-lime-400">Touch</span>
            </h3>
            
            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.link}
                  target={info.link.startsWith('http') ? '_blank' : '_self'}
                  rel={info.link.startsWith('http') ? 'noopener noreferrer' : ''}
                  className="flex items-center p-4 bg-dark-800 rounded-xl border border-dark-700 hover:border-lime-400/50 transition-all duration-200 group"
                >
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 group-hover:bg-lime-500/30 transition-colors ${
                    info.icon === 'bi-whatsapp' ? 'bg-green-500/20' : 'bg-lime-500/20'
                  }`}>
                    <i className={`${info.icon} text-xl ${
                      info.icon === 'bi-whatsapp' ? 'text-green-400' : 'text-lime-400'
                    }`}></i>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{info.title}</h4>
                    <p className="text-gray-400">{info.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Follow Me</h4>
              <div className="flex space-x-4">
                {[
                  { icon: 'bi-linkedin', url: '#', color: 'hover:text-blue-400' },
                  { icon: 'bi-github', url: '#', color: 'hover:text-gray-300' },
                  { icon: 'bi-twitter', url: '#', color: 'hover:text-blue-400' },
                  { icon: 'bi-instagram', url: '#', color: 'hover:text-pink-400' },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className={`w-12 h-12 bg-dark-800 rounded-lg flex items-center justify-center text-gray-400 ${social.color} border border-dark-700 hover:border-lime-400/50 transition-all duration-200`}
                  >
                    <i className={`${social.icon} text-xl`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-dark-800 rounded-2xl p-8 border border-dark-700">
            <h3 className="text-2xl font-bold text-white mb-6">
              Send a <span className="text-lime-400">Message</span>
            </h3>

            {showSuccess && (
              <div className="mb-6 p-4 bg-lime-500/20 border border-lime-500/50 rounded-lg">
                <div className="flex items-center text-lime-400">
                  <i className="bi bi-check-circle mr-2"></i>
                  <span>Message sent successfully! I'll get back to you soon.</span>
                </div>
              </div>
            )}

            {showError && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
                <div className="flex items-center text-red-400">
                  <i className="bi bi-exclamation-circle mr-2"></i>
                  <span>{errorMessage}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-lime-400 transition-colors"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-lime-400 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-lime-400 transition-colors"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-lime-400 transition-colors resize-none"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-lime-500 text-dark-900 font-semibold rounded-lg hover:bg-lime-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <i className="bi bi-arrow-clockwise animate-spin mr-2"></i>
                    Sending...
                  </>
                ) : (
                  <>
                    <i className="bi bi-send mr-2"></i>
                    Send Message
                  </>
                )}
              </button>
            </form>

            {/* Alternative Contact Methods */}
            <div className="mt-6 pt-6 border-t border-dark-700">
              <p className="text-gray-400 text-sm text-center mb-4">
                Or reach out directly via:
              </p>
              <div className="flex justify-center space-x-4">
                <a
                  href="mailto:connect@ofemo.uk"
                  className="flex items-center px-4 py-2 bg-dark-700 text-gray-300 rounded-lg hover:bg-dark-600 hover:text-lime-400 transition-colors"
                >
                  <i className="bi bi-envelope mr-2"></i>
                  Email
                </a>
                <a
                  href="https://wa.me/447756183484?text=Hello! I found your portfolio and would like to discuss a project with you."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors"
                >
                  <i className="bi bi-whatsapp mr-2"></i>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
