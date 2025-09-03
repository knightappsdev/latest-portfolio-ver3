import React, { useState, useEffect } from 'react';

const Hero: React.FC = () => {
  const [displayText, setDisplayText] = useState('');
  const fullText = 'Olufemi Olagbaju';
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = window.setTimeout(() => {
        setDisplayText(fullText.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 150);
      return () => window.clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    // Fallback to a professional placeholder
    target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face";
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-lime-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-lime-400/5 rounded-full blur-2xl animate-bounce-slow"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center lg:text-left lg:flex lg:items-center lg:justify-between">
          {/* Profile Image */}
          <div className="mb-8 lg:mb-0 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-lime-400 animate-glow">
                <img
                  src="/images/profile/profile-photo.jpg"
                  alt="Olufemi Olagbaju - UK Web Developer"
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                />
              </div>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-lime-400 rounded-full animate-ping"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-primary-500 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:order-1 lg:flex-1 lg:pr-12">
            <div className="mb-6">
              <p className="text-lime-400 text-lg sm:text-xl font-medium mb-2 animate-fade-in">
                Hello, I'm
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold text-white mb-4 animate-slide-up">
                {displayText}
                <span className="animate-pulse text-lime-400">|</span>
              </h1>
              <div className="text-xl sm:text-2xl lg:text-3xl text-gray-300 mb-6 animate-fade-in" style={{ animationDelay: '1s' }}>
                <span className="text-lime-400 font-semibold">Full Stack Developer</span> & 
                <span className="text-primary-400 font-semibold"> Digital Strategist</span>
              </div>
            </div>

            <p className="text-lg sm:text-xl text-gray-400 mb-8 max-w-2xl animate-fade-in" style={{ animationDelay: '1.5s' }}>
              Crafting exceptional digital experiences for over <span className="text-lime-400 font-semibold">10 years</span>. 
              Specializing in web development, mobile apps, digital marketing, and brand strategy.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '2s' }}>
              <a
                href="#portfolio"
                className="inline-flex items-center justify-center px-8 py-4 bg-lime-500 text-dark-900 font-semibold rounded-lg hover:bg-lime-400 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-lime-500/25"
              >
                <i className="bi bi-eye mr-2"></i>
                View My Work
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-lime-400 text-lime-400 font-semibold rounded-lg hover:bg-lime-400 hover:text-dark-900 transform hover:scale-105 transition-all duration-200"
              >
                <i className="bi bi-chat-dots mr-2"></i>
                Let's Talk
              </a>
            </div>

            {/* Social Links */}
            <div className="flex justify-center lg:justify-start space-x-6 mt-8 animate-fade-in" style={{ animationDelay: '2.5s' }}>
              <a href="#" className="text-gray-400 hover:text-lime-400 text-2xl transition-colors">
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-lime-400 text-2xl transition-colors">
                <i className="bi bi-github"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-lime-400 text-2xl transition-colors">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-lime-400 text-2xl transition-colors">
                <i className="bi bi-envelope"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#about" className="text-lime-400 text-2xl">
          <i className="bi bi-chevron-down"></i>
        </a>
      </div>
    </section>
  );
};

export default Hero;
