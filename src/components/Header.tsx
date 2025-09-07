import React from 'react';
import { HeaderProps } from '../types';
import { Button } from './ui/button';
import { Sun, Moon } from 'lucide-react';

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 text-gray-800 px-6 py-4 flex justify-between items-center border-b border-gray-200 dark:border-[#404040] bg-[#F2F5F8] dark:bg-[#1a1a1a]">
      <div className="flex items-center space-x-3">
        <img 
          src={darkMode ? "/logo-atos-dark2.png" : "/logo-atos.png"}
          alt="Atos Capital" 
          className="h-10 w-auto max-h-full"
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            const target = e.target as HTMLImageElement;
            const nextSibling = target.nextSibling as HTMLElement;
            target.style.display = 'none';
            if (nextSibling) {
              nextSibling.style.display = 'flex';
            }
          }}
        />
        <div className="w-8 h-8 bg-gray-800 dark:bg-white rounded-full items-center justify-center" style={{display: 'none'}}>
          <span className="text-white dark:text-atos-dark-blue font-bold text-sm">AC</span>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleDarkMode}
          aria-label={darkMode ? 'Ativar modo claro' : 'Ativar modo escuro'}
          className="text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {darkMode ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </Button>
      </div>
    </header>
  );
};

export default Header;
