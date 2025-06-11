"use client"

import { useState, useEffect, useRef } from "react"
import Baby from "./../Images/baby.png"
import { useNavigate } from "react-router-dom"

const Sad = () => {
  const [fadeIn, setFadeIn] = useState(false)
  const [slideAwayTriggered, setSlideAwayTriggered] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [hammerTime, setHammerTime] = useState(false)
  const [babyVisible, setBabyVisible] = useState(false)
  const [babyWalking, setBabyWalking] = useState(false)
  const [hammerSwing, setHammerSwing] = useState(false)
  const [showReplacement, setShowReplacement] = useState(false)
  const [runawayVisible, setRunawayVisible] = useState(true)
  const [buttonPosition, setButtonPosition] = useState({ left: "50%", top: "60%", transform: "translateX(-50%)" })
  const [babyPosition, setBabyPosition] = useState({ bottom: "150px", left: "100px" })
  const [buttonPieces, setButtonPieces] = useState([])
  const [raindrops, setRaindrops] = useState([])
  const [currentTheme] = useState("teddy") // You can make this dynamic if needed
  const runawayBtnRef = useRef(null)
  const replacementBtnRef = useRef(null)
  const navigate = useNavigate()

  const getThemeConfig = () => {
    const themes = {
      teddy: {
        name: "Teddy Bear",
        primary: "from-gray-800 via-amber-900 to-orange-900",
        cardBg: "bg-gradient-to-br from-amber-50/90 to-orange-50/90 backdrop-blur-sm border-4 border-amber-300",
        titleColor: "text-amber-800",
        textColor: "text-amber-700",
        emoji: "🧸",
        sadEmoji: "😢",
        decorativeEmojis: ["🧸", "💔", "😢", "🌧️"],
        pattern: "teddy-pattern-dark",
      },
      princess: {
        name: "Disney Princess",
        primary: "from-gray-900 via-purple-900 to-pink-900",
        cardBg: "bg-gradient-to-br from-pink-50/90 to-purple-50/90 backdrop-blur-sm border-4 border-pink-300",
        titleColor: "text-pink-700",
        textColor: "text-purple-700",
        emoji: "👸",
        sadEmoji: "😭",
        decorativeEmojis: ["👸", "💔", "😭", "🌧️"],
        pattern: "princess-pattern-dark",
      },
      dinosaur: {
        name: "Cute Dinosaur",
        primary: "from-gray-900 via-green-900 to-teal-900",
        cardBg: "bg-gradient-to-br from-green-50/90 to-teal-50/90 backdrop-blur-sm border-4 border-green-300",
        titleColor: "text-green-700",
        textColor: "text-teal-700",
        emoji: "🦕",
        sadEmoji: "😿",
        decorativeEmojis: ["🦕", "💔", "😿", "🌧️"],
        pattern: "dinosaur-pattern-dark",
      },
    }
    return themes[currentTheme]
  }

  const theme = getThemeConfig()

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 100)
    initRaindrops()
  }, [])

  const initRaindrops = () => {
    const drops = []
    for (let i = 0; i < 50; i++) {
      drops.push({
        id: `drop-${i}`,
        left: Math.random() * 100,
        animationDelay: Math.random() * 3,
        duration: 2 + Math.random() * 2,
        opacity: Math.random() * 0.6 + 0.2,
      })
    }
    setRaindrops(drops)
  }

  const handleRunawayInteraction = (e) => {
    if (slideAwayTriggered || hammerTime) return

    const newAttempts = attempts + 1
    setAttempts(newAttempts)

    if (newAttempts >= 5 && !hammerTime) {
      setHammerTime(true)
      summonBabyWithHammer()
      return
    }

    // Get viewport dimensions
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    // Button dimensions
    const buttonWidth = 160
    const buttonHeight = 48

    // Calculate safe boundaries (with padding)
    const padding = 20
    const maxX = viewportWidth - buttonWidth - padding
    const minX = padding
    const maxY = viewportHeight - buttonHeight - padding
    const minY = padding

    // Generate random position within safe boundaries
    const newX = Math.floor(Math.random() * (maxX - minX)) + minX
    const newY = Math.floor(Math.random() * (maxY - minY)) + minY

    setButtonPosition({
      left: newX + "px",
      top: newY + "px",
      transform: "none",
    })

    // Occasionally slide away completely
    if (Math.random() < 0.15) {
      setSlideAwayTriggered(true)
      setTimeout(() => {
        setSlideAwayTriggered(false)
        // Reset to center after sliding away
        setButtonPosition({
          left: "50%",
          top: "60%",
          transform: "translateX(-50%)",
        })
      }, 1500)
    }
  }

  const summonBabyWithHammer = () => {
    const btnRect = runawayBtnRef.current?.getBoundingClientRect()
    if (!btnRect) return

    const btnCenterX = btnRect.left + btnRect.width / 2
    const btnCenterY = btnRect.top + btnRect.height / 2

    setBabyVisible(true)
    setBabyWalking(true)
    setBabyPosition({ bottom: "20px", left: "-120px" }) // Start from off-screen

    // Calculate target position near the button
    const targetLeft = btnCenterX - 150
    const targetBottom = window.innerHeight - btnCenterY - 60
    const steps = 15
    let step = 0

    const walkInterval = setInterval(() => {
      if (step < steps) {
        const progress = step / steps
        const newLeft = -120 + (targetLeft + 120) * progress
        const newBottom = 20 + (targetBottom - 20) * progress
        setBabyPosition({ left: newLeft + "px", bottom: newBottom + "px" })
        step++
      } else {
        clearInterval(walkInterval)
        setBabyWalking(false)
        setTimeout(() => {
          setHammerSwing(true)
          setTimeout(() => {
            createButtonPieces()
            setRunawayVisible(false)
            setTimeout(() => {
              setShowReplacement(true)
              setBabyWalking(true)
              // Walk baby off screen
              setBabyPosition({ left: "-120px", bottom: "20px" })

              setTimeout(() => {
                setBabyVisible(false)
                setBabyWalking(false)
                setHammerSwing(false)
              }, 1500)
            }, 1500)
          }, 1000)
        }, 500)
      }
    }, 100)
  }

  const createButtonPieces = () => {
    const btnRect = runawayBtnRef.current?.getBoundingClientRect()
    if (!btnRect) return

    const leftPiece = {
      id: "left",
      width: btnRect.width,
      height: btnRect.height,
      left: btnRect.left,
      top: btnRect.top,
      text: "I'm re",
      clipPath: "polygon(0 0, 50% 0, 60% 100%, 0 100%)",
      animation: "fallLeft 3s forwards cubic-bezier(0.42, 0, 0.58, 1)",
    }

    const rightPiece = {
      id: "right",
      width: btnRect.width,
      height: btnRect.height,
      left: btnRect.left,
      top: btnRect.top,
      text: "ally busy",
      clipPath: "polygon(50% 0, 100% 0, 100% 100%, 40% 100%)",
      animation: "fallRight 3s forwards cubic-bezier(0.42, 0, 0.58, 1)",
    }

    setButtonPieces([leftPiece, rightPiece])

    setTimeout(() => {
      setButtonPieces([])
    }, 3000)
  }

  const handleYesClick = () => {
    navigate("/happy")
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${theme.primary} flex items-center justify-center p-4 overflow-hidden relative font-cute`}
    >
      <div className={`absolute inset-0 ${theme.pattern} opacity-40`}></div>
      <div className="absolute inset-0 bg-storm-clouds opacity-40"></div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka+One:wght@400&family=Nunito:wght@400;600;700;800&display=swap');
        .font-cute {
          font-family: 'Nunito', 'Comic Neue', cursive;
        }

        .teddy-pattern-dark {
          background-image: 
            radial-gradient(circle at 20% 20%, rgba(245, 158, 11, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(251, 146, 60, 0.1) 0%, transparent 50%);
        }
        
        .princess-pattern-dark {
          background-image: 
            radial-gradient(circle at 25% 25%, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.1) 0%, transparent 50%);
        }
        
        .dinosaur-pattern-dark {
          background-image: 
            radial-gradient(circle at 30% 30%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 70% 70%, rgba(20, 184, 166, 0.1) 0%, transparent 50%);
        }

        .bg-storm-clouds {
          background-image: 
            radial-gradient(ellipse at 20% 30%, rgba(75, 85, 99, 0.8) 20%, transparent 60%),
            radial-gradient(ellipse at 80% 20%, rgba(55, 65, 81, 0.7) 25%, transparent 65%),
            radial-gradient(ellipse at 40% 60%, rgba(107, 114, 128, 0.6) 15%, transparent 50%),
            radial-gradient(ellipse at 70% 80%, rgba(75, 85, 99, 0.5) 30%, transparent 70%),
            radial-gradient(ellipse at 10% 80%, rgba(55, 65, 81, 0.4) 20%, transparent 60%);
          animation: driftClouds 30s ease-in-out infinite;
        }

        @keyframes driftClouds {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-20px); }
        }

        .raindrop {
          position: absolute;
          width: 2px;
          height: 15px;
          background: linear-gradient(to bottom, rgba(147, 197, 253, 0.8), rgba(59, 130, 246, 0.4));
          border-radius: 0 0 2px 2px;
          animation: rainfall linear infinite;
        }

        @keyframes rainfall {
          0% {
            transform: translateY(-100vh);
            opacity: 1;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }

        @keyframes floatReverse {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(15px); }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        .animate-float-reverse {
          animation: floatReverse 3.5s ease-in-out infinite;
        }

        .running-button {
          position: fixed;
          width: 160px;
          height: 48px;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          cursor: pointer;
        }

        .slide-away {
          animation: slideAway 1.5s ease-in-out;
        }

        @keyframes slideAway {
          0% {
            transform: translateX(0) rotate(0deg);
            opacity: 1;
          }
          50% {
            transform: translateX(200px) rotate(180deg);
            opacity: 0.5;
          }
          100% {
            transform: translateX(400px) rotate(360deg);
            opacity: 0;
          }
        }

        .fade-in {
          opacity: 1 !important;
          transition: opacity 0.5s ease-in-out;
        }

        .baby-character {
          position: fixed;
          width: 120px;
          height: 120px;
          z-index: 1001;
          transition: bottom 0.3s ease-in-out, left 0.3s ease-in-out;
        }

        .baby-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .hammer {
          position: absolute;
          width: 40px;
          height: 80px;
          right: 8px;
          top: -50px;
          transform-origin: bottom right;
          transition: transform 0.3s ease-in-out;
        }

        .hammer-swing {
          animation: hammerSwing 1s ease-in-out;
        }

        @keyframes hammerSwing {
          0% { transform: rotate(0deg); }
          50% { transform: rotate(100deg); }
          100% { transform: rotate(0deg); }
        }

        .button-piece {
          position: fixed;
          background-color: #3B82F6;
          color: white;
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border-radius: 24px;
          z-index: 50;
        }

        @keyframes fallLeft {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(600px) rotate(-60deg); opacity: 0; }
        }

        @keyframes fallRight {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(600px) rotate(60deg); opacity: 0; }
        }

        .replacement-button {
          position: fixed;
          left: 50%;
          top: 60%;
          transform: translateX(-50%);
          width: 200px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 1s ease-in-out;
          pointer-events: none;
          z-index: 1000;
        }

        .replacement-button:hover {
          scale: 1.05;
          transition: ease-in-out;
          transition-duration: 0.5s;
        }

        .replacement-button.show {
          opacity: 1;
          pointer-events: all;
        }

        .crying-face {
            position: relative;
            width: 100px;
            height: 100px;
            background: linear-gradient(145deg, #FFE55C, #FFDB58);
            border-radius: 50%;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }

        .eyebrows {
            position: absolute;
            top: 25px;
            left: 0;
            right: 0;
            display: flex;
            justify-content: space-between;
            padding: 0 22.5px;
        }

        .eyebrow {
            width: 15px;
            height: 4px;
            background-color: #D4AC0D;
            border-radius: 5px;
            transform: rotate(-15deg);
        }

        .eyebrow.right {
            transform: rotate(15deg);
        }

        .eyes {
            position: absolute;
            top: 32.5px;
            left: 0;
            right: 0;
            display: flex;
            justify-content: space-between;
            padding: 0 25px;
        }

        .eye {
            width: 12.5px;
            height: 17.5px;
            background-color: #000;
            border-radius: 50%;
            position: relative;
        }

        .eye::after {
            content: '';
            position: absolute;
            top: 2.5px;
            right: 2.5px;
            width: 4px;
            height: 4px;
            background-color: white;
            border-radius: 50%;
        }

        .tear {
            position: absolute;
            width: 6px;
            height: 10px;
            background: linear-gradient(180deg, #87CEEB, #4682B4);
            border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
            animation: tear-drop 3s infinite;
        }

        .tear-left {
            left: 42.5px;
            top: 45px;
            animation-delay: 1s;
        }

        .tear-right {
            right: 42.5px;
            top: 45px;
            animation-delay: 1s;
        }

        @keyframes tear-drop {
            0% {
                opacity: 0;
                transform: translateY(-50px) scale(0.5);
            }
            20% {
                opacity: 1;
                transform: translateY(0px) scale(1);
            }
            80% {
                opacity: 1;
                transform: translateY(20px) scale(1);
            }
            100% {
                opacity: 0;
                transform: translateY(30px) scale(0.8);
            }
        }

        .mouth {
            position: absolute;
            bottom: 25px;
            left: 50%;
            transform: translateX(-50%);
            width: 30px;
            height: 15px;
            background-color: #8B4513;
            border-top-left-radius: 50px;
            border-top-right-radius: 50px;
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
        }

        .walking {
          animation: walking 0.5s infinite alternate;
        }

        @keyframes walking {
          0% { transform: translateY(0); }
          100% { transform: translateY(-10px); }
        }

        .card-shadow-cute {
          box-shadow: 
            0 20px 40px -10px rgba(0, 0, 0, 0.2), 
            0 10px 20px -5px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.6);
        }

        .cute-button {
          background: linear-gradient(135deg, #ec4899, #f97316); 
          box-shadow: 0 4px 15px rgba(255, 107, 157, 0.4);
          border: 2px solid rgba(255, 255, 255, 0.3);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .cute-button:hover {
          background: linear-gradient(135deg, #db2777, #ea580c); 
          box-shadow: 0 6px 20px rgba(255, 64, 129, 0.5);
          transform: scale(1.05) translateY(-2px);
        }

        .attempts-counter {
          position: fixed;
          top: 20px;
          left: 20px;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 10px 15px;
          border-radius: 20px;
          font-weight: bold;
          z-index: 1002;
        }
      `}</style>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {raindrops.map((drop) => (
          <div
            key={drop.id}
            className="raindrop"
            style={{
              left: drop.left + "%",
              animationDelay: drop.animationDelay + "s",
              animationDuration: drop.duration + "s",
              opacity: drop.opacity,
            }}
          />
        ))}
      </div>

      {/* Attempts Counter */}
      {attempts > 0 && !hammerTime && (
        <div className="attempts-counter">
          Attempts: {attempts}/5 {attempts >= 3 && "😤"}
        </div>
      )}

      {/* Runaway Button - Now positioned absolutely to float anywhere on screen */}
      {runawayVisible && (
        <button
          ref={runawayBtnRef}
          className={`running-button bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full ${slideAwayTriggered ? "slide-away" : ""} cute-button`}
          style={buttonPosition}
          onMouseEnter={handleRunawayInteraction}
          onTouchStart={(e) => {
            e.preventDefault()
            handleRunawayInteraction(e)
          }}
          onClick={(e) => {
            e.preventDefault()
            handleRunawayInteraction(e)
          }}
        >
          I'm really busy
        </button>
      )}

      {/* Replacement Button */}
      <button
        ref={replacementBtnRef}
        className={`replacement-button cute-button text-white font-bold py-3 px-6 rounded-full ${showReplacement ? "show" : ""}`}
        onClick={handleYesClick}
      >
        I'll make time for you {theme.emoji}😅
      </button>

      {/* Baby Character */}
      {babyVisible && (
        <div className={`baby-character ${babyWalking ? "walking" : ""}`} style={babyPosition}>
          <img src={Baby || "/placeholder.svg"} alt="Baby character" className="baby-image" />
          <div className={`hammer ${hammerSwing ? "hammer-swing" : ""}`}>
            <svg viewBox="0 0 40 80" width="40" height="80">
              <rect x="15" y="40" width="10" height="40" fill="#8B4513" />
              <rect x="5" y="30" width="30" height="15" fill="#A0522D" />
              <rect x="5" y="30" width="30" height="5" fill="#708090" />
            </svg>
          </div>
        </div>
      )}

      {/* Button Pieces */}
      {buttonPieces.map((piece) => (
        <div
          key={piece.id}
          className="button-piece"
          style={{
            width: piece.width + "px",
            height: piece.height + "px",
            left: piece.left + "px",
            top: piece.top + "px",
            clipPath: piece.clipPath,
            animation: piece.animation,
          }}
        >
          {piece.text}
        </div>
      ))}

      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className={`absolute ${i % 2 === 0 ? "animate-float" : "animate-float-reverse"} text-2xl opacity-30`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          >
            {theme.decorativeEmojis[i % theme.decorativeEmojis.length]}
          </div>
        ))}
      </div>

      {/* Main Card */}
      <div className="container max-w-md mx-auto z-10">
        <div
          className={`${theme.cardBg} rounded-3xl card-shadow-cute p-8 text-center transition-opacity duration-500 ${fadeIn ? "opacity-100" : "opacity-0"} relative overflow-hidden`}
        >
          <div className="absolute -top-2 -right-2 transform rotate-12 text-purple-500 text-4xl" aria-hidden="true">
            <span>💔</span>
          </div>

          <div className="mb-6 relative w-24 h-24 mx-auto">
            <div className="crying-face">
              <div className="eyebrows">
                <div className="eyebrow left"></div>
                <div className="eyebrow right"></div>
              </div>
              <div className="eyes">
                <div className="eye">
                  <div className="tear tear-left"></div>
                </div>
                <div className="eye">
                  <div className="tear tear-right"></div>
                </div>
              </div>
              <div className="mouth"></div>
            </div>
          </div>

          <h2 className={`text-2xl font-bold ${theme.titleColor} mb-4`} style={{ fontFamily: "Fredoka One, cursive" }}>
            Are you sure?? {theme.sadEmoji}
          </h2>
          <p className={`text-xl italic ${theme.textColor} mb-2 font-semibold`}>
            Don't you love me? <span className="text-2xl">💔</span>
          </p>
          <p className={`${theme.textColor} mb-6 opacity-80`}>
            I was really looking forward to our magical adventure together...
          </p>

          <div className="mb-6">
            <p className={`text-sm ${theme.textColor} opacity-75 mb-4`}>
              Try to click the "I'm really busy" button if you can catch it! 😏
            </p>
            {hammerTime && (
              <p className={`text-lg ${theme.titleColor} font-bold animate-pulse`}>🔨 Baby is coming to fix this! 🔨</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              className="cute-button text-white font-bold py-3 px-4 rounded-full transform transition-all duration-300 hover:scale-105 flex items-center justify-center"
              onClick={handleYesClick}
            >
              <span className="mr-2">❤️</span>Yes {theme.emoji}
            </button>
            <button
              className="cute-button text-white font-bold py-3 px-4 rounded-full transform transition-all duration-300 hover:scale-105 flex items-center justify-center"
              onClick={handleYesClick}
            >
              <span className="mr-2">❤️</span>Of course, Yes!! {theme.emoji}
            </button>
          </div>

          <div className="mt-4 text-center">
            <p className={`text-sm ${theme.textColor} opacity-75`}>
              Current theme: <span className="font-bold">{theme.name}</span> {theme.emoji}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sad
