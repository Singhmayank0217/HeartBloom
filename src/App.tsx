import React, { useState, useEffect } from 'react';
import { Heart, Sparkles } from 'lucide-react';

function App() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayedMessages, setDisplayedMessages] = useState<string[]>([]);
  const [showInitialText, setShowInitialText] = useState(true);
  const [showProposal, setShowProposal] = useState(false);

  const loveMessages = [
    "My heart beats only for you ❤️",
    "Every thought leads to you 💭",
    "You're my everything 🌟",
    "Your smile lights up my world ✨",
    "Forever yours 💝",
    "You make me complete 💫",
    "You're my dream come true 🌈",
    "My love grows stronger each day🌹",
    "You're my dream come true 🌈",
  ];

  const positions = [
    'sm:top-4 top-2 sm:left-4 left-2',                
    'sm:top-4 top-2 sm:right-4 right-2',               
    'sm:top-1/4 top-[20%] sm:left-4 left-2',           
    'sm:top-1/4 top-[20%] sm:right-4 right-2',          
    'sm:bottom-1/4 bottom-[30%] sm:left-4 left-2',     
    'sm:bottom-1/4 bottom-[30%] sm:right-4 right-2',    
    'sm:bottom-4 bottom-2 sm:left-4 left-2',            
    'sm:bottom-4 bottom-2 sm:right-4 right-2',           
  ];

  useEffect(() => {
    if (displayedMessages.length === loveMessages.length) {
      setTimeout(() => {
        setShowProposal(true);
      }, 2000);
    }
  }, [displayedMessages.length]);

  const handleHeartClick = () => {
    setShowInitialText(false);
    setIsAnimating(true);
    
    let currentIndex = displayedMessages.length;
    
    const messageInterval = setInterval(() => {
      if (currentIndex < loveMessages.length) {
        setDisplayedMessages(prev => [...prev, loveMessages[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(messageInterval);
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 flex flex-col items-center justify-center p-4 overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="sparkle-rain absolute -top-8"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          >
            <Sparkles className="text-yellow-300 sm:w-3 w-2 sm:h-3 h-2" />
          </div>
        ))}
      </div>

      {displayedMessages.map((message, index) => (
        <div
          key={index}
          className={`fixed ${positions[index % positions.length]} max-w-[120px] xs:max-w-[150px] sm:max-w-[200px] transform transition-all duration-1000 animate-slideIn z-10`}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-2 sm:p-3 shadow-lg">
            <p className="text-[10px] xs:text-xs sm:text-sm font-serif text-pink-600">{message}</p>
          </div>
        </div>
      ))}

      <div className="fixed inset-0 flex items-center justify-center">
      <div className="text-center relative">
  {isAnimating && (
    <div className="absolute inset-0 w-screen h-screen -z-10">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="floating-heart absolute"
          style={{
            left: `${Math.random() * -100}%`, 
            right: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`, 
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${10 + Math.random() * 17}s`
          }}
        >
          {i % 2 === 0 ? (
            <Heart className="text-pink-400 w-4 h-4 sm:w-5 sm:h-5" fill="#f472b6" />
          ) : (
            <Sparkles className="text-pink-400 w-4 h-4 sm:w-5 sm:h-5" />
          )}
        </div>
              ))}
            </div>
          )}


          {showProposal && (
            <div className="fixed bottom-16 sm:bottom-28 left-0 right-0 flex justify-center items-end animate-slideUpFade z-30">
              <div className="relative w-64 h-64 sm:w-64 sm:h-64 mb-4 sm:mb-8">
                <iframe
                  src="https://tenor.com/embed/17914581950286182436"
                  className="rounded-2xl shadow-2xl w-full h-full"
                  allowFullScreen
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pink-500/20 to-transparent rounded-2xl" />
              </div>
            </div>        
          )}


          <div 
            className={`relative cursor-pointer transform transition-transform hover:scale-110
              ${isAnimating ? 'animate-heartbeat' : ''}`}
            onClick={handleHeartClick}
          >
            <Heart 
              className={`text-red-500 filter drop-shadow-lg transition-all duration-500 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40
                ${isAnimating ? 'animate-pulse' : ''}`}
              fill={isAnimating ? "#ef4444" : "none"}
            />
          </div>

          {showInitialText && (
            <p className="text-gray-600 font-light animate-fadeIn mt-4 sm:mt-8 text-sm sm:text-base">
              Click the heart to see it bloom
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;