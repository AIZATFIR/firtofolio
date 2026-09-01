import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

/**
 * ThemeToggle Component
 * Smooth spatial Dark / Light mode toggle with ambient background transitions.
 */
export default function ThemeToggle({ className = '' }) {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Check local storage or system preference
    const saved = localStorage.getItem('zafir-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = saved || (prefersDark ? 'dark' : 'light');
    setTheme(initial);
    document.documentElement.setAttribute('data-theme', initial);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('zafir-theme', next);
  };

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full border border-[var(--color-border)] bg-[var(--color-card-bg)] text-[var(--color-text)] hover:border-[var(--color-orange)] transition-all duration-300 select-none cursor-pointer flex items-center justify-center ${className}`}
      title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
      aria-label="Toggle Theme"
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {theme === 'light' ? (
          <Sun size={15} className="text-[var(--color-orange)] transition-transform duration-300 rotate-0 scale-100" />
        ) : (
          <Moon size={15} className="text-[var(--color-orange)] transition-transform duration-300 rotate-0 scale-100" />
        )}
      </div>
    </button>
  );
}
