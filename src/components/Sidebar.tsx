import React, { useState } from 'react';
import { SidebarProps, MenuItem, ContextMenuState, DeleteConfirmationState } from '../types';
import { Button } from './ui/button';
import { MessageCircle, BarChart3, Users, Settings, FileText, LogOut, Menu } from 'lucide-react';
import ContextMenu from './ContextMenu';
import DeleteConfirmation from './DeleteConfirmation';

const Sidebar: React.FC<SidebarProps> = ({ collapsed, toggleSidebar, chats, activeChat, onSelectChat, onDeleteChat }) => {
  const [contextMenu, setContextMenu] = useState<ContextMenuState>({ isOpen: false, x: 0, y: 0, chatId: null, chatName: '' });
  const [deleteConfirmation, setDeleteConfirmation] = useState<DeleteConfirmationState>({ isOpen: false, chatId: null, chatName: '' });

  const handleContextMenu = (e: React.MouseEvent, chatId: number, chatName: string): void => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({
      isOpen: true,
      x: e.clientX,
      y: e.clientY,
      chatId,
      chatName
    });
  };

  const handleDeleteChat = (chatId: number): void => {
    const chat = chats.find(c => c.id === chatId);
    if (chat) {
      setDeleteConfirmation({
        isOpen: true,
        chatId,
        chatName: chat.name
      });
    }
  };

  const confirmDelete = () => {
    if (deleteConfirmation.chatId) {
      onDeleteChat(deleteConfirmation.chatId);
      setDeleteConfirmation({ isOpen: false, chatId: null, chatName: '' });
    }
  };

  const closeContextMenu = (): void => {
    setContextMenu(prev => ({ ...prev, isOpen: false }));
  };

  const closeDeleteConfirmation = (): void => {
    setDeleteConfirmation({ isOpen: false, chatId: null, chatName: '' });
  };

  const handleNewChat = (e: React.MouseEvent) => {
    e.preventDefault();
    const newChat = {
      id: Date.now(),
      name: `Chat ${chats.length + 1}`,
      messages: []
    };
    onSelectChat(newChat.id);
  };

  const menuItems: MenuItem[] = [
    { 
      icon: <MessageCircle className="w-5 h-5 dark:text-white" />, 
      label: 'Chat', 
      active: true,
      onClick: handleNewChat
    },
    { 
      icon: <BarChart3 className="w-5 h-5 dark:text-white" />, 
      label: 'Analytics', 
      active: false 
    },
    { 
      icon: <Users className="w-5 h-5 dark:text-white" />, 
      label: 'Equipe', 
      active: false 
    },
    { 
      icon: <Settings className="w-5 h-5 dark:text-white" />, 
      label: 'Configurações', 
      active: false 
    },
    { 
      icon: <FileText className="w-5 h-5 dark:text-white" />, 
      label: 'Relatórios', 
      active: false 
    },
    { 
      icon: <LogOut className="w-5 h-5 dark:text-white" />,
      label: 'Sair',
      active: false 
    },
  ];

  return (
    <div className="flex flex-col h-full w-full bg-gray-100 dark:bg-[#1a1a1a] border-r border-gray-200 dark:border-[#404040]">
      {/* Cabeçalho fixo */}
      <div className="p-4 border-b border-gray-200 dark:border-[#404040] flex items-center justify-between">
        {!collapsed && <h2 className="text-lg font-semibold text-black dark:text-white">Menu</h2>}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <Menu className="w-5 h-5 dark:text-white" />
        </Button>
      </div>
      
      {/* Conteúdo principal com rolagem */}
      <div className="flex-1 flex flex-col min-h-0">
        <nav className="p-4 flex-shrink-0">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Button
                  variant={item.active ? "default" : "ghost"}
                  onClick={item.onClick}
                  className={`w-full justify-center ${collapsed ? 'px-0' : 'px-4 justify-start'} py-3 h-auto ${
                    item.active 
                      ? 'bg-[#D1D9E2] text-black hover:bg-[#D1D9E2]/90 dark:bg-atos-red dark:text-white dark:hover:bg-atos-red/90' 
                      : 'text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white'
                  }`}
                >
                  <div className={`flex items-center ${!collapsed ? 'w-5 h-5' : 'w-6 h-6'}`}>
                    {item.icon}
                  </div>
                  {!collapsed && <span className="text-sm font-medium ml-3">{item.label}</span>}
                </Button>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Linha divisória - removendo a linha mantendo apenas o espaçamento */}
        {!collapsed && (
          <div className="px-4 py-2 flex-shrink-0">
            <div className="h-px bg-transparent"></div>
          </div>
        )}
        
        {/* Seção de Chats com rolagem */}
        {!collapsed && (
          <div className="flex-1 flex flex-col min-h-0">
            <div className="p-4 pb-2 flex-shrink-0">
              <h3 className="text-sm font-semibold text-black dark:text-white">Chats</h3>
            </div>
            <div className="flex-1 overflow-y-auto px-2">
              <div className="space-y-1 pb-2">
                {(() => {
                  console.log('Renderizando chats:', chats);
                  return chats && chats.map((chat) => (
                    <div 
                      key={chat.id}
                      className="group relative flex items-center justify-between hover:bg-neutral-300 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                      onContextMenu={(e) => handleContextMenu(e, chat.id, chat.name)}
                    >
                      <div className="flex items-center justify-between w-full">
                        <button
                          onClick={() => onSelectChat(chat.id)}
                          className={`flex-1 text-left px-3 py-2 rounded-lg transition-colors duration-200 text-black dark:text-white text-sm truncate ${
                            activeChat?.id === chat.id ? 'bg-neutral-300 dark:bg-gray-700' : ''
                          }`}
                          title={chat.name}
                        >
                          {chat.name}
                        </button>
                        <div className="flex-shrink-0 pl-2">
                          <ContextMenu 
                            onDelete={() => handleDeleteChat(chat.id)}
                          />
                        </div>
                      </div>
                    </div>
                  ));
                })()}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Área do usuário fixa na parte inferior */}
      {!collapsed && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0 bg-gray-100 dark:bg-[#181818]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-300 dark:bg-atos-red rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-gray-700 dark:text-white font-bold">U</span>
            </div>
            <div className="min-w-0">
              <p className="font-medium text-black dark:text-white truncate">Usuário</p>
              <p className="text-sm text-black dark:text-gray-300 truncate">Online</p>
            </div>
          </div>
        </div>
      )}

      {/* Context Menu */}
      {contextMenu.isOpen && (
        <div 
          className="fixed z-50 bg-white dark:bg-gray-800 shadow-lg rounded-md py-1 w-48"
          style={{
            top: `${contextMenu.y}px`,
            left: `${contextMenu.x}px`,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => {
              if (contextMenu.chatId !== null) {
                handleDeleteChat(contextMenu.chatId);
              }
              closeContextMenu();
            }}
            className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Excluir conversa
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmation
        isOpen={deleteConfirmation.isOpen}
        onClose={closeDeleteConfirmation}
        onConfirm={confirmDelete}
        chatName={deleteConfirmation.chatName}
      />
    </div>
  );
};

export default Sidebar;
