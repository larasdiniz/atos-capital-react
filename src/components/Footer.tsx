import React from 'react';
import { FooterProps, SocialLink } from '../types';
import { Button } from './ui/button';
import { Globe, Linkedin, Instagram } from 'lucide-react';

const Footer: React.FC<FooterProps> = ({ darkMode }) => {

  const socialLinks: SocialLink[] = [
    {
      icon: <Globe className="w-5 h-5" />,
      href: 'https://site.atoscapital.com.br/',
      label: 'Site'
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      href: 'https://www.linkedin.com/company/atos-capital/',
      label: 'LinkedIn'
    },
    {
      icon: <Instagram className="w-5 h-5" />,
      href: 'https://www.instagram.com/atoscapital/',
      label: 'Instagram'
    }
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-10 bg-white dark:bg-[#1a1a1a] border-t border-gray-200 dark:border-[#404040]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-3 md:mb-0">
            <img 
              src={darkMode ? "/logo-atos-dark2.png" : "/logo-atos.png"}
              alt="Atos Capital" 
              className="h-6 w-auto"
            />
          </div>
          
          <div className="flex space-x-2">
            {socialLinks.map((social, index) => (
              <Button
                key={index}
                variant="ghost"
                size="icon"
                asChild
              >
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 hover:text-[#DC2626] dark:text-[#e5e5e5] dark:hover:text-white"
                  aria-label={social.label}
                  title={social.label}
                >
                  {social.icon}
                </a>
              </Button>
            ))}
          </div>
        </div>
        
        <div className="mt-3 pt-3 border-t border-gray-100 dark:border-[#404040] text-center">
          <p className="text-xs text-gray-500 dark:text-[#b0b0b0]">
            © {new Date().getFullYear()} Atos Capital. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
