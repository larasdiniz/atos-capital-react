import React, { useState } from 'react';
import { SidebarProps, MenuItem, ContextMenuState, DeleteConfirmationState } from '../types';
import { Button } from './ui/button';
import { MessageCircle, Settings as SettingsIcon, FileText, LogOut, Menu, MoreVertical, Trash2, ChevronDown, User, Settings, LogOut as LogOutIcon, ArrowUpRight } from 'lucide-react';
import ContextMenu from './ContextMenu';
import DeleteConfirmation from './DeleteConfirmation';
import dynamic from 'next/dynamic';
import { useLanguage } from '../contexts/LanguageContext';

<<<<<<< HEAD
const Sidebar: React.FC<SidebarProps> = ({ collapsed, toggleSidebar, chats, activeChat, onSelectChat, onDeleteChat }) => {
=======
// Dynamically import Settings with no SSR to avoid hydration issues
const SettingsModal = dynamic(() => import('./Settings'), { ssr: false });

const Sidebar: React.FC<SidebarProps> = ({ collapsed, toggleSidebar, chats, activeChat, onSelectChat, onDeleteChat, onAddChat }) => {
  // Estado para controlar qual chat tem o menu de opções aberto
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
>>>>>>> 6ef53d9 (Tela de Configuração e melhoria no layout)
  const [contextMenu, setContextMenu] = useState<ContextMenuState>({ isOpen: false, x: 0, y: 0, chatId: null, chatName: '' });
  const [deleteConfirmation, setDeleteConfirmation] = useState<DeleteConfirmationState>({ isOpen: false, chatId: null, chatName: '' });
  const [showSettings, setShowSettings] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { t } = useLanguage();

  // Apply saved theme on component mount
  React.useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null;
    const isDarkMode = savedTheme === 'dark' || 
                     (savedTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else if (savedTheme === 'light') {
      document.documentElement.classList.remove('dark');
    }
  }, []);

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

<<<<<<< HEAD
=======
  const handleLogout = (): void => {
    // Adicione aqui a lógica de logout
    console.log('Usuário deslogado');
  };

  // Alterna a visibilidade do menu de opções para um chat específico
  const toggleMenu = (e: React.MouseEvent, chatId: number): void => {
    e.stopPropagation(); // Evita que o clique propague para o item da lista
    setOpenMenuId(openMenuId === chatId ? null : chatId);
  };

  // Fecha o menu de opções quando clicar fora dele
  const closeMenu = (): void => {
    setOpenMenuId(null);
  };

  // Fecha o menu quando clicar em qualquer lugar do documento
  React.useEffect(() => {
    const handleClickOutside = (): void => {
      if (openMenuId !== null) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [openMenuId]);

>>>>>>> 6ef53d9 (Tela de Configuração e melhoria no layout)
  const handleNewChat = (e: React.MouseEvent) => {
    e.preventDefault();
    const newChat = {
      id: Date.now(),
      name: `Chat ${chats.length + 1}`,
      messages: []
    };
<<<<<<< HEAD
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
=======
    
    console.log('Novo chat criado:', newChat);
    
    // Adiciona o novo chat à lista de chats
    if (onAddChat) {
      onAddChat(newChat);
    }
    
    // Seleciona o novo chat
    onSelectChat(newChat.id);
  };

  const handleNewChatClick = (e: React.MouseEvent) => {
    console.log('Botão Novo Chat clicado');
    e.preventDefault();
    e.stopPropagation();
    handleNewChat(e);
  };

  const menuItems: MenuItem[] = [
    { 
      icon: <MessageCircle className="w-5 h-5 dark:text-white" />, 
      label: t('sidebar.newChat'), 
      active: true,
      onClick: handleNewChatClick
    },
    { 
      icon: <FileText className="w-5 h-5 dark:text-white" />, 
      label: t('sidebar.reports'), 
      active: false 
    }
  ];

  return (
    <div className="flex flex-col h-full w-full bg-gray-100 dark:bg-[#1a1a1a]">
      {/* Logo */}
      <div className="p-4 flex justify-center">
        {!collapsed ? (
          <>
            {/* Full logo for light mode */}
            <img 
              src={"/logo-atos.png"}
              alt="Atos Capital" 
              className="h-10 w-auto max-h-full dark:hidden"
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            {/* Full logo for dark mode */}
            <img 
              src={"/logo-atos-dark2.png"}
              alt="Atos Capital" 
              className="h-10 w-auto max-h-full hidden dark:block"
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </>
        ) : (
          <>
            {/* Collapsed logo for light mode */}
            <img 
              src={"/logo-atosCut.png"}
              alt="Atos Capital" 
              className="h-10 w-auto max-h-full dark:hidden"
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            {/* Collapsed logo for dark mode */}
            <img 
              src={"/logo-atos-darkCut.png"}
              alt="Atos Capital" 
              className="h-10 w-auto max-h-full hidden dark:block"
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </>
        )}
        <div className="w-8 h-8 bg-gray-800 dark:bg-white rounded-full items-center justify-center" style={{display: 'none'}}>
          <span className="text-white dark:text-atos-dark-blue font-bold text-sm">AC</span>
        </div>
      </div>
      
      {/* Cabeçalho fixo */}
      <div className="p-4 flex items-center justify-between">
        {!collapsed && <h2 className="text-lg font-semibold text-black dark:text-white">{t('sidebar.menu')}</h2>}
>>>>>>> 6ef53d9 (Tela de Configuração e melhoria no layout)
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <Menu className="w-5 h-5 dark:text-white" />
        </Button>
      </div>
      
<<<<<<< HEAD
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
=======
      {/* Menu */}
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
                    : ''
                }`}
                style={{ border: 'none', boxShadow: 'none' }}
              >
                <div className={`flex items-center ${!collapsed ? 'w-5 h-5 mr-4' : 'w-6 h-6'}`}>
                  {item.icon}
                </div>
                {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
              </Button>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* Lista de conversas - Só mostra quando a barra lateral estiver aberta */}
      {!collapsed && (
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {t('sidebar.chatHistory')}
          </h3>
          
          {chats.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">{t('sidebar.noChats')}</p>
            </div>
          ) : (
            <ul className="space-y-1">
              {chats.map((chat) => (
                <li 
                  key={chat.id}
                  onContextMenu={(e) => handleContextMenu(e, chat.id, chat.name)}
                  className={`rounded-md p-2 cursor-pointer group relative ${
                    activeChat && activeChat.id === chat.id 
                      ? 'bg-gray-200 dark:bg-gray-700' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => onSelectChat(chat.id)}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-sm truncate pr-2">{chat.name}</span>
                    
                    {/* Botão de três pontos */}
                    <button 
                      className="opacity-0 group-hover:opacity-100 focus:opacity-100 p-1 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-opacity"
                      onClick={(e) => toggleMenu(e, chat.id)}
                    >
                      <MoreVertical className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    </button>
                    
                    {/* Menu de opções */}
                    {openMenuId === chat.id && (
                      <div 
                        className="absolute right-0 z-10 mt-1 w-32 origin-top-right rounded-md bg-gray-100 dark:bg-[#1a1a1a] shadow-lg ring-1 ring-gray-200 dark:ring-gray-700 focus:outline-none"
                        role="menu"
                        aria-orientation="vertical"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="py-1" role="none">
                          <button
                            onClick={() => {
                              handleDeleteChat(chat.id);
                              setOpenMenuId(null);
                            }}
                            className="flex items-center w-full px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-150"
                            role="menuitem"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            <span>Excluir</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      
      {/* Área do usuário fixa na parte inferior */}
      <div className="relative p-4 bg-gray-50 dark:bg-[#181818] mt-auto">
        <div 
          className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'} cursor-pointer`}
          onClick={() => setShowUserMenu(!showUserMenu)}
        >
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-400 dark:bg-atos-red rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-white" />
>>>>>>> 6ef53d9 (Tela de Configuração e melhoria no layout)
            </div>
            {!collapsed && (
              <div className="min-w-0 ml-3">
                <p className="font-medium text-black dark:text-white truncate">{t('sidebar.user')}</p>
              </div>
            )}
          </div>
          {!collapsed && (
            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${showUserMenu ? 'transform rotate-180' : ''}`} />
          )}
        </div>

        {/* Dropdown do usuário */}
        {showUserMenu && (
          <div className={`absolute bottom-full mb-2 bg-white dark:bg-[#1a1a1a] rounded-md shadow-lg z-50 overflow-hidden whitespace-nowrap ${
            collapsed ? 'left-0' : 'left-0 right-0 mx-4'
          }`}>
            <a
              href="https://site.atoscapital.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <ArrowUpRight className="w-4 h-4 mr-4" />
              Fazer Upgrade
            </a>
            <button
              onClick={() => {
                setShowSettings(true);
                setShowUserMenu(false);
              }}
              className="w-full flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Settings className="w-4 h-4 mr-4" />
              Configurações
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <LogOutIcon className="w-4 h-4 mr-4" />
              Sair da Conta
            </button>
          </div>
        )}
      </div>
      
<<<<<<< HEAD
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

=======
>>>>>>> 6ef53d9 (Tela de Configuração e melhoria no layout)
      {/* Context Menu */}
      {contextMenu.isOpen && (
        <div 
          className="fixed bg-white dark:bg-gray-800 shadow-lg rounded-md py-1 z-50"
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
            {t('sidebar.deleteChat')}
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
      
      {/* Settings Modal */}
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </div>
  );
};
export default Sidebar;
