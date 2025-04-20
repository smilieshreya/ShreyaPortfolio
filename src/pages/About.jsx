import React, { useContext } from 'react'
import { FaGithub, FaLinkedin, FaFileAlt } from 'react-icons/fa'
import { SiHackerrank } from 'react-icons/si'
import { ThemeContext } from '../App'

function About() {
  const { isDarkMode } = useContext(ThemeContext)

  return (
    <div className="min-h-screen p-12 font-neuehaas relative">
      {/* Background grid — assuming this is via CSS or another div */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-pink-200/10 blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-200/10 blur-3xl" />
      </div>

      {/* CONTENT */}
      <div className="max-w-5xl mx-auto mt-16">
        <h1 className="text-8xl font-bold mb-16"
            style={{ 
              fontFamily: 'NeueHaasDisplay, apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
              color: '#F8603E',
              textShadow: '1px 1px 1px #d63822, 2px 2px 1px #d63822, 3px 3px 1px #d63822, 4px 4px 1px #d63822, 5px 5px 1px #d63822, 6px 6px 1px #d63822'
            }}>
          {['A','B','O','U','T'].map((letter, index) => (
            <span 
              key={index} 
              className="inline-block animate-fadeIn"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              {letter}
            </span>
          ))}
        </h1>
        
        <div className="grid grid-cols-2 gap-20 p-12 rounded-2xl backdrop-blur-md bg-[#F8603E]/10 border border-[#F8603E]/20 shadow-xl">
          <div>
            <h2 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-yellow-100' : 'text-orange-800'}`}>BACKGROUND</h2>
            <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-yellow-100' : 'text-orange-900'}`}>
              Currently pursuing BTech at IIIT Delhi, focusing on the intersection 
              of technology and design. My approach combines technical expertise 
              with creative problem-solving.
            </p>
            
            <div className={`mt-8 flex gap-6 ${isDarkMode ? 'text-yellow-100' : 'text-orange-900'}`}>
              <a href="https://drive.google.com/file/d/1oLvC7TVwd_z6E3DRQHDIBcuTK27xhClH/view?usp=sharing" 
                className="text-2xl hover:text-orange-600 transition-colors"
                target="_blank" rel="noopener noreferrer">
                <FaFileAlt />
              </a>
              <a href="https://www.linkedin.com/in/shreya-nimore-311222319" 
                className="text-2xl hover:text-orange-600 transition-colors"
                target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </a>
              <a href="https://github.com/smilieshreya" 
                className="text-2xl hover:text-orange-600 transition-colors"
                target="_blank" rel="noopener noreferrer">
                <FaGithub />
              </a>
              <a href="https://www.hackerrank.com/profile/shreya23513" 
                className="text-2xl hover:text-orange-600 transition-colors"
                target="_blank" rel="noopener noreferrer">
                <SiHackerrank />
              </a>
            </div>
          </div>
          
          <div>
            <h2 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-yellow-100' : 'text-orange-800'}`}>SKILLS</h2>
            <div className={`grid grid-cols-2 gap-8 ${isDarkMode ? 'text-yellow-100' : 'text-orange-900'}`}>
              <div>
                <h3 className="text-xl font-bold mb-4">Technical</h3>
                <ul className="space-y-2">
                  <li>Web Development</li>
                  <li>UI/UX Design</li>
                  <li>Python, Cpp, Java</li>
                  <li>Libgdx</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Creative</h3>
                <ul className="space-y-2">
                  <li>Visual Design</li>
                  <li>Figma, Adobe Suite</li>
                  <li>Digital Art</li>
                  <li>Singing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
