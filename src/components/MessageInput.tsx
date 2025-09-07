import React, { useState } from 'react';
import { MessageInputProps } from '../types';

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, darkMode }) => {
  const [message, setMessage] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onSendMessage(message);
    setMessage('');
  };

  return (
    <div className="border-t border-gray-200 dark:border-[#404040] bg-white dark:bg-[#303030] px-4 py-3" style={{marginBottom: '16px', backgroundColor: 'transparent'}}> 
      <form 
        onSubmit={handleSubmit} 
        className="max-w-4xl mx-auto"
      >
        <div className="relative flex items-center">
          <div className="flex-1">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Digite sua mensagem..."
              className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-[#505050] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-[#404040] text-gray-900 dark:text-[#e5e5e5] placeholder-gray-500 dark:placeholder-gray-400"
              aria-label="Digite sua mensagem"
            />
          </div>
          <button
            type="submit"
            disabled={!message.trim()}
            className={`absolute right-2 p-2 rounded-full ${
              message.trim() 
                ? 'bg-[#DC2626] text-white hover:bg-[#B91C1C]' 
                : 'bg-gray-300 dark:bg-gray-600 text-gray-400 cursor-not-allowed'
            } transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:ring-opacity-50`}
            aria-label="Enviar mensagem"
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" 
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
