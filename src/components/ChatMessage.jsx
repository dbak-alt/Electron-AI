import React from 'react';

export default function ChatMessage({ role, content, children }) {
  const isUser = role === 'user';
  const bgColor = isUser ? 'bg-[#CD7C5E]' : '';
  const textColor = isUser ? 'text-white' : 'text-[#ECECF1]';
  const fontClass = !isUser ? 'font-semibold text-xl' : ''; // Slightly bold and larger for AI
  const fontStyle = !isUser ? { fontFamily: '"Josefin Slab", serif' } : {}; // Josefin Slab for AI

  return (
    <div className="flex justify-start">  {/* Aligns everything to right */}
      <div
        className={`max-w-[90%] p-3 rounded-lg ${bgColor} ${textColor} ${fontClass}`}
        style={fontStyle}
      >
        {content || children}
      </div>
    </div>
  );
}
