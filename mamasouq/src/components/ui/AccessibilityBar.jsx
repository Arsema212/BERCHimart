// src/components/ui/AccessibilityBar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Volume2, 
  VolumeX, 
  ZoomIn, 
  ZoomOut, 
  Settings, 
  Mic, 
  MicOff,
  Contrast,
  RotateCcw,
  Play,
  Square,
  Navigation,
  Home,
  Search,
  User,
  ShoppingBag,
  Heart
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const AccessibilityBar = () => {
  const [fontSize, setFontSize] = useState('medium');
  const [isMuted, setIsMuted] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [showAccessibilityMenu, setShowAccessibilityMenu] = useState(false);
  const [voiceFeedback, setVoiceFeedback] = useState('');
  const [recognition, setRecognition] = useState(null);
  
  const navigate = useNavigate();
  const location = useLocation();
  const recognitionRef = useRef(null);

  // Initialize from localStorage and voice recognition
  useEffect(() => {
    const savedFontSize = localStorage.getItem('fontSize');
    const savedContrast = localStorage.getItem('highContrast');
    const savedMute = localStorage.getItem('voiceMuted');

    if (savedFontSize) {
      setFontSize(savedFontSize);
      applyFontSize(savedFontSize);
    }
    if (savedContrast === 'true') {
      setHighContrast(true);
      applyHighContrast(true);
    }
    if (savedMute === 'true') {
      setIsMuted(true);
    }

    // Initialize voice recognition
    initializeVoiceRecognition();

    // Cleanup on unmount
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if ('speechSynthesis' in window) {
        speechSynthesis.cancel();
      }
    };
  }, []);

  const initializeVoiceRecognition = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      speakText("Voice recognition is not supported in your browser. Please use Chrome or Edge for full voice support.");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognitionInstance = new SpeechRecognition();
    
    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = true;
    recognitionInstance.lang = 'en-US';
    recognitionInstance.maxAlternatives = 1;

    recognitionInstance.onstart = () => {
      setIsListening(true);
      speakText("Voice recognition activated. Say 'help' to learn available commands.");
    };

    recognitionInstance.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
        .toLowerCase()
        .trim();

      // Only process final results
      if (event.results[0].isFinal) {
        processVoiceCommand(transcript);
      }
    };

    recognitionInstance.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      if (event.error === 'not-allowed') {
        speakText("Microphone access is required for voice commands. Please allow microphone permissions.");
      }
      setIsListening(false);
    };

    recognitionInstance.onend = () => {
      setIsListening(false);
      // Auto-restart listening if it was manually stopped
      setTimeout(() => {
        if (!isListening && recognitionRef.current) {
          recognitionRef.current.start();
        }
      }, 1000);
    };

    recognitionRef.current = recognitionInstance;
    setRecognition(recognitionInstance);
  };

  const processVoiceCommand = (command) => {
    console.log('Voice command:', command);
    setVoiceFeedback(`Heard: ${command}`);

    // Navigation commands
    if (command.includes('go to') || command.includes('navigate to') || command.includes('open')) {
      if (command.includes('home') || command.includes('main page')) {
        navigate('/');
        speakText("Navigating to home page");
      } else if (command.includes('products') || command.includes('shop') || command.includes('store')) {
        navigate('/products');
        speakText("Navigating to products page");
      } else if (command.includes('sell') || command.includes('artisan') || command.includes('seller')) {
        navigate('/sell');
        speakText("Navigating to sell page");
      } else if (command.includes('profile') || command.includes('account')) {
        navigate('/profile');
        speakText("Navigating to your profile");
      } else if (command.includes('login') || command.includes('sign in')) {
        navigate('/auth/login');
        speakText("Navigating to login page");
      } else if (command.includes('sign up') || command.includes('register')) {
        navigate('/auth/signup');
        speakText("Navigating to sign up page");
      } else if (command.includes('accessibility')) {
        navigate('/accessibility');
        speakText("Navigating to accessibility features");
      } else {
        speakText("I'm not sure which page you want to navigate to. Try saying 'go to home', 'go to products', or 'go to sell'.");
      }
      return;
    }

    // Page interaction commands
    if (command.includes('read page') || command.includes('read content') || command.includes('describe page')) {
      readPageContent();
      return;
    }

    if (command.includes('stop reading') || command.includes('stop speaking') || command.includes('be quiet')) {
      stopReading();
      speakText("Stopping speech");
      return;
    }

    // Accessibility commands
    if (command.includes('increase text') || command.includes('larger text') || command.includes('bigger text')) {
      increaseFontSize();
      return;
    }

    if (command.includes('decrease text') || command.includes('smaller text')) {
      decreaseFontSize();
      return;
    }

    if (command.includes('high contrast') || command.includes('contrast mode')) {
      toggleHighContrast();
      return;
    }

    if (command.includes('normal contrast') || command.includes('default contrast')) {
      if (highContrast) {
        toggleHighContrast();
      }
      return;
    }

    // Search commands
    if (command.includes('search for') || command.includes('find')) {
      const searchQuery = command.replace(/search for|find/g, '').trim();
      if (searchQuery) {
        navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
        speakText(`Searching for ${searchQuery}`);
      }
      return;
    }

    // Help command
    if (command.includes('help') || command.includes('what can i say') || command.includes('commands')) {
      speakText(`
        Here are the available voice commands:
        
        Navigation: Say "go to home", "go to products", "go to sell", "go to profile"
        Page Reading: Say "read page" to hear page content, "stop reading" to stop
        Text Size: Say "increase text" or "decrease text"
        Contrast: Say "high contrast" or "normal contrast"
        Search: Say "search for" followed by what you want to find
        Help: Say "help" to hear this message again
      `);
      return;
    }

    // General interaction
    if (command.includes('what is this') || command.includes('where am i')) {
      describeCurrentPage();
      return;
    }

    // If no command matched
    speakText("I didn't understand that command. Say 'help' to learn what commands are available.");
  };

  const startVoiceRecognition = () => {
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error('Error starting recognition:', error);
        speakText("Error starting voice recognition. Please check microphone permissions.");
      }
    }
  };

  const stopVoiceRecognition = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      speakText("Voice recognition stopped");
    }
  };

  const toggleVoiceRecognition = () => {
    if (isListening) {
      stopVoiceRecognition();
    } else {
      startVoiceRecognition();
    }
  };

  const applyFontSize = (size) => {
    const sizes = {
      small: '14px',
      medium: '16px',
      large: '18px',
      xlarge: '20px'
    };
    document.documentElement.style.fontSize = sizes[size] || sizes.medium;
  };

  const applyHighContrast = (enabled) => {
    if (enabled) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  };

  const increaseFontSize = () => {
    const sizes = ['small', 'medium', 'large', 'xlarge'];
    const currentIndex = sizes.indexOf(fontSize);
    if (currentIndex < sizes.length - 1) {
      const newSize = sizes[currentIndex + 1];
      setFontSize(newSize);
      applyFontSize(newSize);
      localStorage.setItem('fontSize', newSize);
      speakText(`Font size increased to ${newSize}`);
    } else {
      speakText("Text size is already at maximum");
    }
  };

  const decreaseFontSize = () => {
    const sizes = ['small', 'medium', 'large', 'xlarge'];
    const currentIndex = sizes.indexOf(fontSize);
    if (currentIndex > 0) {
      const newSize = sizes[currentIndex - 1];
      setFontSize(newSize);
      applyFontSize(newSize);
      localStorage.setItem('fontSize', newSize);
      speakText(`Font size decreased to ${newSize}`);
    } else {
      speakText("Text size is already at minimum");
    }
  };

  const resetAccessibility = () => {
    setFontSize('medium');
    applyFontSize('medium');
    setHighContrast(false);
    applyHighContrast(false);
    setIsMuted(false);
    stopReading();
    
    localStorage.removeItem('fontSize');
    localStorage.removeItem('highContrast');
    localStorage.removeItem('voiceMuted');
    
    speakText('All accessibility settings have been reset');
  };

  const toggleHighContrast = () => {
    const newContrastState = !highContrast;
    setHighContrast(newContrastState);
    applyHighContrast(newContrastState);
    localStorage.setItem('highContrast', newContrastState.toString());
    speakText(newContrastState ? 'High contrast mode enabled' : 'High contrast mode disabled');
  };

  const toggleMute = () => {
    const newMuteState = !isMuted;
    setIsMuted(newMuteState);
    localStorage.setItem('voiceMuted', newMuteState.toString());
    
    if (newMuteState) {
      stopReading();
    }
    speakText(newMuteState ? 'Voice output muted' : 'Voice output unmuted');
  };

  const speakText = (text, onEnd = null) => {
    if ('speechSynthesis' in window && !isMuted) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      if (onEnd) {
        utterance.onend = onEnd;
      }
      
      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event);
      };
      
      speechSynthesis.speak(utterance);
      return utterance;
    }
    return null;
  };

  const stopReading = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      setIsReading(false);
    }
  };

  const readPageContent = () => {
    if (isReading) {
      stopReading();
      return;
    }

    if (!('speechSynthesis' in window)) {
      speakText("Speech synthesis is not supported in your browser");
      return;
    }

    setIsReading(true);
    describeCurrentPage();
  };

  const describeCurrentPage = () => {
    const pageDescriptions = {
      '/': `
        Welcome to MamaSouk Home Page. 
        This is an accessible e-commerce platform for handmade products. 
        You can browse products, become an artisan seller, or learn about our accessibility features.
        Use voice commands like "go to products" to navigate, or "read page" to hear this content.
      `,
      '/products': `
        Products Page. Browse our collection of unique handmade products from talented artisans worldwide.
        Use search to find specific items, or browse by categories. Each product includes detailed descriptions
        and accessibility features for easy shopping.
      `,
      '/sell': `
        Sell Your Creations Page. If you're an artisan, you can apply to sell your handmade products on MamaSouk.
        We provide accessible tools for shop management, including voice-controlled interfaces and simplified workflows.
      `,
      '/accessibility': `
        Accessibility Features Page. Learn about all the ways MamaSouk makes e-commerce inclusive for everyone.
        We offer voice navigation, screen reader compatibility, high contrast modes, and motor impairment support.
      `,
      '/profile': `
        Your Profile Page. Manage your account settings, view order history, and customize your accessibility preferences.
        You can update your information and configure how you interact with the platform.
      `,
      '/auth/login': `
        Login Page. Sign in to your MamaSouk account to access personalized features, track orders, and manage your artisan shop.
        New users can create an account using the sign up option.
      `,
      '/auth/signup': `
        Sign Up Page. Create a new MamaSouk account to start shopping or apply to become an artisan seller.
        Our registration process is designed to be accessible for all users.
      `
    };

    const description = pageDescriptions[location.pathname] || 
      `You are on the ${location.pathname.replace('/', '')} page of MamaSouk accessible e-commerce platform.`;

    speakText(description);
  };

  const accessibilityFeatures = [
    {
      name: 'Text Size',
      description: 'Adjust the text size for better readability',
      actions: [
        {
          icon: <ZoomOut className="w-4 h-4" />,
          label: 'Decrease',
          action: decreaseFontSize,
          disabled: fontSize === 'small'
        },
        {
          icon: <ZoomIn className="w-4 h-4" />,
          label: 'Increase',
          action: increaseFontSize,
          disabled: fontSize === 'xlarge'
        }
      ]
    },
    {
      name: 'Voice Control',
      description: 'Navigate and interact using voice commands',
      actions: [
        {
          icon: isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />,
          label: isListening ? 'Stop Voice' : 'Start Voice',
          action: toggleVoiceRecognition
        },
        {
          icon: isReading ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />,
          label: isReading ? 'Stop Read' : 'Read Page',
          action: readPageContent
        }
      ]
    },
    {
      name: 'Visual Options',
      description: 'Adjust visual display settings',
      actions: [
        {
          icon: <Contrast className="w-4 h-4" />,
          label: highContrast ? 'Normal' : 'High Contrast',
          action: toggleHighContrast
        },
        {
          icon: isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />,
          label: isMuted ? 'Unmute' : 'Mute',
          action: toggleMute
        }
      ]
    }
  ];

  // Voice command feedback timeout
  useEffect(() => {
    if (voiceFeedback) {
      const timer = setTimeout(() => {
        setVoiceFeedback('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [voiceFeedback]);

  return (
    <>
      <motion.div
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-2 px-4 text-sm border-b border-gray-700"
      >
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Left Section - Quick Actions */}
            <div className="flex items-center gap-4">
              <span className="font-semibold flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Accessibility:
              </span>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={decreaseFontSize}
                  disabled={fontSize === 'small'}
                  className="flex items-center gap-1 px-3 py-1 bg-gray-700 rounded-lg hover:bg-gray-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed focus-accessible"
                  aria-label="Decrease text size"
                >
                  <ZoomOut className="w-3 h-3" />
                  Smaller
                </button>
                
                <button
                  onClick={increaseFontSize}
                  disabled={fontSize === 'xlarge'}
                  className="flex items-center gap-1 px-3 py-1 bg-gray-700 rounded-lg hover:bg-gray-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed focus-accessible"
                  aria-label="Increase text size"
                >
                  <ZoomIn className="w-3 h-3" />
                  Larger
                </button>

                <button
                  onClick={toggleHighContrast}
                  className={`flex items-center gap-1 px-3 py-1 rounded-lg transition-all focus-accessible ${
                    highContrast 
                      ? 'bg-yellow-500 text-gray-900 hover:bg-yellow-600' 
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                  aria-label="Toggle high contrast mode"
                >
                  <Contrast className="w-3 h-3" />
                  Contrast
                </button>
              </div>
            </div>

            {/* Right Section - Voice & Controls */}
            <div className="flex items-center gap-4">
              <button
                onClick={toggleVoiceRecognition}
                className={`flex items-center gap-1 px-3 py-1 rounded-lg transition-all focus-accessible ${
                  isListening 
                    ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                    : 'bg-green-500 hover:bg-green-600'
                }`}
                aria-label={isListening ? 'Stop voice recognition' : 'Start voice recognition'}
              >
                {isListening ? <MicOff className="w-3 h-3" /> : <Mic className="w-3 h-3" />}
                {isListening ? 'Listening...' : 'Voice Control'}
              </button>

              <button
                onClick={readPageContent}
                className={`flex items-center gap-1 px-3 py-1 rounded-lg transition-all focus-accessible ${
                  isReading 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
                aria-label={isReading ? 'Stop reading page' : 'Start reading page content'}
              >
                {isReading ? <Square className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                {isReading ? 'Stop Reading' : 'Read Page'}
              </button>

              <button
                onClick={toggleMute}
                className={`flex items-center gap-1 px-3 py-1 rounded-lg transition-all focus-accessible ${
                  isMuted 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
                aria-label={isMuted ? 'Unmute voice' : 'Mute voice'}
              >
                {isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                {isMuted ? 'Muted' : 'Sound'}
              </button>

              <button
                onClick={() => setShowAccessibilityMenu(!showAccessibilityMenu)}
                className="flex items-center gap-1 px-3 py-1 bg-purple-600 rounded-lg hover:bg-purple-700 transition-all focus-accessible"
                aria-label="Open accessibility menu"
              >
                <Settings className="w-3 h-3" />
                More Options
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Voice Command Feedback */}
      <AnimatePresence>
        {voiceFeedback && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-blue-600 text-white py-1 px-4 text-center text-sm"
          >
            <div className="container mx-auto flex items-center justify-center gap-2">
              <Mic className="w-3 h-3" />
              {voiceFeedback}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded Accessibility Menu */}
      <AnimatePresence>
        {showAccessibilityMenu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gray-700 text-white border-b border-gray-600 overflow-hidden"
          >
            <div className="container mx-auto py-4 px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {accessibilityFeatures.map((feature, index) => (
                  <div key={feature.name} className="space-y-3">
                    <h3 className="font-semibold text-sm flex items-center gap-2">
                      {feature.name}
                    </h3>
                    <p className="text-xs text-gray-300">
                      {feature.description}
                    </p>
                    <div className="flex gap-2">
                      {feature.actions.map((action, actionIndex) => (
                        <button
                          key={actionIndex}
                          onClick={action.action}
                          disabled={action.disabled}
                          className="flex items-center gap-1 px-2 py-1 bg-gray-600 rounded text-xs hover:bg-gray-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed focus-accessible"
                          aria-label={action.label}
                        >
                          {action.icon}
                          {action.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Voice Commands Help */}
              <div className="mt-4 p-4 bg-gray-600 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Mic className="w-4 h-4" />
                  Voice Commands:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                  <div>"Go to [page]" - Navigate</div>
                  <div>"Read page" - Hear content</div>
                  <div>"Increase text" - Larger text</div>
                  <div>"High contrast" - Toggle contrast</div>
                  <div>"Search for [item]" - Find products</div>
                  <div>"Help" - List commands</div>
                </div>
              </div>

              {/* Reset Button */}
              <div className="mt-4 pt-4 border-t border-gray-600 flex justify-center">
                <button
                  onClick={resetAccessibility}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-all focus-accessible"
                  aria-label="Reset all accessibility settings"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset All Settings
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Status Indicators */}
      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-green-600 text-white py-1 px-4 text-center text-sm"
          >
            <div className="container mx-auto flex items-center justify-center gap-2">
              <Mic className="w-3 h-3 animate-pulse" />
              Voice recognition active. Speak commands now.
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isReading && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-blue-600 text-white py-1 px-4 text-center text-sm"
          >
            <div className="container mx-auto flex items-center justify-center gap-2">
              <Volume2 className="w-3 h-3 animate-pulse" />
              Reading page content... Say "stop reading" to pause.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AccessibilityBar;