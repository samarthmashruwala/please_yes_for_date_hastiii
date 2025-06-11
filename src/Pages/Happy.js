"use client"

import { Eye, Pause, Type, RotateCcw, Calendar, Heart } from "lucide-react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function Happy() {
  const [colorBlindMode, setColorBlindMode] = useState(false)
  const [animationsDisabled, setAnimationsDisabled] = useState(false)
  const [fontSize, setFontSize] = useState("normal")
  const [currentTheme, setCurrentTheme] = useState("teddy")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [flyingHearts, setFlyingHearts] = useState([])
  const [animationKey, setAnimationKey] = useState(0)
  const [dateError, setDateError] = useState("")
  const [showDateValidation, setShowDateValidation] = useState(false)
  const [showLoveCards, setShowLoveCards] = useState(false)
  const [currentCard, setCurrentCard] = useState(0)
  const [cardFlipped, setCardFlipped] = useState(false)
  const [validationGif, setValidationGif] = useState("")
  const navigate = useNavigate()
  const [whatsappNumber, setWhatsappNumber] = useState("7990469514")

  // Add these new state variables after the existing ones
  const [validationAttempts, setValidationAttempts] = useState(0)
  const [showSpecialValidation, setShowSpecialValidation] = useState(false)
  const [validationCharacter, setValidationCharacter] = useState("")
  const [blockingOverlay, setBlockingOverlay] = useState(false)
  const [shakingCalendar, setShakingCalendar] = useState(false)
  const [validationMessages, setValidationMessages] = useState([])

  // Date validation range
  // const minDate = "2025-07-01"
  // const maxDate = "2025-07-31"

  // Love cards data
  const loveCards = [
    {
      id: 1,
      color: "red",
      type: "Wild",
      emoji: "💖",
      message: "You make my heart skip a beat!",
      description: "This card represents how you make me feel butterflies every day",
      bgGradient: "from-red-400 to-pink-500",
    },
    {
      id: 2,
      color: "blue",
      type: "Draw 4",
      emoji: "💙",
      message: "4 reasons I love you: Your smile, laugh, kindness, and everything!",
      description: "Just like this powerful card, you're irreplaceable in my life",
      bgGradient: "from-blue-400 to-cyan-500",
    },
    {
      id: 3,
      color: "green",
      type: "Skip",
      emoji: "💚",
      message: "I want to skip to forever with you!",
      description: "Let's skip all the waiting and start our adventure together",
      bgGradient: "from-green-400 to-emerald-500",
    },
    {
      id: 4,
      color: "yellow",
      type: "Reverse",
      emoji: "💛",
      message: "You reversed my lonely days into happy ones!",
      description: "Before you, everything was backwards. Now it's perfect!",
      bgGradient: "from-yellow-400 to-orange-500",
    },
    {
      id: 5,
      color: "purple",
      type: "Wild Draw 4",
      emoji: "💜",
      message: "Wild about you! Draw 4 kisses from me!",
      description: "The most powerful card for the most amazing person",
      bgGradient: "from-purple-400 to-pink-500",
    },
  ]

  useEffect(() => {
    if (!animationsDisabled) {
      createFlyingHearts(50)
    }
  }, [animationsDisabled, animationKey])

  useEffect(() => {
    if (selectedDate && selectedTime) {
      setTimeout(() => {
        setShowLoveCards(true)
      }, 1000)
    }
  }, [selectedDate, selectedTime])

  const createFlyingHearts = (count) => {
    const hearts = Array.from({ length: count }, (_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 100,
      delay: Math.random() * 3000,
      duration: 3000 + Math.random() * 2000,
      size: 16 + Math.random() * 16,
    }))
    setFlyingHearts(hearts)

    setTimeout(() => {
      setFlyingHearts([])
    }, 6000)
  }

  // Replace the validateDate function with this enhanced version:
  const validateDate = (date) => {
    if (!date) return true

    const selectedDateObj = new Date(date)
    // const minDateObj = new Date(minDate)
    // const maxDateObj = new Date(maxDate)
    const currentYear = selectedDateObj.getFullYear()
    const currentMonth = selectedDateObj.getMonth() + 1 // getMonth() returns 0-11

    // Check if it's outside July 2025
    if (currentYear !== 2025 || currentMonth !== 7) {
      const newAttempts = validationAttempts + 1
      setValidationAttempts(newAttempts)

      // Escalating responses based on attempts
      if (newAttempts === 1) {
        setDateError("Oopsie! 😅 July 2025 is our special month! Pick a date between July 1-31, 2025!")
        setValidationGif("https://media.giphy.com/media/YKUvclrGYmDKXwtphf/giphy.gif")
        setValidationCharacter("😊")
      } else if (newAttempts === 2) {
        setDateError("Hey hey! 🙃 I said JULY 2025! That's our magical month together! ✨")
        setValidationGif("https://media.giphy.com/media/m85llaN7ZkFIHtURiC/giphy.gif")
        setValidationCharacter("🤨")
      } else if (newAttempts === 3) {
        setDateError("Seriously?! 😤 JULY 2025 ONLY! Are you testing my patience? 😏")
        setValidationCharacter("😤")
        setShakingCalendar(true)
        setTimeout(() => setShakingCalendar(false), 1000)
      } else if (newAttempts >= 4) {
        // Special blocking mode
        setShowSpecialValidation(true)
        setBlockingOverlay(true)
        setValidationCharacter("😈")
        setValidationMessages([
          "NOPE! Not happening! 🚫",
          "July 2025 or NOTHING! 💪",
          "I'm not letting you pick anything else! 😤",
          "You're stuck here until you pick July 2025! 😈",
          "This is for your own good! 💕",
        ])

        // Auto-close after showing all messages
        setTimeout(() => {
          setShowSpecialValidation(false)
          setBlockingOverlay(false)
          setDateError("Fine! I'll help you... July 2025 it is! 😌💖")
          setValidationCharacter("😌")
        }, 8000)
      }

      setShowDateValidation(true)
      return false
    }

    // Valid date in July 2025
    if (validationAttempts > 0) {
      setDateError("YAY! Perfect choice! 🎉 July 2025 is going to be AMAZING! 💖")
      setValidationCharacter("🥳")
      setValidationGif("")
      setShowDateValidation(true)

      // Auto-close success message
      setTimeout(() => {
        setShowDateValidation(false)
        setValidationAttempts(0)
      }, 2000)
    }

    return true
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
        celebrationEmoji: "🎉",
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
        celebrationEmoji: "✨",
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
        celebrationEmoji: "🌋",
        decorativeEmojis: ["🦕", "🦖", "🌿", "🥚", "🌋"],
        pattern: "dinosaur-pattern",
      },
    }
    return colorBlindMode
      ? {
          ...themes[currentTheme],
          primary: "from-sky-200 via-blue-100 to-teal-100",
          cardBg: "bg-white border-4 border-blue-600",
          titleColor: "text-blue-800",
          textColor: "text-gray-900",
          buttonPrimary: "bg-blue-700 hover:bg-blue-800 focus:ring-blue-500 border-4 border-blue-900",
          buttonSecondary: "bg-orange-600 hover:bg-orange-700 focus:ring-orange-500 border-4 border-orange-800",
        }
      : themes[currentTheme]
  }

  const handleDateChange = (date) => {
    if (validateDate(date)) {
      setSelectedDate(date)
    } else {
      setSelectedDate("")
    }
  }

  const handleTimeChange = (time) => {
    setSelectedTime(time)
  }

  const formatSelectedDateTime = () => {
    if (!selectedDate && !selectedTime) return ""

    let result = ""
    if (selectedDate) {
      const date = new Date(selectedDate)
      const dayName = date.toLocaleDateString("en-US", { weekday: "long" })
      const formattedDate = date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
      result += `${dayName}, ${formattedDate}`
    }

    if (selectedTime) {
      const [hours, minutes] = selectedTime.split(":")
      const time = new Date()
      time.setHours(Number.parseInt(hours), Number.parseInt(minutes))
      const formattedTime = time.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
      result += selectedDate ? ` at ${formattedTime}` : formattedTime
    }

    return result
  }

  const handleWhatsAppShare = () => {
    if (!selectedDate && !selectedTime) return

    const formattedDateTime = formatSelectedDateTime()
    const message = encodeURIComponent(`Hi cactus ! I'd love to go out with you on ${formattedDateTime}! ❤️🦕`)
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`

    window.open(whatsappUrl, "_blank")
  }

  const nextCard = () => {
    if (currentCard < loveCards.length - 1) {
      setCardFlipped(false)
      setTimeout(() => {
        setCurrentCard(currentCard + 1)
      }, 300)
    }
  }

  const prevCard = () => {
    if (currentCard > 0) {
      setCardFlipped(false)
      setTimeout(() => {
        setCurrentCard(currentCard - 1)
      }, 300)
    }
  }

  const flipCard = () => {
    setCardFlipped(!cardFlipped)
  }

  const handleRestart = () => {
    navigate("/")
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

  const getFontSizeClasses = () => {
    switch (fontSize) {
      case "large":
        return {
          title: "text-4xl",
          emoji: "text-6xl",
          subtitle: "text-xl",
          message: "text-2xl",
          button: "text-lg py-4 px-10",
          containerWidth: "max-w-3xl",
          label: "text-md",
          textWrap: "whitespace-nowrap",
        }
      case "extra-large":
        return {
          title: "text-4xl",
          emoji: "text-6xl",
          subtitle: "text-2xl",
          message: "text-3xl",
          label: "text-semibold",
          button: "text-xl py-5 px-12",
          containerWidth: "max-w-5xl",
          textWrap: "whitespace-nowrap",
        }
      default:
        return {
          title: "text-2xl",
          emoji: "text-6xl",
          subtitle: "text-xl",
          message: "text-2xl",
          label: "text-sm",
          button: "text-base py-3 px-8",
          containerWidth: "max-w-md",
          textWrap: "",
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
      aria-label="Date accepted celebration page"
    >
      <div className={`absolute inset-0 ${theme.pattern} opacity-30`} aria-hidden="true"></div>
      <div className="absolute inset-0 bg-celebration-sparkles opacity-40" aria-hidden="true"></div>

      {/* Date Validation Modal */}
      {showDateValidation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full mx-4 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-red-100 to-pink-100 opacity-50"></div>
            <div className="relative z-10">
              <div className="mb-4">
                <img
                  src={validationGif || "/placeholder.svg"}
                  alt="Validation animation"
                  className="w-32 h-32 mx-auto rounded-2xl shadow-lg"
                  onError={(e) => {
                    e.target.style.display = "none"
                  }}
                />
              </div>
              <div className="text-6xl mb-4  ">😅</div>
              <h3 className="text-2xl font-bold text-red-600 mb-4" style={{ fontFamily: "Fredoka One, cursive" }}>
                Oopsie!
              </h3>
              <p className="text-lg text-gray-700 mb-6 font-semibold">{dateError}</p>
              <div className="bg-yellow-100 border-2 border-yellow-300 rounded-lg p-3 mb-4">
                <p className="text-sm text-yellow-800 font-bold">📅 Valid dates: July 1-31, 2025 only!</p>
              </div>
              <button
                onClick={() => setShowDateValidation(false)}
                className="bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold py-3 px-6 rounded-full hover:from-pink-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105"
              >
                Got it! 💖
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Special Blocking Validation Modal */}
      {showSpecialValidation && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-red-500 to-pink-600 rounded-3xl p-6 max-w-md w-full mx-4 text-center relative overflow-hidden shadow-2xl border-4 border-white animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-pink-500 opacity-50 animate-pulse"></div>

            {/* Floating emojis */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute text-2xl  "
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${1 + Math.random()}s`,
                  }}
                >
                  {["🚫", "😤", "💪", "😈", "⚡"][Math.floor(Math.random() * 5)]}
                </div>
              ))}
            </div>

            <div className="relative z-10 text-white">
              <div className="text-8xl mb-4  ">{validationCharacter}</div>
              <h3 className="text-3xl font-bold mb-4 animate-pulse" style={{ fontFamily: "Fredoka One, cursive" }}>
                NOPE! NOT HAPPENING!
              </h3>

              <div className="space-y-3 mb-6">
                {validationMessages.map((message, index) => (
                  <div
                    key={index}
                    className={`text-lg font-bold p-2 bg-white bg-opacity-20 rounded-lg transform transition-all duration-500 ${
                      index * 1500 < (Date.now() % 10000) ? "scale-100 opacity-100" : "scale-0 opacity-0"
                    }`}
                    style={{
                      animationDelay: `${index * 1.5}s`,
                      animation: `slideInScale 0.5s ease-out ${index * 1.5}s forwards`,
                    }}
                  >
                    {message}
                  </div>
                ))}
              </div>

              <div className="bg-yellow-200 text-yellow-800 border-4 border-yellow-400 rounded-lg p-4 mb-4  ">
                <p className="font-bold text-lg">📅 ONLY JULY 1-31, 2025! 📅</p>
                <p className="text-sm">That's our special month! No exceptions! 💖</p>
              </div>

              <div className="text-sm opacity-90 animate-pulse">You're stuck here until you understand! 😈💕</div>
            </div>
          </div>
        </div>
      )}

      {/* Love Cards Modal */}
      {showLoveCards && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="max-w-lg w-full">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "Fredoka One, cursive" }}>
                My Love Cards for You! 💕
              </h2>
              <p className="text-white opacity-90">Click the card to flip it!</p>
            </div>

            <div className="relative">
              {/* UNO Card */}
              <div className={`uno-card ${cardFlipped ? "flipped" : ""}`} onClick={flipCard}>
                <div className="card-front">
                  <div
                    className={`w-80 h-96 mx-auto bg-gradient-to-br ${loveCards[currentCard].bgGradient} rounded-3xl shadow-2xl border-4 border-white relative overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105`}
                  >
                    {/* UNO Card Design */}
                    <div className="absolute top-4 left-4 bg-white rounded-full w-12 h-12 flex items-center justify-center">
                      <span className="text-2xl font-bold text-gray-800">{loveCards[currentCard].id}</span>
                    </div>
                    <div className="absolute top-4 right-4 bg-white rounded-full w-12 h-12 flex items-center justify-center">
                      <span className="text-2xl">{loveCards[currentCard].emoji}</span>
                    </div>

                    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                      <div className="text-8xl mb-4 animate-pulse">{loveCards[currentCard].emoji}</div>
                      <div className="bg-white bg-opacity-90 rounded-2xl p-4 mb-4">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{loveCards[currentCard].type}</h3>
                        <p className="text-lg text-gray-700 font-semibold">{loveCards[currentCard].message}</p>
                      </div>
                    </div>

                    <div className="absolute bottom-4 left-4 bg-white rounded-full w-12 h-12 flex items-center justify-center rotate-180">
                      <span className="text-2xl font-bold text-gray-800">{loveCards[currentCard].id}</span>
                    </div>
                    <div className="absolute bottom-4 right-4 bg-white rounded-full w-12 h-12 flex items-center justify-center rotate-180">
                      <span className="text-2xl">{loveCards[currentCard].emoji}</span>
                    </div>
                  </div>
                </div>

                <div className="card-back">
                  <div className="w-80 h-96 mx-auto bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl shadow-2xl border-4 border-white relative overflow-hidden cursor-pointer">
                    <div className="flex flex-col items-center justify-center h-full p-6 text-center text-white">
                      <div className="text-6xl mb-4">💝</div>
                      <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: "Fredoka One, cursive" }}>
                        Special Message
                      </h3>
                      <p className="text-lg leading-relaxed">{loveCards[currentCard].description}</p>
                      <div className="mt-4 text-4xl  ">{loveCards[currentCard].emoji}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center mt-6">
                <button
                  onClick={prevCard}
                  disabled={currentCard === 0}
                  className="bg-white bg-opacity-20 text-white font-bold py-2 px-4 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-opacity-30 transition-all duration-300"
                >
                  ← Previous
                </button>

                <div className="text-white font-bold">
                  {currentCard + 1} / {loveCards.length}
                </div>

                <button
                  onClick={nextCard}
                  disabled={currentCard === loveCards.length - 1}
                  className="bg-white bg-opacity-20 text-white font-bold py-2 px-4 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-opacity-30 transition-all duration-300"
                >
                  Next →
                </button>
              </div>

              <div className="text-center mt-4">
                <button
                  onClick={() => setShowLoveCards(false)}
                  className="bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold py-3 px-6 rounded-full hover:from-pink-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105"
                >
                  Close Cards 💖
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {shouldAnimate && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={`confetti-${i}`}
              className="absolute animate-confetti-fall"
              style={{
                left: `${Math.random() * 100}%`,
                top: "-10px",
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
                fontSize: `${Math.random() * 10 + 15}px`,
              }}
            >
              {theme.decorativeEmojis[i % theme.decorativeEmojis.length]}
            </div>
          ))}
        </div>
      )}

      <div className="fixed top-4 right-4 z-50 flex gap-2 flex-wrap" role="toolbar" aria-label="Accessibility controls">
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

        {selectedDate && selectedTime && (
          <button
            onClick={() => setShowLoveCards(true)}
            className="p-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-pink-300 animate-pulse"
            title="View Love Cards"
          >
            <Heart className="w-5 h-5" />
          </button>
        )}
      </div>

      {shouldAnimate && flyingHearts.length > 0 && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-20" aria-hidden="true">
          {flyingHearts.map((heart) => (
            <div
              key={heart.id}
              className="absolute animate-fly-up"
              style={{
                left: `${heart.left}%`,
                bottom: "-50px",
                animationDelay: `${heart.delay}ms`,
                animationDuration: `${heart.duration}ms`,
                fontSize: `${heart.size}px`,
              }}
            >
              {theme.decorativeEmojis[0]}
            </div>
          ))}
        </div>
      )}

      {shouldAnimate && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true" key={animationKey}>
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={`${animationKey}-${i}`}
              className={`absolute animate-float ${i % 2 === 0 ? "animate-float-reverse" : ""}`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                opacity: Math.random() * 0.4 + 0.2,
                fontSize: `${Math.random() * 15 + 20}px`,
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

        .bg-celebration-sparkles {
          background-image: 
            radial-gradient(circle at 15% 15%, rgba(255, 215, 0, 0.3) 0%, transparent 40%),
            radial-gradient(circle at 85% 85%, rgba(255, 105, 180, 0.3) 0%, transparent 40%),
            radial-gradient(circle at 50% 30%, rgba(124, 58, 237, 0.2) 0%, transparent 40%),
            radial-gradient(circle at 30% 80%, rgba(34, 197, 94, 0.3) 0%, transparent 40%);
        }

        .uno-card {
          perspective: 1000px;
        }

        .uno-card .card-front,
        .uno-card .card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          transition: transform 0.6s;
        }

        .uno-card .card-back {
          transform: rotateY(180deg);
        }

        .uno-card.flipped .card-front {
          transform: rotateY(180deg);
        }

        .uno-card.flipped .card-back {
          transform: rotateY(0deg);
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0) scale(1); }
          40% { transform: translateY(-20px) scale(1.1); }
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

        @keyframes flyUp {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(-120vh) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes confettiFall {
          0% {
            transform: translateY(-10px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        @keyframes slideInScale {
          0% {
            transform: scale(0) translateY(20px);
            opacity: 0;
          }
          100% {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }

        @keyframes megaShake {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          10% { transform: translateX(-10px) rotate(-2deg); }
          20% { transform: translateX(10px) rotate(2deg); }
          30% { transform: translateX(-15px) rotate(-3deg); }
          40% { transform: translateX(15px) rotate(3deg); }
          50% { transform: translateX(-20px) rotate(-4deg); }
          60% { transform: translateX(20px) rotate(4deg); }
          70% { transform: translateX(-15px) rotate(-3deg); }
          80% { transform: translateX(15px) rotate(3deg); }
          90% { transform: translateX(-10px) rotate(-2deg); }
        }

        .animate-mega-shake {
          animation: megaShake 0.8s ease-in-out infinite;
        }

        . -custom {
          animation: ${shouldAnimate ? "bounce 2s infinite" : "none"};
        }

        .animate-float {
          animation: ${shouldAnimate ? "float 3s ease-in-out infinite" : "none"};
        }

        .animate-float-reverse {
          animation: ${shouldAnimate ? "floatReverse 2.5s ease-in-out infinite" : "none"};
        }

        .animate-fly-up {
          animation: flyUp linear forwards;
        }

        .animate-confetti-fall {
          animation: confettiFall linear infinite;
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }

        .card-shadow-cute {
          box-shadow: 
            0 20px 40px -10px rgba(0, 0, 0, 0.1), 
            0 10px 20px -5px rgba(0, 0, 0, 0.05),
            inset 0 1px 0 rgba(255, 255, 255, 0.6);
        }

        button:focus-visible {
          outline: 3px solid #ec4899;
          outline-offset: 2px;
        }

        @media (prefers-reduced-motion: reduce) {
          . -custom,
          .animate-float,
          .animate-float-reverse,
          .animate-fly-up,
          .animate-confetti-fall,
          .animate-shake {
            animation: none !important;
          }
        }
      `}</style>

      <div className={`container ${fontSizes.containerWidth} mx-auto z-10 relative transition-all duration-500 px-4`}>
        <div
          className={`${theme.cardBg} rounded-3xl card-shadow-cute py-4 md:p-6 text-center transition-all duration-500 ${colorBlindMode ? "shadow-2xl" : ""} relative overflow-hidden`}
          role="dialog"
          aria-labelledby="celebration-title"
          aria-describedby="celebration-description"
        >
          <div
            className={`absolute -top-2 -right-2 transform rotate-12 text-4xl ${shouldAnimate ? " -custom" : ""}`}
            aria-hidden="true"
          >
            <span>{theme.celebrationEmoji}</span>
          </div>

          <div
            className={`${fontSizes.emoji} mb-2 ${shouldAnimate ? " -custom" : ""} ${colorBlindMode ? "bg-blue-100 rounded-full p-4 inline-block mx-auto" : ""}`}
            role="img"
            aria-label="Happy celebration emoji"
          >
            {theme.emoji}
          </div>

          <h1
            id="celebration-title"
            className={`${fontSizes.title} font-bold ${theme.titleColor} mb-3 ${colorBlindMode ? "underline decoration-4 decoration-blue-600" : ""} ${fontSizes.textWrap}`}
            style={{ fontFamily: "Fredoka One, cursive" }}
          >
            YAYAYAYYYYYY!
          </h1>

          <p
            className={`${fontSizes.subtitle} ${theme.textColor} mb-2 ${colorBlindMode ? "font-bold border-l-4 border-blue-600 pl-4 mx-auto max-w-xs" : ""} ${fontSizes.textWrap} font-semibold`}
            id="celebration-description"
          >
            Looking forward to our magical adventure!
          </p>

          <div className="mt-4 flex flex-col items-center">
            <p
              className={`${fontSizes.message} ${theme.titleColor} font-bold mb-2 ${colorBlindMode ? "bg-blue-100 p-2 rounded-lg border-2 border-blue-600" : ""}`}
            >
              Let me know when you're free:
            </p>

            <div className="flex flex-col gap-4 items-center justify-center w-full max-w-sm">
              <div className="flex flex-col gap-1 w-full">
                <label
                  htmlFor="date-input"
                  className={`${fontSizes.label} font-semibold ${theme.titleColor} flex items-center gap-2`}
                >
                  <Calendar className="w-5 h-5" />
                  Pick a date (July 2025 only):
                </label>
                <input
                  id="date-input"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => handleDateChange(e.target.value)}
                  disabled={blockingOverlay}
                  className={`${fontSizes.button} rounded-lg border-2 ${
                    dateError && validationAttempts < 4
                      ? "border-red-400 bg-red-50 animate-shake"
                      : blockingOverlay
                        ? "border-red-600 bg-red-100 cursor-not-allowed opacity-50"
                        : shakingCalendar
                          ? "border-orange-400 bg-orange-50 animate-mega-shake"
                          : colorBlindMode
                            ? "border-blue-400 focus:border-blue-600 bg-blue-50"
                            : `border-${theme.titleColor.split("-")[1]}-300 focus:border-${theme.titleColor.split("-")[1]}-500 bg-${theme.titleColor.split("-")[1]}-50`
                  } focus:outline-none focus:ring-2 focus:ring-pink-300 px-3 py-2 w-full font-cute transition-all duration-300 ${
                    shakingCalendar ? "animate-mega-shake" : ""
                  }`}
                />
                {dateError && <p className="text-red-500 text-sm mt-1 font-semibold  ">{dateError}</p>}
              </div>

              <div className="flex flex-col gap-1 w-full">
                <label
                  htmlFor="time-input"
                  className={`${fontSizes.label} font-semibold ${theme.titleColor} flex items-center gap-2`}
                >
                  <span className="text-xl">🕐</span> Pick a time:
                </label>
                <input
                  id="time-input"
                  type="time"
                  value={selectedTime}
                  onChange={(e) => handleTimeChange(e.target.value)}
                  className={`${fontSizes.button} rounded-lg border-2 ${colorBlindMode ? "border-blue-400 focus:border-blue-600 bg-blue-50" : `border-${theme.titleColor.split("-")[1]}-300 focus:border-${theme.titleColor.split("-")[1]}-500 bg-${theme.titleColor.split("-")[1]}-50`} focus:outline-none focus:ring-2 focus:ring-pink-300 px-3 py-2 w-full font-cute`}
                />
              </div>
            </div>

            {selectedDate && selectedTime && (
              <div
                className={`text-center mb-4 mt-4 w-full max-w-m ${colorBlindMode ? "bg-green-100 p-3 rounded-lg border-2 border-green-600" : "bg-gradient-to-r from-green-100 to-teal-100 p-3 rounded-lg border-2 border-green-300"} shadow-lg  -custom`}
              >
                <p
                  className={`${fontSizes.message} ${theme.titleColor} font-semibold flex items-center justify-center gap-2`}
                >
                  <span className="text-2xl">{theme.celebrationEmoji}</span>
                  You selected: <span className="font-bold">{formatSelectedDateTime()}</span>
                </p>
                <p className={`${theme.textColor} mt-1 font-bold flex items-center justify-center gap-2`}>
                  <span className="text-xl">💕</span>
                  I'll text you the details!
                  <span className="text-xl">💕</span>
                </p>

                <div className="flex flex-col sm:flex-row gap-2 mt-4">
                  <button
                    onClick={handleWhatsAppShare}
                    className={`${colorBlindMode ? "bg-green-600 hover:bg-green-700" : theme.buttonPrimary} text-white font-bold py-2 px-4 rounded-full flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 border-2 border-white/20`}
                    aria-label="Share to WhatsApp"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Send to WhatsApp
                  </button>

                  <button
                    onClick={() => setShowLoveCards(true)}
                    className={`${theme.buttonSecondary} text-white font-bold py-2 px-4 rounded-full flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 border-2 border-white/20 animate-pulse`}
                  >
                    <Heart className="w-5 h-5" />
                    View Love Cards
                  </button>
                </div>
              </div>
            )}

            {/* <div className="mt-4 flex flex-col items-center">
              <label
                htmlFor="whatsapp-number"
                className={`${fontSizes.label} font-semibold ${theme.titleColor} flex items-center gap-2`}
              >
                <span className="text-xl">📱</span> Your WhatsApp Number:
              </label>
              <div className="flex flex-col gap-2 w-full max-w-sm">
                <input
                  id="whatsapp-number"
                  type="tel"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value.replace(/\D/g, ""))}
                  placeholder="Enter your WhatsApp number"
                  className={`${fontSizes.button} rounded-lg border-2 ${colorBlindMode ? "border-blue-400 focus:border-blue-600 bg-blue-50" : `border-${theme.titleColor.split("-")[1]}-300 focus:border-${theme.titleColor.split("-")[1]}-500 bg-${theme.titleColor.split("-")[1]}-50`} focus:outline-none focus:ring-2 focus:ring-pink-300 px-3 py-2 w-full font-cute`}
                />
                <div className="text-xs text-gray-500 text-center">Include country code (no + or spaces)</div>
              </div>
            </div> */}

            <button
              onClick={handleRestart}
              className={`mt-2 ${theme.textColor} hover:${theme.titleColor} transition-colors duration-200 flex items-center gap-2 font-bold text-xl focus:outline-none focus:ring-2 focus:ring-pink-300 rounded px-2 py-1 font-cute`}
              aria-label="Start over and go back to the question"
            >
              <RotateCcw className="w-6 h-6" />
              Start Over
            </button>

            <div className="mt-4 text-center">
              <p className={`text-sm ${theme.textColor} opacity-75`}>
                Current theme: <span className="font-bold">{theme.name}</span> {theme.emoji}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="sr-only" aria-live="polite" id="announcements">
        {colorBlindMode && "Color-blind friendly mode enabled with high contrast colors and visual indicators"}
        {animationsDisabled && "Animations disabled for reduced motion"}
        {fontSize !== "normal" && `Font size changed to ${fontSize}`}
        {flyingHearts.length > 0 && "Hearts flying animation playing"}
        {(selectedDate || selectedTime) && `You selected ${formatSelectedDateTime()} for your date`}
        {`Current theme: ${theme.name}`}
      </div>
    </div>
  )
}

export default Happy
