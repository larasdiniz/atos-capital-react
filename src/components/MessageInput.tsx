import React, { useState, useCallback } from 'react';
import { MessageInputProps } from '../types';

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, darkMode }) => {
  const [message, setMessage] = useState<string>('');
  
  console.log('MessageInput renderizado. onSendMessage:', typeof onSendMessage);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log('Enviando mensagem (submit):', message);
    console.log('Função onSendMessage:', onSendMessage);
    
    if (message.trim()) {
      console.log('Chamando onSendMessage com:', message.trim());
      try {
        onSendMessage(message.trim());
        console.log('Mensagem enviada com sucesso');
        setMessage('');
      } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
      }
    } else {
      console.log('Mensagem vazia, não enviando');
    }
  }, [message, onSendMessage]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log('Tecla pressionada:', e.key);
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      console.log('Enter pressionado, mensagem:', message);
      if (message.trim()) {
        console.log('Enviando mensagem com Enter (trimmed):', message.trim());
        try {
          onSendMessage(message.trim());
          console.log('Mensagem enviada com sucesso (Enter)');
          setMessage('');
        } catch (error) {
          console.error('Erro ao enviar mensagem (Enter):', error);
        }
      } else {
        console.log('Mensagem vazia ao pressionar Enter');
      }
    }
  }, [message, onSendMessage]);

  console.log('MessageInput renderizando. Mensagem atual:', message);

  return (
    <div className="px-4 py-3 bg-gray-50 dark:bg-[#212121]" style={{marginBottom: '16px'}}>
      <form 
        onSubmit={(e) => {
          console.log('Formulário submetido');
          handleSubmit(e);
        }} 
        className="max-w-4xl mx-auto"
      >
        <div className="relative flex items-center">
          <div className="flex-1">
            <input
              type="text"
              value={message}
              onChange={(e) => {
                console.log('Mensagem alterada para:', e.target.value);
                setMessage(e.target.value);
              }}
              onKeyDown={(e) => {
                console.log('Tecla pressionada:', e.key);
                handleKeyDown(e);
              }}
              placeholder="Digite sua mensagem..."
              className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-[#404040] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-[#212121] text-gray-900 dark:text-[#e5e5e5] placeholder-gray-500 dark:placeholder-gray-400"
              aria-label="Digite sua mensagem"
              autoComplete="off"
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
