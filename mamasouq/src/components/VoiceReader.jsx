import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  Volume2, 
  VolumeX, 
  Eye, 
  EyeOff,
  Type,
  Minus
} from 'lucide-react';

const VoiceReader = () => {
  const { t, i18n } = useTranslation();
  const [isListening, setIsListening] = useState(false);
  const [isBlindMode, setIsBlindMode] = useState(false);
  const [isLargeText, setIsLargeText] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    // Initialize speech recognition for voice commands
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = i18n.language === 'am' ? 'am-ET' : 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
        handleVoiceCommand(transcript);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        if (isBlindMode) {
          recognition.start(); // Restart listening in blind mode
        } else {
          setIsListening(false);
        }
      };

      setRecognition(recognition);
    }

    // Apply blind mode styles
    if (isBlindMode) {
      document.documentElement.classList.add('blind-mode');
      document.documentElement.style.fontSize = '18px';
    } else {
      document.documentElement.classList.remove('blind-mode');
      document.documentElement.style.fontSize = '16px';
    }

    // Apply large text styles
    if (isLargeText) {
      document.documentElement.classList.add('large-text');
    } else {
      document.documentElement.classList.remove('large-text');
    }

    return () => {
      document.documentElement.classList.remove('blind-mode', 'large-text');
      document.documentElement.style.fontSize = '16px';
    };
  }, [isBlindMode, isLargeText, i18n.language]);

  const handleVoiceCommand = (command) => {
    const isAmharic = i18n.language === 'am';
    
    if (command.includes('hey empowercraft') || command.includes('hey empower craft') || command.includes('hey berchimart')) {
      speakText(isAmharic ? 'እንኳን ደህና መጡ። እንዴት እርዳዎታለሁ?' : 'Hello! How can I help you?');
    } else if (command.includes('read this page') || command.includes('read page') || command.includes('ገጹን አንብብ') || command.includes('read')) {
      readPageContent();
    } else if (command.includes('go to products') || command.includes('products page') || command.includes('ወደ ምርቶች') || command.includes('products')) {
      speakText(isAmharic ? 'ወደ ምርቶች ገጽ እየሄድ ነው...' : 'Navigating to products page...');
      setTimeout(() => window.location.href = '/products', 1000);
    } else if (command.includes('go to home') || command.includes('home page') || command.includes('ወደ መነሻ') || command.includes('home')) {
      speakText(isAmharic ? 'ወደ መነሻ ገጽ እየሄድ ነው...' : 'Navigating to home page...');
      setTimeout(() => window.location.href = '/', 1000);
    } else if (command.includes('open dashboard') || command.includes('dashboard') || command.includes('ዳሽቦርድ') || command.includes('admin')) {
      const userRole = localStorage.getItem('userRole');
      let path = '/profile';
      if (userRole === 'admin') path = '/admin/dashboard';
      else if (userRole === 'moderator') path = '/moderator/dashboard';
      else if (userRole === 'artisan') path = '/seller/dashboard';
      
      speakText(isAmharic ? 'ወደ ዳሽቦርድ እየሄድ ነው...' : 'Opening dashboard...');
      setTimeout(() => window.location.href = path, 1000);
    } else if (command.includes('blind mode') || command.includes('blind mode on') || command.includes('የዕውር ሁነታ') || command.includes('blind')) {
      toggleBlindMode();
    } else if (command.includes('large text') || command.includes('big text') || command.includes('ትልቅ ጽሑፍ') || command.includes('text')) {
      toggleLargeText();
    } else if (command.includes('help') || command.includes('እርዳታ') || command.includes('assist')) {
      speakText(isAmharic ? 
        'የሚጠቀሙባቸው ትዕዛዞች: ገጹን አንብብ, ወደ ምርቶች ሂድ, ወደ መነሻ ሂድ, ዳሽቦርድ ክፈት, የዕውር ሁነታ, ትልቅ ጽሑፍ, እርዳታ' : 
        'Available commands: read this page, go to products, go to home, open dashboard, blind mode, large text, help'
      );
    }
  };

  const readPageContent = () => {
    const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, button, a, span');
    let text = '';
    
    textElements.forEach(element => {
      if (element.offsetParent !== null && element.textContent.trim()) {
        text += element.textContent.trim() + '. ';
      }
    });
    
    if (text) {
      speakText(text);
    }
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = i18n.language === 'am' ? 'am-ET' : 'en-US';
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const toggleBlindMode = () => {
    setIsBlindMode(!isBlindMode);
    if (!isBlindMode && recognition) {
      recognition.start();
    } else if (isBlindMode && recognition) {
      recognition.stop();
    }
  };

  const toggleLargeText = () => {
    setIsLargeText(!isLargeText);
  };

  const startListening = () => {
    if (recognition) {
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
    }
  };

  return (
    <div className="fixed top-4 right-4 z-40 flex space-x-2">
      {/* Voice Reader Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={isListening ? stopListening : startListening}
        className={`p-3 rounded-full shadow-lg transition-colors ${
          isListening 
            ? 'bg-red-500 text-white' 
            : 'bg-green-500 text-white hover:bg-green-600'
        }`}
        title={isListening ? 'Stop listening' : 'Start voice commands'}
      >
        {isListening ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </motion.button>

      {/* Blind Mode Toggle */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleBlindMode}
        className={`p-3 rounded-full shadow-lg transition-colors ${
          isBlindMode 
            ? 'bg-blue-500 text-white' 
            : 'bg-gray-500 text-white hover:bg-gray-600'
        }`}
        title={isBlindMode ? 'Disable blind mode' : 'Enable blind mode'}
      >
        {isBlindMode ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
      </motion.button>

      {/* Large Text Toggle */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleLargeText}
        className={`p-3 rounded-full shadow-lg transition-colors ${
          isLargeText 
            ? 'bg-purple-500 text-white' 
            : 'bg-gray-500 text-white hover:bg-gray-600'
        }`}
        title={isLargeText ? 'Disable large text' : 'Enable large text'}
      >
        {isLargeText ? <Minus className="w-5 h-5" /> : <Type className="w-5 h-5" />}
      </motion.button>
    </div>
  );
};

export default VoiceReader;
