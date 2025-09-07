import React, { useState } from 'react';
import { SidebarProps, MenuItem, ContextMenuState, DeleteConfirmationState } from '../types';
import { Button } from './ui/button';
import { MessageCircle, BarChart3, Users, Settings, FileText, LogOut, Menu } from 'lucide-react';
import ContextMenu from './ContextMenu';
import DeleteConfirmation from './DeleteConfirmation';

const Sidebar: React.FC<SidebarProps> = ({ darkMode, collapsed, toggleSidebar, chats, activeChat, onSelectChat, onDeleteChat }) => {
  const [contextMenu, setContextMenu] = useState<ContextMenuState>({ isOpen: false, x: 0, y: 0, chatId: null });
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
    setContextMenu({ ...contextMenu, isOpen: false });
  };

  const closeDeleteConfirmation = (): void => {
    setDeleteConfirmation({ isOpen: false, chatId: null, chatName: '' });
  };
  const menuItems: MenuItem[] = [
    { 
      icon: <MessageCircle className="w-5 h-5" />, 
      label: 'Chat', 
      active: true 
    },
    { 
      icon: <BarChart3 className="w-5 h-5" />, 
      label: 'Analytics', 
      active: false 
    },
    { 
      icon: <Users className="w-5 h-5" />, 
      label: 'Equipe', 
      active: false 
    },
    { 
      icon: <Settings className="w-5 h-5" />, 
      label: 'Configurações', 
      active: false 
    },
    { 
      icon: <FileText className="w-5 h-5" />, 
      label: 'Relatórios', 
      active: false 
    },
    { 
      icon: (
        <div className="w-8 h-8 bg-[#808080] dark:bg-[#600000] rounded-full flex items-center justify-center">
          <LogOut className="w-4 h-4 text-white" />
        </div>
      ), 
      label: 'Sair', 
      active: false 
    },
  ];

  return (
    <div className={`flex flex-col h-full bg-gray-100 dark:bg-[#181818] border-r border-gray-200 dark:border-[#404040] transition-all duration-300 ${collapsed ? 'w-16' : 'w-48'}`}>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-gray-200 dark:border-[#404040] flex items-center justify-between flex-shrink-0">
          {!collapsed && <h2 className="text-lg font-semibold text-atos-dark-gray dark:text-[#e5e5e5]">Menu</h2>}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
          >
            <Menu className="w-5 h-5 text-gray-600 dark:text-[#e5e5e5]" />
          </Button>
        </div>
        
        {/* Área com scroll para menu e chats */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <nav className="p-4">
            <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Button
                  variant={item.active ? "default" : "ghost"}
                  className={`w-full justify-start ${collapsed ? 'px-2' : 'px-4'} py-3 h-auto ${
                    item.active 
                      ? 'bg-[#D1D9E2] text-gray-800 hover:bg-[#D1D9E2]/90 dark:bg-atos-red dark:text-white dark:hover:bg-atos-red/90' 
                      : 'text-gray-700 dark:text-[#e5e5e5]'
                  }`}
                >
                  {item.icon}
                  {!collapsed && <span className="text-sm font-medium ml-3">{item.label}</span>}
                </Button>
              </li>
            ))}
            </ul>
          </nav>
          
          {/* Linha divisória vertical */}
          {!collapsed && (
            <div className="mx-4">
              <div className="h-px bg-gray-300 dark:bg-gray-600"></div>
            </div>
          )}
          
          {/* Seção de Chats */}
          {!collapsed && (
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-white">Chats</h3>
              </div>
              <div className="flex-1 overflow-y-auto p-2">
                {chats && chats.map((chat) => (
                  <div 
                    key={chat.id}
                    className="group relative flex items-center justify-between hover:bg-neutral-300 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                    onContextMenu={(e) => handleContextMenu(e, chat.id, chat.name)}
                  >
                    <div className="flex items-center justify-between w-full">
                      <button
                        onClick={() => onSelectChat(chat.id)}
                        className={`flex-1 text-left px-3 py-2 rounded-lg transition-colors duration-200 text-gray-700 dark:text-white text-sm truncate ${
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
                ))}
              </div>
            </div>
          )}
        </div>
        
        {!collapsed && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0" style={{marginBottom: '16px'}}>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-300 dark:bg-atos-red rounded-full flex items-center justify-center">
                <span className="text-gray-700 dark:text-white font-bold">U</span>
              </div>
              <div>
                <p className="font-medium text-gray-800 dark:text-white">Usuário</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Online</p>
              </div>
            </div>
          </div>
        )}
      </div>

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
