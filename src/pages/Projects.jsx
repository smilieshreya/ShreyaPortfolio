import React, { useState, useEffect, useRef } from 'react';

function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [mounted, setMounted] = useState(false);
  const projectRefs = useRef([]);

  useEffect(() => {
    setMounted(true);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-slide');
            entry.target.style.opacity = '1';
          }
        });
      },
      { threshold: 0.1 }
    );

    projectRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const projects = [
    { 
      id: 6, 
      title: 'UNIBUDDY App Design', 
      image: '/work/work6.png',
      description: 'Application prototype to help students, to help settle in new city, Using Human Computer Interaction. This project was built using Figma.',
      link: 'https://www.figma.com/proto/nbx9rf17T42FnyIxrEPiI9/HiFi?type=design&node-id=134-10&t=DjT2emQXbFyFVZ9x-1&scaling=scale-down&page-id=0%253A1&starting-point-node-id=134%253A10&mode=design'
    },
    { 
      id: 7, 
      title: 'ISA Assembler and Simulator', 
      image: '/work/work7.png',
      description: 'The Computer Organisation project was built on the principle of developing a low Assembler and Simulator for the RISC ISA using python.',
      link: 'https://github.com/smilieshreya/CO-project'
    },
    { 
      id: 5, 
      title: 'Angry Birds Clone Game', 
      image: '/work/work5.png',
      description: 'A dynamic dashboard interface with real-time data visualization and interactive elements, built using modern web technologies and responsive design principles.',
      link: 'https://github.com/smilieshreya/AngryBirds'
    },
    { 
      id: 4, 
      title: 'Inventory and Store Management HiFi', 
      image: '/work/work2.png',
      description: 'Designed a high-fidelity prototype for an intuitive inventory and store management system. Focused on efficient product tracking, stock updates, and user-friendly dashboards.',
      link: 'https://www.figma.com/proto/CEdy10ctAb2NeorAj7Kuyr/WEBSITE?node-id=8-21&p=f&t=k2MCumAjz2kYxgCR-1&scaling=min-zoom&content-scaling=fixed&page-id=8%3A20&starting-point-node-id=8%3A21'
    },
    { 
      id: 1, 
      title: 'Convocation Poster', 
      image: '/work/work1.png',
      description: 'Created a visually striking convocation poster blending elegance with institutional identity. Emphasized celebration, academic pride, and ceremonial significance.'
    },
    { 
      id: 2, 
      title: 'Education App LoFi',
      image: '/work/work4.png',
      description: 'Developed a low-fidelity wireframe for an educational app targeting seamless learning experiences. Prioritized easy navigation, course tracking, and interactive features.',
      link: 'https://www.figma.com/design/GVeE7x7GAMrZP2Q7zPG0aR/Untitled?node-id=0-1&t=EGVoMZmu9WDiRU1A-1'
    },
    { 
      id: 3, 
      title: 'Zine Design', 
      image: '/work/work3.png',
      description: 'Designed a vibrant, theme-based zine combining experimental layouts and bold typography. Focused on storytelling through creative visuals and engaging narratives.'
    }
  ];

  return (
    <div className="min-h-screen p-12 font-neuehaas relative">
      {/* Glass panels */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-pink-200/10 blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-200/10 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 backdrop-blur-sm bg-[#F8603E]/10 rounded-3xl p-12 pt-12 mt-14 border border-white/10 shadow-xl">
          <h1 className="text-8xl font-bold mb-16"
              style={{ 
                fontFamily: 'NeueHaasDisplay, apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
                color: '#F8603E',
                textShadow: '1px 1px 1px #d63822, 2px 2px 1px #d63822, 3px 3px 1px #d63822, 4px 4px 1px #d63822, 5px 5px 1px #d63822, 6px 6px 1px #d63822'
              }}>
            {['P','R','O','J','E','C','T','S'].map((letter, index) => (
              <span 
                key={index} 
                className="inline-block animate-fadeIn"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                {letter}
              </span>
            ))}
          </h1>
          
          <div className="space-y-8 perspective-1000">
            {projects.map((project, index) => (
              <div
                key={project.id}
                ref={el => projectRefs.current[index] = el}
                className={`group relative overflow-visible rounded-xl backdrop-blur-md bg-white/2 border border-white/5 
                         opacity-0 hover:bg-white/10 ${index % 2 === 0 ? 'pl-12' : 'pr-12'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
                onClick={() => setSelectedProject(project)}
              >
                <div className={`flex items-center gap-8 p-6 hover:translate-x-2 transition-transform duration-500 
                              ${index % 2 === 0 ? '' : 'flex-row-reverse'}`}>
                  <div className={`relative ${index % 2 === 0 ? 'w-[65%]' : 'w-[35%]'} aspect-[16/9] flex-shrink-0`}>
                    <div className="absolute inset-0 rounded-lg bg-white/5 transform transition-transform duration-500 
                                group-hover:translate-z-12 group-hover:scale-110 group-hover:rotate-3">
                      <img 
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover rounded-lg transform transition-all duration-700 
                                 shadow-2xl group-hover:shadow-[0_25px_25px_-12px_rgba(0,0,0,0.6)]"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-2xl font-bold mb-4 transition-transform duration-500 
                                   group-hover:translate-x-2">
                        {project.title}
                      </h3>
                      {project.link && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#d63822]" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <p className="text-[#ffb4a2] dark:text-[#ffb4a2] line-clamp-2 transition-all duration-500 
                                group-hover:translate-x-2 group-hover:text-[#F8603E]">
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal with enhanced animation */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50"
             onClick={() => setSelectedProject(null)}>
          <div 
            className="bg-white/10 backdrop-blur-md p-8 rounded-2xl max-w-4xl w-full mx-4 relative
                     animate-[slideUp_0.3s_ease-out]"
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10
                       hover:bg-white/20 transition-colors duration-300"
            >
              ×
            </button>
            <div className="flex gap-8">
              <div className="flex-1 overflow-hidden rounded-lg">
                <img 
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-auto rounded-lg transform transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-light mb-4">{selectedProject.title}</h2>
                <p className="text-white/70 leading-relaxed mb-4">
                  {selectedProject.description}
                </p>
                {selectedProject.link && (
                  <a 
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors duration-300"
                  >
                    <span>View Project</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Projects;
