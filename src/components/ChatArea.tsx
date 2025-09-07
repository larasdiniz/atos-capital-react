import React from 'react';
import { ChatAreaProps } from '../types';

const ChatArea: React.FC<ChatAreaProps> = ({ messages, darkMode }) => {
  const isUser = (sender: string): boolean => sender === 'user';

  return (
    <div className="w-full">
      {messages.length === 0 ? (
        <div className="text-center max-w-2xl mx-auto py-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-3">
            Bem-vindo ao Chat da Atos Capital
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
            Como posso ajudar você hoje? Estou aqui para responder suas perguntas sobre investimentos e serviços financeiros.
          </p>
        </div>
      ) : (
        <div className="flex flex-col space-y-4 p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${isUser(message.sender) ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-3xl items-start gap-2 ${isUser(message.sender) ? 'ml-auto' : ''}`}>
                {!isUser(message.sender) && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                    </svg>
                  </div>
                )}
                <div
                  className={`px-4 py-3 rounded-2xl ${
                    isUser(message.sender)
                      ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-tr-none'
                      : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-tl-none'
                  }`}
                >
                  <p className="text-sm md:text-base">{message.text}</p>
                  <p className="text-xs mt-1 opacity-70 text-right">
                    {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                {isUser(message.sender) && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatArea;
