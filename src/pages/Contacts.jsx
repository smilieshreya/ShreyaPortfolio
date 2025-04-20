import React, { useState } from 'react';

function Contacts() {
  const [isDarkMode] = useState(false);

  return (
    <div className="min-h-screen p-12 font-neuehaas relative">
      {/* Glass panels */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-pink-200/10 blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-200/10 blur-3xl" />
      </div>
      
      {/* Content with glass effect */}
      <div className="relative z-10 backdrop-blur-sm bg-[#F8603E]/10 rounded-3xl p-12 pt-4 mt-12 border border-white/10 shadow-xl">
        <h1 className="text-8xl font-bold mb-12 mt-12"
            style={{ 
              fontFamily: 'NeueHaasDisplay, apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
              color: '#F8603E',
              textShadow: '1px 1px 1px #d63822, 2px 2px 1px #d63822, 3px 3px 1px #d63822, 4px 4px 1px #d63822, 5px 5px 1px #d63822, 6px 6px 1px #d63822'
            }}>
          {["LET'S", "TALK", "ABOUT"].map((word, wordIndex) => (
            <React.Fragment key={wordIndex}>
              {word.split('').map((letter, letterIndex) => (
                <span 
                  key={`${wordIndex}-${letterIndex}`}
                  className="inline-block animate-fadeIn"
                  style={{ 
                    animationDelay: `${0.2 + (wordIndex * word.length + letterIndex) * 0.1}s`,
                  }}
                >
                  {letter}
                </span>
              ))}
              {wordIndex < 2 && <span className="mr-4"></span>}
            </React.Fragment>
          ))}
          <br />
          {["THE", "PROJECT?"].map((word, wordIndex) => (
            <React.Fragment key={wordIndex}>
              {word.split('').map((letter, letterIndex) => (
                <span 
                  key={`${wordIndex}-${letterIndex}`}
                  className="inline-block animate-fadeIn"
                  style={{ 
                    animationDelay: `${0.4 + (wordIndex * word.length + letterIndex) * 0.1}s`,
                  }}
                >
                  {letter}
                </span>
              ))}
              {wordIndex < 1 && <span className="mr-4"></span>}
            </React.Fragment>
          ))}
        </h1>

        <div className="grid grid-cols-4 gap-20 mt-4 backdrop-blur-md bg-white/10 rounded-2xl p-8">
          <div>
            <p className="text-sm mb-8 opacity-60">
              PLEASE CONTACT<br />ME IN ANY WAY<br />YOU LIKE
            </p>
            
            <div className="space-y-4">
              <h3 className="text-xl mb-2">SOCIAL</h3>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/not_shrexya/?next=%2F&hl=en" target="_blank" rel="noopener noreferrer" className="border border-dotted border-current rounded-full px-4 py-1 hover:opacity-60">IN</a>
                <a href="https://twitter.com/your-twitter" target="_blank" rel="noopener noreferrer" className="border border-dotted border-current rounded-full px-4 py-1 hover:opacity-60">TW</a>
                <a href="https://discord.com/your-discord" target="_blank" rel="noopener noreferrer" className="border border-dotted border-current rounded-full px-4 py-1 hover:opacity-60">DIS</a>
              </div>
              <div className="flex gap-4">
                <a href="https://www.linkedin.com/in/shreya-nimore-311222319" target="_blank" rel="noopener noreferrer" className="border border-dotted border-current rounded-full px-4 py-1 hover:opacity-60">LIN</a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg mb-4">CONTACTS</h3>
            <ul className="space-y-3 text-sm group">
              <li>
                <span className="opacity-60 text-xs">01</span>
                <a href="mailto:SHREYA23513@IIITD.AC.IN" className="block w-fit hover:border-b hover:border-dotted hover:border-current">SHREYA23513@IIITD.AC.IN</a>
              </li>
              <li>
                <span className="opacity-60 text-xs">03</span>
                <a href="#" className="block w-fit hover:border-b hover:border-dotted hover:border-current">TELEGRAM</a>
              </li>
              <li>
                <span className="opacity-60 text-xs">05</span>
                <a href="#" className="block w-fit hover:border-b hover:border-dotted hover:border-current">THREADS</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg mb-4">OTHER PAGES</h3>
            <ul className="space-y-3 text-sm group">
              <li>
                <span className="opacity-60 text-xs">01</span>
                <a href="/" className="block w-fit hover:border-b hover:border-dotted hover:border-current group-hover:border-b-0">HOME</a>
              </li>
              <li>
                <span className="opacity-60 text-xs">02</span>
                <a href="/about" className="block w-fit hover:border-b hover:border-dotted hover:border-current group-hover:border-b-0">ABOUT</a>
              </li>
              <li>
                <span className="opacity-60 text-xs">03</span>
                <a href="/projects" className="block w-fit hover:border-b hover:border-dotted hover:border-current group-hover:border-b-0">PROJECTS</a>
              </li>
              <li>
                <span className="opacity-60 text-xs">04</span>
                <a href="/contacts" className="block w-fit border-b border-dotted border-current group-hover:border-b-0">CONTACTS</a>
              </li>
            </ul>
          </div>

          <div className="text-right">
            <a href="#" className="wave-button inline-block">
              Send a request
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contacts;
