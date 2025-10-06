<<<<<<< HEAD
import React, { useState, useCallback } from 'react';
=======
import React, { useState, useCallback, ChangeEvent, KeyboardEvent } from 'react';
>>>>>>> 6ef53d9 (Tela de Configuração e melhoria no layout)
import { MessageInputProps } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowRight } from 'lucide-react';

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, darkMode }) => {
  const [message, setMessage] = useState<string>('');
<<<<<<< HEAD
=======
  const { t } = useLanguage();
>>>>>>> 6ef53d9 (Tela de Configuração e melhoria no layout)
  
  console.log('MessageInput renderizado. onSendMessage:', typeof onSendMessage);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log('Enviando mensagem (submit):', message);
<<<<<<< HEAD
    console.log('Função onSendMessage:', onSendMessage);
=======
>>>>>>> 6ef53d9 (Tela de Configuração e melhoria no layout)
    
    if (message.trim()) {
      console.log('Chamando onSendMessage com:', message.trim());
      try {
        onSendMessage(message.trim());
<<<<<<< HEAD
        console.log('Mensagem enviada com sucesso');
=======
>>>>>>> 6ef53d9 (Tela de Configuração e melhoria no layout)
        setMessage('');
      } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
      }
<<<<<<< HEAD
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
=======
    }
  }, [message, onSendMessage]);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (message.trim()) {
        try {
          onSendMessage(message.trim());
>>>>>>> 6ef53d9 (Tela de Configuração e melhoria no layout)
          setMessage('');
        } catch (error) {
          console.error('Erro ao enviar mensagem (Enter):', error);
        }
<<<<<<< HEAD
      } else {
        console.log('Mensagem vazia ao pressionar Enter');
=======
>>>>>>> 6ef53d9 (Tela de Configuração e melhoria no layout)
      }
    }
  }, [message, onSendMessage]);

<<<<<<< HEAD
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
=======
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  }, []);

  return (
    <div className="px-4 py-3 bg-gray-50 dark:bg-[#212121]" style={{marginBottom: '16px'}}>
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
>>>>>>> 6ef53d9 (Tela de Configuração e melhoria no layout)
        <div className="relative flex items-center">
          <div className="flex-1">
            <input
              type="text"
              value={message}
<<<<<<< HEAD
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
=======
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder={t('chat.placeholder')}
              className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-[#404040] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-[#212121] text-gray-900 dark:text-[#e5e5e5] placeholder-gray-500 dark:placeholder-gray-400"
              aria-label={t('chat.placeholder')}
>>>>>>> 6ef53d9 (Tela de Configuração e melhoria no layout)
              autoComplete="off"
            />
          </div>
          <button
            type="submit"
            className={`absolute right-2 p-2 rounded-full ${
              message.trim() 
                ? 'bg-[#DC2626] text-white hover:bg-[#B91C1C]' 
                : 'bg-gray-300 dark:bg-gray-600 text-gray-400 cursor-not-allowed'
            } transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:ring-opacity-50`}
            aria-label="Enviar mensagem"
            disabled={!message.trim()}
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
