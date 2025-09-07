import React, { useState, useRef, useEffect } from 'react';
import { ContextMenuProps } from '../types';
import { Button } from './ui/button';
import { MoreVertical, Trash2 } from 'lucide-react';

const ContextMenu: React.FC<ContextMenuProps> = ({ onDelete }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    e.preventDefault();
    if (onDelete) {
      onDelete();
    }
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMenu}
        className="h-6 w-6 p-1"
        aria-label="Menu de opções"
      >
        <MoreVertical className="h-4 w-4" />
      </Button>

      {isOpen && (
        <div 
          className="absolute right-0 z-50 mt-1 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 py-1"
          onClick={(e) => e.stopPropagation()}
          style={{
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
          }}
        >
          <div className="py-1" role="menu" aria-orientation="vertical">
            <Button
              variant="ghost"
              onClick={handleDeleteClick}
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 justify-start h-auto"
              role="menuitem"
            >
              <Trash2 className="h-4 w-4" />
              <span>Excluir conversa</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContextMenu;
