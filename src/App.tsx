import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import MessageInput from './components/MessageInput';
import Footer from './components/Footer';
import { Message, Chat } from './types';

function App(): JSX.Element {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const selectChat = (chatId: number | null): void => {
    if (chatId === null) {
      // Novo chat
      setActiveChat(null);
      setMessages([]);
    } else {
      const chat = chats.find(c => c.id === chatId);
      if (chat) {
        setActiveChat(chat);
        setMessages(chat.messages);
      }
    }
  };

  const sendMessage = (message: string): void => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now(),
        text: message,
        timestamp: new Date(),
        sender: 'user'
      };
      
      if (activeChat) {
        // Atualiza mensagens do chat ativo
        const updatedChats = chats.map(chat => 
          chat.id === activeChat.id 
            ? { ...chat, messages: [...chat.messages, newMessage] }
            : chat
        );
        setChats(updatedChats);
        setMessages([...messages, newMessage]);
      } else {
        // Cria novo chat baseado na primeira mensagem
        const chatName = message.length > 30 ? message.substring(0, 30) + '...' : message;
        const newChat: Chat = {
          id: Date.now(),
          name: chatName,
          messages: [newMessage]
        };
        
        setChats([...chats, newChat]);
        setActiveChat(newChat);
        setMessages([newMessage]);
      }
    }
  };

  const handleDeleteChat = (chatId: number): void => {
    const updatedChats = chats.filter(chat => chat.id !== chatId);
    setChats(updatedChats);
    
    // Se o chat ativo for o que está sendo excluído, limpa o chat ativo
    if (activeChat && activeChat.id === chatId) {
      setActiveChat(null);
      setMessages([]);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark bg-[#212121]' : 'bg-gray-50'}`}>
      {/* Header Fixo */}
      <div className="fixed top-0 left-0 right-0 z-20">
        <Header 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode} 
          toggleSidebar={toggleSidebar} 
        />
      </div>

      {/* Conteúdo Principal */}
      <div className="flex flex-1 overflow-hidden pt-16 w-full" style={{paddingBottom: '60px'}}>
        {/* Sidebar */}
        <div className={`h-[calc(100vh-124px)] flex-shrink-0 ${sidebarCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 ease-in-out`}>
          <Sidebar 
            darkMode={darkMode}
            collapsed={sidebarCollapsed} 
            toggleSidebar={toggleSidebar}
            chats={chats}
            activeChat={activeChat}
            onSelectChat={selectChat}
            onDeleteChat={handleDeleteChat}
          />
        </div>

        {/* Área de Chat */}
        <div className="flex-1 flex flex-col h-[calc(100vh-124px)] w-0">
          <div className="flex-1 overflow-y-auto w-full" style={{borderBottom: '2px solid transparent'}}>
            <ChatArea 
              messages={messages} 
              darkMode={darkMode} 
            />
          </div>
          <div className="w-full border-t border-gray-200 dark:border-[#404040]">
            <MessageInput 
              onSendMessage={sendMessage} 
              darkMode={darkMode} 
            />
          </div>
        </div>
      </div>

      {/* Footer Fixo */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto">
        <Footer darkMode={darkMode} />
      </footer>
    </div>
  );
}

export default App;
