import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
  ];

  const services = [
    'Web Development',
    'Mobile App Development',
    'Digital Marketing',
    'Brand Strategy',
    'UI/UX Design',
    'SEO Optimization',
  ];

  return (
    <footer className="bg-dark-950 border-t border-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-lime-400 mb-2">Olufemi Olagbaju</h3>
              <p className="text-gray-400 text-lg mb-4">
                Full Stack Developer & Digital Strategist
              </p>
              <p className="text-gray-500 leading-relaxed">
                Transforming ideas into exceptional digital experiences. With over 10 years 
                of expertise in web development, mobile apps, digital marketing, and branding.
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {[
                { icon: 'bi-linkedin', url: '#', label: 'LinkedIn' },
                { icon: 'bi-github', url: '#', label: 'GitHub' },
                { icon: 'bi-twitter', url: '#', label: 'Twitter' },
                { icon: 'bi-envelope', url: 'mailto:hello@olufemi.dev', label: 'Email' },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  aria-label={social.label}
                  className="w-10 h-10 bg-dark-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-lime-400 hover:bg-dark-700 transition-all duration-200"
                >
                  <i className={`${social.icon} text-lg`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-lime-400 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index} className="text-gray-400">
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-dark-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-500 text-sm mb-4 md:mb-0">
              © {currentYear} Olufemi Olagbaju. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <a href="#" className="hover:text-lime-400 transition-colors">
                Privacy Policy
              </a>
              <span>•</span>
              <a href="#" className="hover:text-lime-400 transition-colors">
                Terms of Service
              </a>
              <span>•</span>
              <div className="flex items-center">
                <span>Powered by </span>
                <span className="text-lime-400 font-semibold ml-1">Websparks AI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
