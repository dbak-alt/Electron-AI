import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import TypingMessage from './TypingMessage';
import InputBar from './InputBar';
import Fuse from 'fuse.js';
import { predefinedQA } from '../data/claudeData';

export default function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [hasStarted, setHasStarted] = useState(false);
  const [typingContent, setTypingContent] = useState(null);
  const [isWaiting, setIsWaiting] = useState(false);

  const chatEndRef = useRef(null);

  const questions = Object.keys(predefinedQA);
  const fuse = new Fuse(questions, { includeScore: true, threshold: 0.3 });

  const handleSend = (message) => {
    if (!hasStarted) setHasStarted(true);
    setMessages(prev => [...prev, { role: 'user', content: message }]);

    const results = fuse.search(message.trim());
    const bestMatch = results.length ? results[0].item : null;

    const delay = Math.floor(Math.random() * 800) + 700;

    setTimeout(() => {
      const aiResponse = bestMatch
        ? predefinedQA[bestMatch]
        : "Sorry, I don't know the answer to that.";
      
      // Show waiting animation for 2 seconds before typing
      setIsWaiting(true);

      setTimeout(() => {
        setIsWaiting(false);
        setTypingContent(aiResponse);
      }, 2000);

    }, delay);
  };

  const handleTypingComplete = () => {
    setMessages(prev => [...prev, { role: 'assistant', content: typingContent }]);
    setTypingContent(null);
  };

  // Scroll to bottom on new messages or typing state changes
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, typingContent, isWaiting]);

  return (
    <div className="w-[70%] h-screen bg-[#262624] text-white flex flex-col">
      {/* Message Area */}
      <div
        className={`flex-1 overflow-y-auto no-scrollbar ${
          hasStarted
            ? 'px-4 md:px-20 py-4 md:py-10'
            : 'flex flex-col justify-center items-center px-4'
        }`}
      >
        {hasStarted ? (
          <div className="max-w-3xl mx-auto space-y-6 pb-10">
            {messages.map((msg, i) => (
              <ChatMessage key={i} role={msg.role} content={msg.content} />
            ))}

            {/* Show waiting animation before typing */}
            {isWaiting && (
              <ChatMessage role="assistant">
                <TypingWaitingAnimation />
              </ChatMessage>
            )}

            {/* Show typing animation when waiting is done */}
            {typingContent && !isWaiting && (
              <ChatMessage role="assistant">
                <TypingMessage content={typingContent} onComplete={handleTypingComplete} />
              </ChatMessage>
            )}

            <div ref={chatEndRef} />
          </div>
        ) : (
          <h1
            className="text-3xl text-gray-400"
            style={{ fontFamily: '"Josefin Slab", serif' }}
          >
            Hello! How can I assist you today?
          </h1>
        )}
      </div>

      {/* Input Bar */}
      <div
        className={`px-4 py-4 ${
          hasStarted ? '' : 'w-full flex justify-center'
        }`}
      >
        <div className="max-w-3xl mx-auto w-full">
          <InputBar onSend={handleSend} />
        </div>
      </div>
    </div>
  );
}

// Simple waiting animation component (3 bouncing dots)
function TypingWaitingAnimation() {
  return (
    <div
      className="flex space-x-1 text-gray-400 text-lg"
      style={{ fontFamily: '"Josefin Slab", serif' }}
    >
      <span className="animate-bounce">•</span>
      <span className="animate-bounce animation-delay-200">•</span>
      <span className="animate-bounce animation-delay-400">•</span>
      <style jsx>{`
        .animate-bounce {
          animation: bounce 1.2s infinite;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        @keyframes bounce {
          0%, 80%, 100% {
            transform: translateY(0);
            opacity: 0.3;
          }
          40% {
            transform: translateY(-10px);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
