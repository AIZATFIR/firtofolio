import React, { useState, useEffect, useRef } from 'react';

/**
 * DecryptedText / ScrambleText Component from React Bits
 * Custom-tuned for ZAFIR; with signature ';:' characters and proximity trigger.
 */
export default function DecryptedText({
  text,
  speed = 40,
  maxIterations = 14,
  sequential = true,
  revealDirection = 'start',
  useOriginalCharsOnly = false,
  characters = ';:/*_~#<>[]{}|=+!01',
  className = '',
  parentClassName = '',
  encryptedClassName = '',
  animateOn = 'hover', // 'hover', 'view', 'proximity'
  ...props
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const [isScrambling, setIsScrambling] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState(new Set());
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    let interval;
    let currentIteration = 0;

    const getNextChar = (char) => {
      if (char === ' ') return ' ';
      if (useOriginalCharsOnly) {
        const positions = text.split('').filter((c) => c !== ' ');
        return positions[Math.floor(Math.random() * positions.length)];
      }
      return characters[Math.floor(Math.random() * characters.length)];
    };

    if (isHovering || (animateOn === 'view' && !hasAnimated)) {
      setIsScrambling(true);
      interval = setInterval(() => {
        setDisplayText((currentText) => {
          const textArray = text.split('');

          if (sequential) {
            if (revealedIndices.size < textArray.length) {
              const nextIndex =
                revealDirection === 'start'
                  ? revealedIndices.size
                  : textArray.length - 1 - revealedIndices.size;

              setRevealedIndices((prev) => new Set([...prev, nextIndex]));
            } else {
              clearInterval(interval);
              setIsScrambling(false);
              setHasAnimated(true);
              return text;
            }
          } else {
            currentIteration++;
            if (currentIteration >= maxIterations) {
              clearInterval(interval);
              setIsScrambling(false);
              setHasAnimated(true);
              return text;
            }
          }

          return textArray
            .map((char, index) => {
              if (char === ' ') return ' ';
              if (revealedIndices.has(index) || (currentIteration >= maxIterations)) {
                return text[index];
              }
              return getNextChar(char);
            })
            .join('');
        });
      }, speed);
    } else if (!isHovering && animateOn === 'hover') {
      setDisplayText(text);
      setRevealedIndices(new Set());
      setIsScrambling(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isHovering, animateOn, hasAnimated, text, speed, maxIterations, sequential, revealDirection, characters, useOriginalCharsOnly]);

  return (
    <span
      ref={containerRef}
      className={`decrypted-text-wrapper inline-block ${parentClassName}`}
      onMouseEnter={() => animateOn === 'hover' && setIsHovering(true)}
      onMouseLeave={() => animateOn === 'hover' && setIsHovering(false)}
      {...props}
    >
      <span className={isScrambling ? `${className} ${encryptedClassName}` : className}>
        {displayText}
      </span>
    </span>
  );
}
