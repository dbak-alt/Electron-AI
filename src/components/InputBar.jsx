import React, { useState } from 'react';

export default function InputBar({ onSend }) {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim() !== '') {
      onSend(text);
      setText('');
    }
  };

  return (
    <div className="flex bg-[#40414F] border border-gray-600 rounded-2xl px-4 py-3">
      <input
        type="text"
        value={text}
        placeholder="Send a message"
        className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none"
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
      />
      <button
        onClick={handleSend}
        className="ml-3 bg-[#CD7C5E] hover:bg-[#aa7460] text-white px-4 py-2 rounded-lg font-medium bg-yellow transition"
      >
        Send
      </button>
    </div>
  );
}
