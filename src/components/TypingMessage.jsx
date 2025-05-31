import React, { useState, useEffect } from 'react';

export default function TypingMessage({ content, onComplete, speed = 30 }) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    setDisplayedText(''); // reset on content change

    const interval = setInterval(() => {
      index++;
      setDisplayedText(content.substring(0, index)); // show substring up to current index

      if (index >= content.length) {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [content, speed, onComplete]);

  return <div>{displayedText}</div>;
}
