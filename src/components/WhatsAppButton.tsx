import React, { useState } from 'react';

const WhatsAppButton: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const phoneNumber = '+447756183484';
  const message = 'Hello! I found your portfolio and would like to discuss a project with you.';
  
  const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Contact via WhatsApp"
      >
        {/* WhatsApp Icon */}
        <i className="bi bi-whatsapp text-2xl text-white"></i>
        
        {/* Pulse Animation */}
        <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></div>
        
        {/* Tooltip */}
        <div className={`absolute right-16 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
        }`}>
          <div className="bg-dark-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg border border-dark-700">
            Chat on WhatsApp
            <div className="absolute top-1/2 -right-1 transform -translate-y-1/2 w-2 h-2 bg-dark-800 rotate-45 border-r border-b border-dark-700"></div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default WhatsAppButton;
