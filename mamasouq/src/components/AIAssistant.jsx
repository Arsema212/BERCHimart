import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic, 
  MicOff, 
  MessageCircle, 
  X, 
  Send,
  Bot,
  Volume2,
  VolumeX
} from 'lucide-react';

const AIAssistant = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'assistant', content: 'እንኳን ደህና መጡ! የእኔ የአርቴፊሻል ኢንተለጀንስ ረዳት ነኝ። ዛሬ እንዴት እርዳዎታለሁ?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [recognition, setRecognition] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = i18n.language === 'am' ? 'am-ET' : 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        handleVoiceCommand(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognition);
    }

    // Listen for wake word
    const handleKeyPress = (event) => {
      if (event.key === ' ' && event.ctrlKey) {
        toggleListening();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [i18n.language]);

  const toggleListening = () => {
    if (recognition) {
      if (isListening) {
        recognition.stop();
      } else {
        recognition.start();
      }
    }
  };

  const handleVoiceCommand = (command) => {
    const lowerCommand = command.toLowerCase();
    const isAmharic = i18n.language === 'am';
    
    let response = '';
    let action = null;

    // Navigation commands - both English and Amharic
    if (lowerCommand.includes('home') || lowerCommand.includes('መነሻ') || lowerCommand.includes('main')) {
      response = isAmharic ? 'ወደ መነሻ ገጽ እየሄድ ነው...' : 'Navigating to home page...';
      action = () => window.location.href = '/';
    } else if (lowerCommand.includes('products') || lowerCommand.includes('ምርቶች') || lowerCommand.includes('product')) {
      response = isAmharic ? 'ወደ ምርቶች ገጽ እየሄድ ነው...' : 'Navigating to products page...';
      action = () => window.location.href = '/products';
    } else if (lowerCommand.includes('dashboard') || lowerCommand.includes('ዳሽቦርድ') || lowerCommand.includes('admin')) {
      response = isAmharic ? 'ወደ ዳሽቦርድ እየሄድ ነው...' : 'Navigating to dashboard...';
      action = () => {
        const userRole = localStorage.getItem('userRole');
        if (userRole === 'admin') window.location.href = '/admin/dashboard';
        else if (userRole === 'moderator') window.location.href = '/moderator/dashboard';
        else if (userRole === 'artisan') window.location.href = '/seller/dashboard';
        else window.location.href = '/profile';
      };
    } else if (lowerCommand.includes('help') || lowerCommand.includes('እርዳታ') || lowerCommand.includes('assist')) {
      response = isAmharic ? 
        'የሚጠቀሙባቸው ትዕዛዞች: መነሻ, ምርቶች, ዳሽቦርድ, እርዳታ' : 
        'Available commands: home, products, dashboard, help';
    } else if (lowerCommand.includes('login') || lowerCommand.includes('ግባ')) {
      response = isAmharic ? 'ወደ መግባት ገጽ እየሄድ ነው...' : 'Navigating to login page...';
      action = () => window.location.href = '/auth/login';
    } else {
      response = isAmharic ? 
        'አልገባኝም። እባክዎ "እርዳታ" ይበሉ ወይም "help" ይበሉ።' : 
        'I didn\'t understand. Please say "help" for available commands.';
    }

    // Add messages
    setMessages(prev => [
      ...prev,
      { type: 'user', content: command },
      { type: 'assistant', content: response }
    ]);

    // Execute action
    if (action) {
      setTimeout(action, 1000);
    }

    // Speak response
    speakText(response);
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = i18n.language === 'am' ? 'am-ET' : 'en-US';
      utterance.onend = () => setIsSpeaking(false);
      speechSynthesis.speak(utterance);
    }
  };

  const sendMessage = () => {
    if (inputMessage.trim()) {
      handleVoiceCommand(inputMessage);
      setInputMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      {/* Floating AI Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg z-50 flex items-center space-x-2"
      >
        {isListening ? (
          <MicOff className="w-6 h-6 animate-pulse" />
        ) : (
          <Bot className="w-6 h-6" />
        )}
        <span className="text-sm font-medium">
          {isListening ? t('ai.listening') : 'AI'}
        </span>
      </motion.button>

      {/* AI Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl w-full max-w-md h-96 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  <Bot className="w-6 h-6 text-green-600" />
                  <h3 className="font-semibold text-gray-900">BERCHimart AI</h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 && (
                  <div className="text-center text-gray-500">
                    <p>{t('ai.wakeWord')} {t('ai.help')}</p>
                  </div>
                )}
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={i18n.language === 'am' ? 'መልዕክት ይጻፉ...' : 'Type a message...'}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button
                    onClick={toggleListening}
                    className={`p-2 rounded-lg transition-colors ${
                      isListening
                        ? 'bg-red-500 text-white'
                        : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                  >
                    {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={sendMessage}
                    className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {i18n.language === 'am' ? 'Ctrl + Space ይጫኑ ወይም "Hey EmpowerCraft" ይበሉ' : 'Press Ctrl + Space or say "Hey EmpowerCraft"'}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;
