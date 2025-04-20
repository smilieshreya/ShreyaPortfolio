import './index.css'
import { useEffect, useState, useRef, createContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import About from './pages/About'
import Projects from './pages/Projects'
import Contacts from './pages/Contacts'
import Spline from '@splinetool/react-spline'

export const ThemeContext = createContext(null)

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [currentColor, setCurrentColor] = useState('#000000')
  const [isDrawing, setIsDrawing] = useState(false)
  const [isEraser, setIsEraser] = useState(false)
  const [penSize, setPenSize] = useState(3)
  const [eraserSize, setEraserSize] = useState(20)
  const [showSizeControl, setShowSizeControl] = useState(null) // 'pen' or 'eraser' or null
  const [isDrawingMode, setIsDrawingMode] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const canvasRef = useRef(null)
  const lastPosRef = useRef(null)
  const audioRef = useRef(new Audio('/music/sound.mp3'))

  const toggleTheme = (theme) => {
    setIsDarkMode(theme === 'dark')
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document.body.className = theme === 'dark' ? 'dark-mode' : 'light-mode'
    localStorage.setItem('theme', theme) // Save theme preference
  }

  const isNightTime = () => {
    const hours = new Date().getHours()
    return hours < 6 || hours >= 18
  }

  useEffect(() => {
    // Set theme based on time of day if no preference is saved
    const savedTheme = localStorage.getItem('theme')
    const defaultTheme = isNightTime() ? 'dark' : 'light'
    toggleTheme(savedTheme || defaultTheme)
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    audio.loop = true
    return () => {
      audio.pause()
      audio.currentTime = 0
    }
  }, [])

  const toggleMusic = () => {
    const audio = audioRef.current
    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const startDrawing = (e) => {
    setIsDrawing(true)
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    lastPosRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }
  }

  const stopDrawing = () => {
    setIsDrawing(false)
    lastPosRef.current = null
  }

  const draw = (e) => {
    if (!isDrawing || !canvasRef.current) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()
    const currentPos = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }
    
    ctx.beginPath()
    if (isEraser) {
      ctx.globalCompositeOperation = 'destination-out'
      ctx.strokeStyle = 'rgba(0,0,0,1)'
      ctx.lineWidth = eraserSize
    } else {
      ctx.globalCompositeOperation = 'source-over'
      ctx.strokeStyle = currentColor
      ctx.lineWidth = penSize
    }
    ctx.lineCap = 'round'
    ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y)
    ctx.lineTo(currentPos.x, currentPos.y)
    ctx.stroke()
    
    lastPosRef.current = currentPos
  }

  const handleEraser = () => {
    setIsEraser(prev => !prev)
    setCurrentColor(isEraser ? colors[0] : '#ffffff')
  }

  const closeDrawingMode = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setIsDrawingMode(false)
    const currentTheme = isDarkMode ? 'dark' : 'light'
    localStorage.setItem('theme', currentTheme)
  }

  const setupCanvas = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      // Set canvas size to be slightly smaller than window
      canvas.width = window.innerWidth * 0.8
      canvas.height = window.innerHeight * 0.8
      const ctx = canvas.getContext('2d')
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      setCurrentColor(colors[0])
      ctx.strokeStyle = colors[0]
      ctx.lineWidth = penSize
    }
  }

  const activateDrawingMode = () => {
    setIsDrawingMode(!isDrawingMode)
    if (!isDrawingMode) {
      setCurrentColor(colors[0])
      requestAnimationFrame(() => {
        setupCanvas()
      })
    }
  }

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
  }, [])

  const handleShare = async () => {
    try {
      const canvas = canvasRef.current;
      const dataUrl = canvas.toDataURL('image/png');
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], 'drawing.png', { type: 'image/png' });
      
      if (navigator.share) {
        await navigator.share({
          files: [file],
          title: 'My Drawing',
        });
      } else {
        // Fallback - download the image
        const link = document.createElement('a');
        link.download = 'drawing.png';
        link.href = dataUrl;
        link.click();
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const colors = [
    'rgba(255, 182, 193, 0.8)', // pastel pink
    'rgba(173, 216, 230, 0.8)', // pastel blue
    'rgba(255, 218, 185, 0.8)', // pastel peach
    'rgba(221, 160, 221, 0.8)', // pastel purple
  ]

  return (
    <ThemeContext.Provider value={{ isDarkMode }}>
      <Router>
        <div className={`min-h-screen ${
          isDarkMode 
            ? 'bg-[#1a1a1d] text-[#e2e2e2] bg-[linear-gradient(#2a2a2d_1px,transparent_1px),linear-gradient(90deg,#2a2a2d_1px,transparent_1px)] bg-[length:20px_20px]' 
            : 'bg-[#FAF7F3] text-[#472425] bg-[linear-gradient(#e0e0e0_1px,transparent_1px),linear-gradient(90deg,#e0e0e0_1px,transparent_1px)] bg-[length:20px_20px]'
        } p-8 relative overflow-hidden`}>
          {isDarkMode && (
            <>
              <div className="fixed top-[-30%] left-[-20%] w-[90%] h-[90%] rounded-full bg-[#ff69b415] blur-[180px] pointer-events-none opacity-60" />
              <div className="fixed bottom-[-30%] right-[-20%] w-[90%] h-[90%] rounded-full bg-[#0066ff15] blur-[180px] pointer-events-none opacity-60" />
            </>
          )}
          <nav className="absolute top-8 right-12 flex items-center gap-12 z-50">
            <ul className="flex items-center gap-12">
              <li><Link to="/" className="hover:opacity-75 text-2xl font-light tracking-wide">Home</Link></li>
              <li><Link to="/about" className="hover:opacity-75 text-2xl font-light tracking-wide">About</Link></li>
              <li><Link to="/projects" className="hover:opacity-75 text-2xl font-light tracking-wide">Projects</Link></li>
              <li><Link to="/contacts" className="hover:opacity-75 text-2xl font-light tracking-wide">Contacts</Link></li>
            </ul>
            <div className="flex items-center gap-4 pl-8 border-l border-opacity-20">
              <button
                className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 ${
                  !isDarkMode 
                  ? 'bg-gradient-to-br from-yellow-100 to-yellow-200 text-yellow-600 shadow-lg' 
                  : 'text-gray-400 hover:text-gray-200'
                }`}
                onClick={() => toggleTheme('light')}
                aria-label="Light mode"
              >
                <span className="text-xl">✧</span>
              </button>
              <button
                className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 ${
                  isDarkMode 
                  ? 'bg-gradient-to-br from-slate-700 to-slate-800 text-slate-200 shadow-lg' 
                  : 'text-gray-400 hover:text-gray-600'
                }`}
                onClick={() => toggleTheme('dark')}
                aria-label="Dark mode"
              >
                <span className="text-xl">☽</span>
              </button>
            </div>
          </nav>

          <Routes>
            <Route path="/about" element={
              <div className="min-h-screen">
                <About />
              </div>
            } />
            <Route path="/projects" element={
              <div className="min-h-screen">
                <Projects />
              </div>
            } />
            <Route path="/contacts" element={
              <div className="min-h-screen">
                <Contacts />
              </div>
            } />
            <Route path="/" element={
              <main className="max-w-5xl mx-auto mt-6 pl-0">
                <div className="fixed bottom-8 left-8 flex items-center gap-4 z-50">
                  <button
                    onClick={toggleMusic}
                    className="w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-xl bg-white/10 border border-white/30 shadow-lg
                      transition-all duration-300 hover:scale-110"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      {isPlaying ? (
                        <path d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" />
                      ) : (
                        <path d="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z" />
                      )}
                    </svg>
                  </button>
                  <button
                    onClick={activateDrawingMode}
                    className="w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-xl bg-white/10 border border-white/30 shadow-lg
                      transition-all duration-300 hover:scale-110"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
                    </svg>
                  </button>
                </div>

                {isDrawingMode && (
                  <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-4 relative">
                      <button
                        onClick={handleShare}
                        className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-xl bg-white/10 border border-white/30 shadow-lg
                          transition-all duration-300 hover:scale-110"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18,16.08C17.24,16.08 16.56,16.38 16.04,16.85L8.91,12.7C8.96,12.47 9,12.24 9,12C9,11.76 8.96,11.53 8.91,11.3L15.96,7.19C16.5,7.69 17.21,8 18,8A3,3 0 0,0 21,5A3,3 0 0,0 18,2A3,3 0 0,0 15,5C15,5.24 15.04,5.47 15.09,5.7L8.04,9.81C7.5,9.31 6.79,9 6,9A3,3 0 0,0 3,12A3,3 0 0,0 6,15C6.79,15 7.5,14.69 8.04,14.19L15.16,18.34C15.11,18.55 15.08,18.77 15.08,19C15.08,20.61 16.39,21.91 18,21.91C19.61,21.91 20.92,20.61 20.92,19A2.92,2.92 0 0,0 18,16.08Z" />
                        </svg>
                      </button>
                      <canvas
                        ref={canvasRef}
                        onMouseDown={startDrawing}
                        onMouseUp={stopDrawing}
                        onMouseOut={stopDrawing}
                        onMouseMove={draw}
                        className="cursor-crosshair bg-white/5 rounded-lg"
                      />
                      <div className="absolute bottom-8 left-8 flex flex-col gap-2 p-4 rounded-xl backdrop-blur-xl bg-white/10 border border-white/30 shadow-2xl scale-90">
                        <div className="flex flex-col gap-2">
                          {colors.map(color => (
                            <div key={color} className="relative">
                              <button
                                className={`w-8 h-8 rounded-full transition-all duration-300 hover:scale-110 
                                  ${currentColor === color && !isEraser ? 'ring-2 ring-white ring-offset-2 ring-offset-transparent scale-110' : ''}`}
                                style={{ 
                                  backgroundColor: color,
                                  boxShadow: 'inset 2px 2px 4px rgba(255,255,255,0.4), inset -2px -2px 4px rgba(0,0,0,0.1)'
                                }}
                                onClick={() => {
                                  setCurrentColor(color)
                                  setIsEraser(false)
                                  setShowSizeControl(showSizeControl === 'pen' ? null : 'pen')
                                }}
                              />
                              {showSizeControl === 'pen' && currentColor === color && (
                                <div className="absolute left-14 top-0 w-32 p-2 rounded-lg backdrop-blur-xl bg-white/10 border border-white/30 shadow-lg">
                                  <input
                                    type="range"
                                    min="1"
                                    max="10"
                                    value={penSize}
                                    onChange={(e) => setPenSize(Number(e.target.value))}
                                    className="w-full accent-white/70 cursor-pointer"
                                  />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                        
                        <div className="w-full h-px bg-white/20" />
                        
                        <div className="relative">
                          <button
                            className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm
                              transition-all duration-300 hover:scale-110 
                              ${isEraser ? 'bg-white/40 shadow-inner' : 'bg-white/20'}`}
                            onClick={() => {
                              handleEraser()
                              setShowSizeControl(showSizeControl === 'eraser' ? null : 'eraser')
                            }}
                          >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M16.24,3.56L21.19,8.5C21.97,9.29 21.97,10.55 21.19,11.34L12,20.53C10.44,22.09 7.91,22.09 6.34,20.53L2.81,17C2.03,16.21 2.03,14.95 2.81,14.16L13.41,3.56C14.2,2.78 15.46,2.78 16.24,3.56M4.22,15.58L7.76,19.11C8.54,19.9 9.8,19.9 10.59,19.11L14.12,15.58L9.17,10.63L4.22,15.58Z" />
                            </svg>
                          </button>
                          {showSizeControl === 'eraser' && isEraser && (
                            <div className="absolute left-14 top-0 w-32 p-2 rounded-lg backdrop-blur-xl bg-white/10 border border-white/30 shadow-lg">
                              <input
                                type="range"
                                min="10"
                                max="50"
                                value={eraserSize}
                                onChange={(e) => setEraserSize(Number(e.target.value))}
                                className="w-full accent-white/70 cursor-pointer"
                              />
                            </div>
                          )}
                        </div>
                        
                        <button
                          className="w-8 h-8 rounded-full flex items-center justify-center bg-white/20 backdrop-blur-sm
                            transition-all duration-300 hover:scale-110 hover:bg-red-200/30"
                          onClick={closeDrawingMode}
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                <h1 className="text-9xl font-bold mb-4 leading-tight absolute top-2 left-12"
                    style={{ 
                      fontFamily: 'NeueHaasDisplay, apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
                      color: isDarkMode ? '#F8603E' : '#F8603E',
                      textShadow: isDarkMode 
                        ? '1px 1px 1px #d63822, 2px 2px 1px #d63822, 3px 3px 1px #d63822, 4px 4px 1px #d63822, 5px 5px 1px #d63822, 6px 6px 1px #d63822' 
                        : '1px 1px 1px #d63822, 2px 2px 1px #d63822, 3px 3px 1px #d63822, 4px 4px 1px #d63822, 5px 5px 1px #d63822, 6px 6px 1px #d63822'
                    }}>
                  {['S','H','R','E','Y','A'].map((letter, index) => (
                    <span 
                      key={index} 
                      className="inline-block animate-fadeIn"
                      style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                    >
                      {letter}
                    </span>
                  ))}
                </h1>
                <h2 className="text-9xl font-bold mb-4 leading-tight absolute top-[7.2rem] left-12"
                    style={{ 
                      fontFamily: 'NeueHaasDisplay, apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
                      color: isDarkMode ? '#F8603E' : '#F8603E',
                      textShadow: isDarkMode 
                        ? '1px 1px 1px #d63822, 2px 2px 1px #d63822, 3px 3px 1px #d63822, 4px 4px 1px #d63822, 5px 5px 1px #d63822, 6px 6px 1px #d63822' 
                        : '1px 1px 1px #d63822, 2px 2px 1px #d63822, 3px 3px 1px #d63822, 4px 4px 1px #d63822, 5px 5px 1px #d63822, 6px 6px 1px #d63822'
                    }}>
                  {['N','I','M','O','R','E'].map((letter, index) => (
                    <span 
                      key={index} 
                      className="inline-block animate-fadeIn"
                      style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                    >
                      {letter}
                    </span>
                  ))}
                </h2>
                <div className="mt-32">
                  <h2 className="text-8xl font-bold text-right ml-auto absolute top-[29rem] right-12"
                      style={{ 
                        fontFamily: 'NeueHaasDisplay, apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
                        color: isDarkMode ? '#F8603E' : '#F8603E',
                        textShadow: isDarkMode 
                          ? '1px 1px 1px #d63822, 2px 2px 1px #d63822, 3px 3px 1px #d63822, 4px 4px 1px #d63822, 5px 5px 1px #d63822' 
                          : '1px 1px 1px #d63822, 2px 2px 1px #d63822, 3px 3px 1px #d63822, 4px 4px 1px #d63822, 5px 5px 1px #d63822'
                      }}>
                    {['D','E','S','I','G','N'].map((letter, index) => (
                      <span 
                        key={index} 
                        className="inline-block animate-fadeInRight"
                        style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                      >
                        {letter}
                      </span>
                    ))}
                  </h2>
                  <h3 className="text-9xl font-bold text-right ml-auto absolute top-[34rem] right-12"
                      style={{ 
                        fontFamily: 'NeueHaasDisplay, apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
                        color: isDarkMode ? '#F8603E' : '#F8603E',
                        textShadow: isDarkMode 
                          ? '1px 1px 1px #d63822, 2px 2px 1px #d63822, 3px 3px 1px #d63822, 4px 4px 1px #d63822, 5px 5px 1px #d63822' 
                          : '1px 1px 1px #d63822, 2px 2px 1px #d63822, 3px 3px 1px #d63822, 4px 4px 1px #d63822, 5px 5px 1px #d63822'
                      }}>
                    {['S','T','U','D','E','N','T'].map((letter, index) => (
                      <span 
                        key={index} 
                        className="inline-block animate-fadeInRight"
                        style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                      >
                        {letter}
                      </span>
                    ))}
                  </h3>
                </div>
                <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full h-screen z-10">
                  <Spline scene="https://prod.spline.design/WiWjGp5eWA1gejq5/scene.splinecode" />
                </div>
              </main>
            } />
          </Routes>
        </div>
      </Router>
    </ThemeContext.Provider>
  )
}

export default App