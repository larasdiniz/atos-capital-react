# 🏢 Atos Capital Chat

Uma aplicação de chat moderna desenvolvida com **Next.js 15**, **TypeScript**, **Tailwind CSS** e **Shadcn UI**, seguindo o design da marca Atos Capital.

## ✨ Características

- 🌓 **Modo Claro/Escuro**: Toggle completo entre temas
- 📱 **Layout Responsivo**: Adaptável a diferentes tamanhos de tela
- 🎨 **Design System**: Componentes Shadcn UI customizados
- 🔧 **TypeScript**: Tipagem completa para maior segurança
- ⚡ **Next.js 15**: Performance otimizada com App Router
- 🎯 **Barra Lateral**: Menu com ícones Lucide React
- 💬 **Área de Chat**: Interface limpa e intuitiva
- ✍️ **Input de Mensagem**: Campo para envio de mensagens
- 🔗 **Rodapé**: Links para redes sociais da empresa
- 🎨 **Paleta Atos Capital**: Cores oficiais da marca

## 🛠️ Stack Tecnológica

### **Frontend Framework**
- **Next.js 15.5.2** - Framework React com App Router
- **React 18.3.1** - Biblioteca de interface
- **TypeScript 4.8.4** - Tipagem estática

### **Styling & UI**
- **Tailwind CSS 3.1.6** - Framework CSS utilitário
- **Shadcn UI** - Sistema de componentes
- **Radix UI** - Componentes primitivos acessíveis
- **Class Variance Authority** - Variantes de componentes
- **Lucide React 0.460.0** - Biblioteca de ícones

### **Utilitários**
- **clsx** - Utilitário para classes condicionais
- **tailwind-merge** - Merge inteligente de classes Tailwind

## 🚀 Tutorial de Inicialização

### **Pré-requisitos**
- Node.js 16+ instalado
- npm ou yarn como gerenciador de pacotes

### **1. Clone o repositório**
```bash
git clone <url-do-repositorio>
cd Tela
```

### **2. Instale as dependências**
```bash
npm install
```

### **3. Execute em modo desenvolvimento**
```bash
npm run dev
```

### **4. Acesse a aplicação**
- **Local**: http://localhost:3000
- **Network**: http://192.168.0.3:3000

### **5. Scripts disponíveis**
```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build de produção
npm run start    # Servidor de produção
npm run lint     # Linting do código
```

## 📁 Estrutura do Projeto

```
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Layout raiz da aplicação
│   └── page.tsx                 # Página inicial
├── src/
│   ├── components/              # Componentes React
│   │   ├── ui/                  # Componentes Shadcn UI
│   │   │   └── button.tsx       # Componente Button customizado
│   │   ├── Header.tsx           # Cabeçalho com toggle dark/light
│   │   ├── Sidebar.tsx          # Barra lateral com menu
│   │   ├── ChatArea.tsx         # Área principal do chat
│   │   ├── MessageInput.tsx     # Input para mensagens
│   │   ├── Footer.tsx           # Rodapé com links sociais
│   │   ├── ContextMenu.tsx      # Menu contextual
│   │   └── DeleteConfirmation.tsx # Modal de confirmação
│   ├── lib/
│   │   └── utils.ts             # Utilitários (função cn)
│   ├── types/
│   │   └── index.ts             # Definições TypeScript
│   ├── App.tsx                  # Componente principal
│   ├── index.tsx                # Ponto de entrada (legado)
│   └── index.css                # Estilos globais e Tailwind
├── public/                       # Assets estáticos
│   ├── logo-atos.png            # Logo modo claro
│   ├── logo-atos-dark.png       # Logo modo escuro
│   ├── logo-atos-dark2.png      # Logo alternativo
│   └── linkedin-logo.png        # Logo LinkedIn
├── components.json               # Configuração Shadcn UI
├── next.config.js               # Configuração Next.js
├── tailwind.config.js           # Configuração Tailwind
├── tsconfig.json                # Configuração TypeScript
└── package.json                 # Dependências e scripts
```

## 🎨 Design System

### **Paleta de Cores Atos Capital**
```css
/* Cores principais */
--atos-red: #DC2626
--atos-dark-blue: #1E3A8A
--atos-gray: #6B7280
--atos-light-gray: #F3F4F6
--atos-dark-gray: #374151

/* Modo escuro */
--dark-bg: #1a1a1a
--dark-border: #404040
```

### **Componentes Shadcn UI**
- **Button**: `src/components/ui/button.tsx`
  - Variantes: default, destructive, outline, secondary, ghost, link
  - Tamanhos: default, sm, lg, icon

### **Ícones Lucide React**
- **Header**: Sun, Moon (toggle tema)
- **Sidebar**: MessageCircle, BarChart3, Users, Settings, FileText, LogOut, Menu
- **Footer**: Globe, Linkedin, Instagram
- **ContextMenu**: MoreVertical, Trash2

## 🔧 Configurações

### **Shadcn UI** (`components.json`)
```json
{
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/index.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "src/components",
    "utils": "src/lib/utils"
  }
}
```

### **Next.js** (`next.config.js`)
```javascript
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
}
```

## 📦 Dependências Principais

```json
{
  "dependencies": {
    "next": "^15.5.2",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "@radix-ui/react-slot": "^1.0.2",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "lucide-react": "^0.460.0",
    "tailwind-merge": "^1.14.0"
  }
}
```

## 🚀 Deploy

Para fazer deploy da aplicação:

1. **Build de produção**:
```bash
npm run build
```

2. **Iniciar servidor de produção**:
```bash
npm run start
```

## 📝 Notas de Desenvolvimento

- **Migração**: Projeto migrado de Create React App para Next.js 15
- **App Router**: Utiliza a nova estrutura de roteamento do Next.js
- **TypeScript**: Tipagem completa em todos os componentes
- **Responsividade**: Design adaptável para desktop e mobile
- **Acessibilidade**: Componentes Radix UI garantem boa acessibilidade

---

**Desenvolvido para Atos Capital** 🏢
