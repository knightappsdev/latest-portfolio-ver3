import React from 'react';

const Skills: React.FC = () => {
  const skillCategories = [
    {
      title: 'Web Development',
      icon: 'bi-code-slash',
      color: 'lime',
      skills: [
        { name: 'React/Next.js', level: 95 },
        { name: 'Node.js/Express', level: 90 },
        { name: 'TypeScript', level: 88 },
        { name: 'Python/Django', level: 85 },
      ]
    },
    {
      title: 'Mobile Development',
      icon: 'bi-phone',
      color: 'primary',
      skills: [
        { name: 'React Native', level: 90 },
        { name: 'Flutter', level: 85 },
        { name: 'iOS Development', level: 80 },
        { name: 'Android Development', level: 82 },
      ]
    },
    {
      title: 'Digital Marketing',
      icon: 'bi-graph-up-arrow',
      color: 'lime',
      skills: [
        { name: 'SEO/SEM', level: 92 },
        { name: 'Social Media Marketing', level: 88 },
        { name: 'Content Strategy', level: 85 },
        { name: 'Analytics & Insights', level: 90 },
      ]
    },
    {
      title: 'Branding & Design',
      icon: 'bi-palette',
      color: 'primary',
      skills: [
        { name: 'Brand Strategy', level: 88 },
        { name: 'UI/UX Design', level: 90 },
        { name: 'Graphic Design', level: 85 },
        { name: 'Brand Identity', level: 87 },
      ]
    },
  ];

  return (
    <section id="skills" className="py-20 bg-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">
            My <span className="text-lime-400">Skills</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A comprehensive skill set built over years of hands-on experience 
            across multiple disciplines in the digital landscape.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="bg-dark-900 rounded-2xl p-8 border border-dark-700 hover:border-lime-400/30 transition-all duration-300"
            >
              <div className="flex items-center mb-6">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${
                  category.color === 'lime' ? 'bg-lime-500/20' : 'bg-primary-500/20'
                }`}>
                  <i className={`${category.icon} text-2xl ${
                    category.color === 'lime' ? 'text-lime-400' : 'text-primary-400'
                  }`}></i>
                </div>
                <h3 className="text-2xl font-bold text-white">{category.title}</h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300 font-medium">{skill.name}</span>
                      <span className="text-lime-400 font-semibold">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-dark-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-1000 ${
                          category.color === 'lime' ? 'bg-lime-500' : 'bg-primary-500'
                        }`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Technologies */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-white mb-8">
            Technologies & <span className="text-lime-400">Tools</span>
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'MongoDB',
              'PostgreSQL', 'AWS', 'Docker', 'Git', 'Figma', 'Adobe Creative Suite',
              'Google Analytics', 'Facebook Ads', 'WordPress', 'Shopify'
            ].map((tech, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-dark-700 text-gray-300 rounded-full border border-dark-600 hover:border-lime-400/50 hover:text-lime-400 transition-all duration-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
