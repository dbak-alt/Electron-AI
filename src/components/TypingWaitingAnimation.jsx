import React from 'react';
import '../index.css'

export default function TypingWaitingAnimation() {
  return (
    <div
      className="typing-waiting-animation flex space-x-1 text-gray-400 text-lg"
      style={{ fontFamily: '"Josefin Slab", serif' }}
    >
      <span className="animate-bounce">•</span>
      <span className="animate-bounce animation-delay-200">•</span>
      <span className="animate-bounce animation-delay-400">•</span>
    </div>
  );
}
