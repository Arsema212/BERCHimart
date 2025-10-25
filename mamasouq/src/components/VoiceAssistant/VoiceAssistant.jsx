// client/src/components/VoiceAssistant/VoiceAssistant.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, VolumeX, Loader2 } from 'lucide-react';

const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [recognition, setRecognition] = useState(null);
  const [speechSynthesis, setSpeechSynthesis] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [status, setStatus] = useState('idle'); // idle, listening, processing, speaking

  const speechSynthesisRef = useRef(null);

  useEffect(() => {
    // Check browser support
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) || !('speechSynthesis' in window)) {
      setIsSupported(false);
      return;
    }

    // Initialize Speech Recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognitionInstance = new SpeechRecognition();
    
    recognitionInstance.continuous = false;
    recognitionInstance.interimResults = false;
    recognitionInstance.lang = 'en-US';

    recognitionInstance.onstart = () => {
      setIsListening(true);
      setStatus('listening');
    };

    recognitionInstance.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      setStatus('processing');
      handleVoiceCommand(transcript);
    };

    recognitionInstance.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      setStatus('idle');
      
      if (event.error === 'not-allowed') {
        speakText('Please allow microphone access to use voice commands.');
      } else {
        speakText('Sorry, I encountered an error. Please try again.');
      }
    };

    recognitionInstance.onend = () => {
      setIsListening(false);
      if (status === 'listening') {
        setStatus('idle');
      }
    };

    setRecognition(recognitionInstance);
    setSpeechSynthesis(window.speechSynthesis);

    // Cleanup
    return () => {
      if (recognitionInstance) {
        recognitionInstance.stop();
      }
      if (speechSynthesisRef.current) {
        speechSynthesisRef.current.cancel();
      }
    };
  }, []);

  const speakText = (text, rate = 0.9, pitch = 1) => {
    if (!speechSynthesis || isMuted) return;

    // Cancel any ongoing speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = 1;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setStatus('speaking');
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setStatus('idle');
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsSpeaking(false);
      setStatus('idle');
    };

    speechSynthesisRef.current = utterance;
    speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (speechSynthesis) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
      setStatus('idle');
    }
  };

  const handleVoiceCommand = (command) => {
    const normalizedCommand = command.toLowerCase().trim();

    // Navigation commands
    if (normalizedCommand.includes('go to') || normalizedCommand.includes('navigate to') || normalizedCommand.includes('open')) {
      if (normalizedCommand.includes('home')) {
        window.location.href = '/';
      } else if (normalizedCommand.includes('products') || normalizedCommand.includes('shop')) {
        window.location.href = '/products';
      } else if (normalizedCommand.includes('sell') || normalizedCommand.includes('artisan')) {
        window.location.href = '/sell';
      } else if (normalizedCommand.includes('accessibility')) {
        window.location.href = '/accessibility';
      } else if (normalizedCommand.includes('profile')) {
        window.location.href = '/profile';
      } else if (normalizedCommand.includes('login')) {
        window.location.href = '/auth/login';
      } else if (normalizedCommand.includes('sign up') || normalizedCommand.includes('register')) {
        window.location.href = '/auth/signup';
      } else {
        speakText("I'm not sure which page you want to navigate to. Please try saying 'go to home', 'go to products', or 'go to sell'.");
      }
      return;
    }

    // Page description commands
    if (normalizedCommand.includes('describe') || normalizedCommand.includes('what is this') || normalizedCommand.includes('tell me about')) {
      describeCurrentPage();
      return;
    }

    // Help command
    if (normalizedCommand.includes('help') || normalizedCommand.includes('what can i say')) {
      speakText(`
        You can say:
        - "Describe this page" to hear about the current page
        - "Go to [page name]" to navigate
        - "Read products" to hear product listings
        - "Stop" to stop speaking
        - "Help" to hear this message again
      `);
      return;
    }

    // Stop command
    if (normalizedCommand.includes('stop') || normalizedCommand.includes('be quiet')) {
      stopSpeaking();
      return;
    }

    // Default response for unknown commands
    speakText("I'm not sure how to help with that. Say 'help' to learn what commands I understand.");
  };

  const describeCurrentPage = () => {
    const pageDescriptions = {
      '/': `
        Welcome to MamaSouk, the accessible e-commerce platform. 
        This is the home page where you can discover handmade products from artisans worldwide.
        We feature AI voice assistance, visual accessibility tools, and motor support features.
        You can explore products, learn about selling as an artisan, or discover our accessibility features.
      `,
      '/products': `
        Products page. Here you can browse and search for unique handmade products from our community of artisans.
        Use filters to find specific items, or search by category. Each product has detailed descriptions and accessibility features.
      `,
      '/sell': `
        Sell your creations page. If you're an artisan, you can apply to sell your handmade products on MamaSouk.
        We provide tools to make selling accessible for everyone, including voice-controlled shop management.
      `,
      '/accessibility': `
        Accessibility features page. Learn about all the ways MamaSouk makes e-commerce inclusive.
        We offer voice navigation, screen reader compatibility, high contrast modes, and motor impairment support.
      `,
      '/profile': `
        Your profile page. Here you can manage your account settings, view your orders, and update your preferences.
        You can also configure accessibility settings to customize your experience.
      `,
      '/auth/login': `
        Login page. Sign in to your MamaSouk account to access personalized features, track orders, and manage your artisan shop.
      `,
      '/auth/signup': `
        Sign up page. Create a new MamaSouk account to start shopping or apply to become an artisan seller.
      `
    };

    const currentPath = window.location.pathname;
    const description = pageDescriptions[currentPath] || 
      `You are on the ${currentPath.replace('/', '')} page. This is part of the MamaSouk accessible e-commerce platform.`;

    speakText(description);
  };

  const startListening = () => {
    if (recognition && !isListening && !isSpeaking) {
      try {
        recognition.start();
        speakText("I'm listening. You can say 'describe this page', 'go to products', or 'help' for more options.");
      } catch (error) {
        console.error('Error starting recognition:', error);
      }
    }
  };

  const stopListening = () => {
    if (recognition && isListening) {
      recognition.stop();
    }
  };

  const toggleMute = () => {
    if (isSpeaking) {
      stopSpeaking();
    }
    setIsMuted(!isMuted);
  };

  if (!isSupported) {
    return null; // Don't render if not supported
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="flex flex-col items-end gap-3">
        {/* Status Indicator */}
        <AnimatePresence>
          {(isListening || isSpeaking || status !== 'idle') && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="bg-white rounded-lg shadow-lg px-4 py-2 border border-gray-200"
            >
              <div className="flex items-center gap-2 text-sm text-gray-700">
                {status === 'listening' && (
                  <>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Listening...
                  </>
                )}
                {status === 'processing' && (
                  <>
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Processing...
                  </>
                )}
                {status === 'speaking' && (
                  <>
                    <Volume2 className="w-3 h-3" />
                    Speaking...
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Voice Assistant Button */}
        <div className="flex gap-2">
          {/* Mute/Unmute Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleMute}
            className={`p-3 rounded-full shadow-lg transition-colors focus-accessible ${
              isMuted 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
            aria-label={isMuted ? 'Unmute voice assistant' : 'Mute voice assistant'}
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </motion.button>

          {/* Main Voice Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={isListening ? stopListening : startListening}
            disabled={isSpeaking || isMuted}
            className={`p-4 rounded-full shadow-lg transition-all focus-accessible relative ${
              isListening
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : isSpeaking
                ? 'bg-blue-500 text-white'
                : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
            } ${isMuted ? 'opacity-50 cursor-not-allowed' : ''}`}
            aria-label={isListening ? 'Stop listening' : 'Start voice assistant'}
          >
            {isListening ? (
              <MicOff className="w-6 h-6" />
            ) : isSpeaking ? (
              <div className="flex items-center gap-1">
                <div className="w-1 h-2 bg-white rounded-full animate-pulse" />
                <div className="w-1 h-3 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                <div className="w-1 h-4 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>
            ) : (
              <Mic className="w-6 h-6" />
            )}

            {/* Listening Animation */}
            {isListening && (
              <div className="absolute inset-0 rounded-full border-2 border-green-500 animate-ping" />
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistant;