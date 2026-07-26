// Language switcher component for multi-language support
import { useState } from 'react';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  currentLanguage: string;
  onLanguageChange: (lang: string) => void;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ currentLanguage, onLanguageChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const languages = {
    'en': 'English',
    'lg': 'Luganda',
    'sw': 'Swahili',
    'es': 'Español'
  };

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: '#333',
          fontSize: '0.9rem'
        }}
      >
        <Globe size={18} />
        {languages[currentLanguage as keyof typeof languages]}
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: 0,
          background: 'white',
          border: '1px solid #ddd',
          borderRadius: '4px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 1000,
          minWidth: '150px'
        }}>
          {Object.entries(languages).map(([code, name]) => (
            <button
              key={code}
              onClick={() => {
                onLanguageChange(code);
                setIsOpen(false);
              }}
              style={{
                display: 'block',
                width: '100%',
                padding: '0.75rem 1rem',
                background: currentLanguage === code ? '#f0f0f0' : 'white',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                fontWeight: currentLanguage === code ? 'bold' : 'normal'
              }}
            >
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
