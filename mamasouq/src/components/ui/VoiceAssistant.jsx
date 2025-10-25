// client/src/components/ui/VoiceAssistant.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Bot, X, MessageCircle } from 'lucide-react';
import { useVoiceNavigation } from '../../hooks/useVoiceNavigation';

const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);
  
  const { transcript, isSupported, startListening, stopListening } = useVoiceNavigation();

  const handleVoiceCommand = async (command) => {
    const lowerCommand = command.toLowerCase();
    let response = "I'm here to help! How can I assist you today?";
    
    // AI-powered command processing
    if (lowerCommand.includes('product') || lowerCommand.includes('show me') || lowerCommand.includes('buy')) {
      response = "I'll show you our handmade products! You can browse all items in the Products section. Would you like me to help you find something specific?";
    } else if (lowerCommand.includes('sell') || lowerCommand.includes('add product') || lowerCommand.includes('artisan')) {
      response = "Wonderful! I can help you become an artisan. Visit the 'Start Selling' page to list your handmade products. Would you like guidance on creating your first listing?";
    } else if (lowerCommand.includes('help') || lowerCommand.includes('assistance')) {
      response = "I'm your AI assistant! I can help you navigate the platform, find products, set up your artisan profile, or adjust accessibility settings. What would you like to do?";
    } else if (lowerCommand.includes('accessibility') || lowerCommand.includes('disability')) {
      response = "We have comprehensive accessibility features including voice navigation, screen reader support, high contrast mode, and text scaling. Visit the Accessibility page to customize your experience.";
    } else if (lowerCommand.includes('hello') || lowerCommand.includes('hi')) {
      response = "Hello! I'm MamaSouk AI Assistant. I'm here to help you navigate our accessible marketplace. How can I assist you today?";
    } else {
      response = `I heard: "${command}". I'm still learning, but I can help you with products, selling, or accessibility features. What would you like to know?`;
    }

    setMessage(response);
    setConversation(prev => [
      ...prev,
      { type: 'user', text: command },
      { type: 'assistant', text: response }
    ]);
  };

  useEffect(() => {
    if (transcript) {
      handleVoiceCommand(transcript);
    }
  }, [transcript]);

  const toggleListening = () => {
    if (!isListening) {
      startListening();
      setIsListening(true);
      setMessage("I'm listening... Speak clearly and tell me how I can help!");
    } else {
      stopListening();
      setIsListening(false);
    }
  };

  const quickCommands = [
    "Show me products",
    "I want to sell",
    "Accessibility help",
    "How does it work?"
  ];

  if (!isSupported) {
    return null;
  }

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-primary-500 to-primary-700 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 focus-accessible group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        aria-label="Open AI Assistant"
      >
        <Bot className="w-6 h-6" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></div>
      </motion.button>

      {/* Voice Assistant Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl max-h-[80vh] flex flex-col"
              layout
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-primary-500 to-primary-700 text-white p-2 rounded-lg">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      MamaSouk AI Assistant
                    </h3>
                    <p className="text-sm text-gray-500">
                      Always here to help
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors focus-accessible"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Conversation Area */}
              <div className="flex-1 bg-gray-50 rounded-lg p-4 mb-4 min-h-48 max-h-96 overflow-y-auto">
                {conversation.length === 0 ? (
                  <div className="text-center text-gray-500 h-full flex items-center justify-center">
                    <div>
                      <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>Hello! I'm your AI assistant. How can I help you today?</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {conversation.map((msg, index) => (
                      <div
                        key={index}
                        className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-2xl ${
                            msg.type === 'user'
                              ? 'bg-primary-500 text-white rounded-br-none'
                              : 'bg-gray-200 text-gray-800 rounded-bl-none'
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Commands */}
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Try saying:</p>
                <div className="flex flex-wrap gap-2">
                  {quickCommands.map((cmd, index) => (
                    <button
                      key={index}
                      onClick={() => handleVoiceCommand(cmd)}
                      className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors focus-accessible"
                    >
                      {cmd}
                    </button>
                  ))}
                </div>
              </div>

              {/* Voice Control */}
              <button
                onClick={toggleListening}
                className={`flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                  isListening 
                    ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' 
                    : 'bg-gradient-to-r from-primary-500 to-primary-700 hover:from-primary-600 hover:to-primary-800 text-white'
                } focus-accessible`}
              >
                {isListening ? (
                  <>
                    <MicOff className="w-5 h-5" />
                    Stop Listening
                  </>
                ) : (
                  <>
                    <Mic className="w-5 h-5" />
                    Start Voice Command
                  </>
                )}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VoiceAssistant;