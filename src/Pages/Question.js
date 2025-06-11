"use client"

import { Heart, Clock, Eye, Pause, Type } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Question() {
  const [colorBlindMode, setColorBlindMode] = useState(false)
  const [animationsDisabled, setAnimationsDisabled] = useState(false)
  const [fontSize, setFontSize] = useState("normal")
  const [currentTheme, setCurrentTheme] = useState("teddy") // teddy, princess, dinosaur
  const navigate = useNavigate()

  const handleYesClick = () => {
    navigate("/prehappy")
  }

  const handleMaybeClick = () => {
    navigate("/presad")
  }

  const toggleColorBlindMode = () => {
    setColorBlindMode(!colorBlindMode)
  }

  const toggleAnimations = () => {
    setAnimationsDisabled(!animationsDisabled)
  }

  const cycleFontSize = () => {
    const sizes = ["normal", "large", "extra-large"]
    const currentIndex = sizes.indexOf(fontSize)
    const nextIndex = (currentIndex + 1) % sizes.length
    setFontSize(sizes[nextIndex])
  }

  const cycleTheme = () => {
    const themes = ["teddy", "princess", "dinosaur"]
    const currentIndex = themes.indexOf(currentTheme)
    const nextIndex = (currentIndex + 1) % themes.length
    setCurrentTheme(themes[nextIndex])
  }

  const getThemeConfig = () => {
    const themes = {
      teddy: {
        name: "Teddy Bear",
        primary: "from-amber-100 via-orange-100 to-yellow-100",
        cardBg: "bg-gradient-to-br from-amber-50 to-orange-50 border-4 border-amber-300 shadow-2xl",
        titleColor: "text-amber-800",
        textColor: "text-amber-700",
        buttonPrimary:
          "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg",
        buttonSecondary: "bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500 shadow-lg",
        emoji: "🧸",
        decorativeEmojis: ["🧸", "🍯", "🎀", "🌻", "🧸"],
        pattern: "teddy-pattern",
      },
      princess: {
        name: "Disney Princess",
        primary: "from-pink-100 via-purple-100 to-blue-100",
        cardBg: "bg-gradient-to-br from-pink-50 to-purple-50 border-4 border-pink-300 shadow-2xl",
        titleColor: "text-pink-700",
        textColor: "text-purple-700",
        buttonPrimary: "bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 shadow-lg",
        buttonSecondary:
          "bg-gradient-to-r from-purple-400 to-blue-400 hover:from-purple-500 hover:to-blue-500 shadow-lg",
        emoji: "👸",
        decorativeEmojis: ["👸", "👑", "🏰", "✨", "🌹"],
        pattern: "princess-pattern",
      },
      dinosaur: {
        name: "Cute Dinosaur",
        primary: "from-green-100 via-teal-100 to-blue-100",
        cardBg: "bg-gradient-to-br from-green-50 to-teal-50 border-4 border-green-300 shadow-2xl",
        titleColor: "text-green-700",
        textColor: "text-teal-700",
        buttonPrimary: "bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 shadow-lg",
        buttonSecondary: "bg-gradient-to-r from-teal-400 to-blue-400 hover:from-teal-500 hover:to-blue-500 shadow-lg",
        emoji: "🦕",
        decorativeEmojis: ["🦕", "🦖", "🌿", "🥚", "🌋"],
        pattern: "dinosaur-pattern",
      },
    }
    return colorBlindMode
      ? {
          ...themes[currentTheme],
          primary: "from-gray-100 via-blue-50 to-orange-50",
          cardBg: "bg-white border-4 border-blue-600",
          titleColor: "text-blue-800",
          textColor: "text-gray-900",
          buttonPrimary: "bg-blue-700 hover:bg-blue-800 border-4 border-blue-900",
          buttonSecondary: "bg-orange-600 hover:bg-orange-700 border-4 border-orange-800",
        }
      : themes[currentTheme]
  }

  const getFontSizeClasses = () => {
    switch (fontSize) {
      case "large":
        return {
          title: "text-4xl",
          emoji: "text-9xl",
          subtitle: "text-2xl",
          message: "text-3xl",
          button: "text-lg py-4 px-10",
          containerWidth: "max-w-3xl",
          textWrap: "whitespace-nowrap",
        }
      case "extra-large":
        return {
          title: "text-5xl",
          emoji: "text-9xl",
          subtitle: "text-3xl",
          message: "text-4xl",
          button: "text-xl py-5 px-12",
          containerWidth: "max-w-5xl",
          textWrap: "whitespace-nowrap",
        }
      default:
        return {
          title: "text-3xl",
          emoji: "text-8xl",
          subtitle: "text-xl",
          message: "text-2xl",
          button: "text-base py-3 px-8",
          containerWidth: "max-w-md",
          textWrap: "whitespace-softwrap",
        }
    }
  }

  const theme = getThemeConfig()
  const fontSizes = getFontSizeClasses()
  const shouldAnimate = !animationsDisabled

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 bg-gradient-to-br ${theme.primary} font-cute relative overflow-hidden`}
      role="main"
      aria-label="Dating invitation page"
    >
      <div className={`absolute inset-0 ${theme.pattern} opacity-20`} aria-hidden="true"></div>

      <div className="fixed top-4 right-4 z-50 flex gap-2 flex-wrap" role="toolbar" aria-label="Controls">
        <button
          onClick={cycleTheme}
          className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-pink-300 border-2 border-pink-200"
          aria-label={`Current theme: ${theme.name}. Click to change`}
          title="Change theme"
        >
          <span className="text-2xl">{theme.emoji}</span>
        </button>

        <button
          onClick={toggleColorBlindMode}
          className={`p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 ${colorBlindMode ? "ring-4 ring-blue-600 bg-blue-50" : ""}`}
          aria-label={colorBlindMode ? "Switch to standard colors" : "Switch to color-blind friendly colors"}
          aria-pressed={colorBlindMode}
          title="Toggle color-blind friendly mode"
        >
          <Eye className={`w-5 h-5 ${colorBlindMode ? "text-blue-700" : "text-gray-700"}`} />
        </button>

        <button
          onClick={toggleAnimations}
          className={`p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 ${animationsDisabled ? "ring-4 ring-red-600 bg-red-50" : ""}`}
          aria-label={animationsDisabled ? "Enable animations" : "Disable animations"}
          aria-pressed={animationsDisabled}
          title="Toggle animations"
        >
          <Pause className={`w-5 h-5 ${animationsDisabled ? "text-red-700" : "text-gray-700"}`} />
        </button>

        <button
          onClick={cycleFontSize}
          className={`p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 ${fontSize !== "normal" ? "ring-4 ring-green-600 bg-green-50" : ""} relative`}
          aria-label={`Current font size: ${fontSize}. Click to change`}
          title="Change font size"
        >
          <div className="flex flex-col items-center">
            <Type className={`w-4 h-4 ${fontSize !== "normal" ? "text-green-700" : "text-gray-700"} mb-1`} />
            <span className={`text-xs font-bold ${fontSize !== "normal" ? "text-green-700" : "text-gray-700"}`}>
              {fontSize === "normal" ? "N" : fontSize === "large" ? "L" : "XL"}
            </span>
          </div>
        </button>
      </div>

      {shouldAnimate && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className={`absolute animate-float ${i % 2 === 0 ? "animate-float-reverse" : ""}`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                opacity: Math.random() * 0.4 + 0.2,
                fontSize: `${Math.random() * 20 + 20}px`,
              }}
            >
              {theme.decorativeEmojis[i % theme.decorativeEmojis.length]}
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka+One:wght@400&family=Nunito:wght@400;600;700;800&display=swap');
        .font-cute {
          font-family: 'Nunito', 'Comic Neue', cursive;
        }
        
        .teddy-pattern {
          background-image: 
            radial-gradient(circle at 20% 20%, rgba(245, 158, 11, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(251, 146, 60, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, rgba(217, 119, 6, 0.05) 0%, transparent 50%);
        }
        
        .princess-pattern {
          background-image: 
            radial-gradient(circle at 25% 25%, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.05) 0%, transparent 50%);
        }
        
        .dinosaur-pattern {
          background-image: 
            radial-gradient(circle at 30% 30%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 70% 70%, rgba(20, 184, 166, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.05) 0%, transparent 50%);
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0) scale(1); }
          40% { transform: translateY(-30px) scale(1.1); }
          60% { transform: translateY(-15px) scale(1.05); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        @keyframes floatReverse {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(20px) rotate(-5deg); }
        }

        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(3deg); }
          75% { transform: rotate(-3deg); }
        }

        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        .animate-bounce-custom {
          animation: ${shouldAnimate ? "bounce 2s infinite" : "none"};
        }

        .animate-float {
          animation: ${shouldAnimate ? "float 3s ease-in-out infinite" : "none"};
        }

        .animate-float-reverse {
          animation: ${shouldAnimate ? "floatReverse 2.5s ease-in-out infinite" : "none"};
        }

        .animate-wiggle {
          animation: ${shouldAnimate ? "wiggle 1s ease-in-out infinite" : "none"};
        }

        .animate-heartbeat {
          animation: ${shouldAnimate ? "heartbeat 1.5s ease-in-out infinite" : "none"};
        }

        .card-shadow-cute {
          box-shadow: 
            0 20px 40px -10px rgba(0, 0, 0, 0.1), 
            0 10px 20px -5px rgba(0, 0, 0, 0.05),
            inset 0 1px 0 rgba(255, 255, 255, 0.6);
        }

        .button-cute {
          position: relative;
          overflow: hidden;
          transform: translateY(0);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .button-cute:hover {
          transform: translateY(-2px) scale(1.05);
        }

        .button-cute:active {
          transform: translateY(0) scale(0.98);
        }

        .button-cute::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.5s;
        }

        .button-cute:hover::before {
          left: 100%;
        }

        .sparkle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #fbbf24;
          border-radius: 50%;
          animation: sparkle 2s linear infinite;
        }

        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
          50% { opacity: 1; transform: scale(1) rotate(180deg); }
        }

        button:focus-visible {
          outline: 3px solid #ec4899;
          outline-offset: 2px;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-bounce-custom,
          .animate-float,
          .animate-float-reverse,
          .animate-wiggle,
          .animate-heartbeat {
            animation: none !important;
          }
        }
      `}</style>

      <div className={`container ${fontSizes.containerWidth} mx-auto z-10 relative transition-all duration-500 px-4`}>
        <div
          className={`${theme.cardBg} rounded-3xl card-shadow-cute p-6 md:p-8 text-center transition-all duration-500 ${fontSize === "normal" ? "min-h-[600px]" : "min-h-fit"} flex flex-col justify-center relative overflow-hidden`}
          role="dialog"
          aria-labelledby="invitation-title"
          aria-describedby="invitation-description"
        >
          {shouldAnimate && (
            <>
              <div className="sparkle" style={{ top: "10%", left: "10%", animationDelay: "0s" }}></div>
              <div className="sparkle" style={{ top: "20%", right: "15%", animationDelay: "0.5s" }}></div>
              <div className="sparkle" style={{ bottom: "15%", left: "20%", animationDelay: "1s" }}></div>
              <div className="sparkle" style={{ bottom: "25%", right: "10%", animationDelay: "1.5s" }}></div>
            </>
          )}

          <div
            className={`absolute -top-2 -right-2 transform rotate-12 text-4xl ${shouldAnimate ? "animate-heartbeat" : ""}`}
            aria-hidden="true"
          >
            <span>💖</span>
          </div>

          <div className="relative mb-6">
            <h1
              id="invitation-title"
              className={`${fontSizes.title} font-bold ${theme.titleColor} mb-2 ${colorBlindMode ? "underline decoration-4 decoration-blue-600" : ""} ${fontSizes.textWrap} font-cute`}
              style={{ fontFamily: "Fredoka One, cursive" }}
            >
              Will you go out with me?
            </h1>
          </div>

          <div
            className={`${fontSizes.emoji} mb-6 ${shouldAnimate ? "animate-bounce-custom" : ""} ${colorBlindMode ? "bg-blue-100 rounded-full p-4 inline-block mx-auto" : ""}`}
            role="img"
            aria-label="Heart eyes emoji"
          >
            {theme.emoji}
          </div>

          <p
            className={`${fontSizes.subtitle} ${theme.textColor} mb-4 ${colorBlindMode ? "font-bold border-l-4 border-blue-600 pl-4 mx-auto max-w-xs" : ""} ${fontSizes.textWrap} font-semibold`}
            id="invitation-description"
          >
            Please let's go on an adventure together!
          </p>

          <p
            className={`${fontSizes.message} font-bold ${theme.titleColor} mb-8 ${colorBlindMode ? "bg-blue-100 p-4 rounded-lg border-2 border-blue-600 mx-auto" : ""} ${fontSizes.textWrap} ${shouldAnimate ? "animate-wiggle" : ""}`}
          >
            I really want to spend magical time with you!
            <span role="img" aria-label="heart and pleading face emoji" className="inline-block ml-2">
              {" "}
              ❤️🥺
            </span>
          </p>

          <div
            className="flex flex-col sm:flex-row justify-center gap-4 mt-6"
            role="group"
            aria-label="Response options"
          >
            <button
              onClick={handleYesClick}
              className={`${theme.buttonPrimary} text-white font-bold ${fontSizes.button} rounded-full button-cute focus:outline-none focus:ring-4 focus:ring-pink-300 ${colorBlindMode ? "shadow-lg relative" : ""} ${fontSizes.textWrap} border-2 border-white/20`}
              aria-describedby="yes-description"
            >
              <Heart className="w-4 h-4 mr-2 inline animate-heartbeat" aria-hidden="true" />
              Yes! Let's go!
              <span className="ml-1">{theme.decorativeEmojis[0]}</span>
              {colorBlindMode && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                  ✓
                </span>
              )}
            </button>
            <div id="yes-description" className="sr-only">
              Accept the invitation to go out
            </div>

            <button
              onClick={handleMaybeClick}
              className={`${theme.buttonSecondary} text-white font-bold ${fontSizes.button} rounded-full button-cute focus:outline-none focus:ring-4 focus:ring-orange-300 mt-0 ${colorBlindMode ? "shadow-lg relative" : ""} ${fontSizes.textWrap} border-2 border-white/20`}
              aria-describedby="maybe-description"
            >
              <Clock className="w-4 h-4 mr-2 inline" aria-hidden="true" />
              Maybe later
              <span className="ml-1">😔</span>
              {colorBlindMode && (
                <span className="absolute -top-2 -right-2 bg-orange-900 text-white text-xs px-2 py-1 rounded-full font-bold">
                  ?
                </span>
              )}
            </button>
            <div id="maybe-description" className="sr-only">
              Politely decline for now but leave it open for the future
            </div>
          </div>

          {colorBlindMode && (
            <div className="mt-6 p-4 bg-gray-100 rounded-lg border-2 border-gray-400">
              <p className="text-sm text-gray-800 font-medium">
                🔵 First button = Yes! | 🟠 Second button = Maybe later
              </p>
            </div>
          )}

          <div className="mt-6 text-center">
            <p className={`text-sm ${theme.textColor} opacity-75`}>
              Current theme: <span className="font-bold">{theme.name}</span> {theme.emoji}
            </p>
          </div>
        </div>
      </div>

      <div className="sr-only" aria-live="polite" id="announcements">
        {colorBlindMode && "Color-blind friendly mode enabled with high contrast colors, patterns, and labels"}
        {animationsDisabled && "Animations disabled for reduced motion"}
        {fontSize !== "normal" && `Font size changed to ${fontSize}`}
        {`Current theme: ${theme.name}`}
      </div>
    </div>
  )
}

export default Question
