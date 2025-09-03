import React from 'react';

const About: React.FC = () => {
  const stats = [
    { number: '10+', label: 'Years Experience' },
    { number: '150+', label: 'Projects Completed' },
    { number: '50+', label: 'Happy Clients' },
    { number: '4', label: 'Core Specialties' },
  ];

  return (
    <section id="about" className="py-20 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">
            About <span className="text-lime-400">Me</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A passionate developer and digital strategist with a decade of experience 
            creating impactful solutions for businesses worldwide.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">
              My Journey in <span className="text-lime-400">Tech</span>
            </h3>
            <div className="space-y-4 text-gray-300 text-lg">
              <p>
                With over 10 years in the digital landscape, I've evolved from a curious 
                developer into a comprehensive digital strategist. My journey began with 
                simple websites and has grown to encompass full-stack development, 
                mobile applications, and strategic digital marketing.
              </p>
              <p>
                I believe in the power of technology to transform businesses and create 
                meaningful connections between brands and their audiences. Every project 
                I undertake is an opportunity to push boundaries and deliver exceptional results.
              </p>
              <p>
                My approach combines technical expertise with creative problem-solving, 
                ensuring that every solution is not just functional, but also engaging 
                and user-centric.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-dark-800 p-6 rounded-xl text-center border border-dark-700 hover:border-lime-400/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="text-3xl sm:text-4xl font-bold text-lime-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-dark-800 to-dark-700 rounded-2xl p-8 sm:p-12 border border-dark-600">
          <div className="text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">
              What Drives <span className="text-lime-400">Me</span>
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-lime-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="bi bi-lightbulb text-2xl text-lime-400"></i>
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">Innovation</h4>
                <p className="text-gray-400">
                  Constantly exploring new technologies and methodologies to stay ahead of the curve.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="bi bi-people text-2xl text-primary-400"></i>
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">Collaboration</h4>
                <p className="text-gray-400">
                  Building strong partnerships with clients and teams to achieve exceptional outcomes.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-lime-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="bi bi-award text-2xl text-lime-400"></i>
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">Excellence</h4>
                <p className="text-gray-400">
                  Delivering high-quality solutions that exceed expectations and drive results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
