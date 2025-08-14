import { DesktopMenu, type MenuItem } from './DesktopMenu';
import { MobileDrawer } from './MobileDrawer';
import { useMediaQuery } from '@src/hooks/use-media-query';
import { Menu } from 'lucide-react'
import { IconButton } from '@teddy/design-system'
import './styles.css';
import { useEffect, useState } from 'react';
import { Logo } from './Logo';


export interface HeaderProps {
  items: MenuItem[];
  activePath?: string;
  userGreeting?: string;
  breakpoint?: string;
}

export function Header({
  items,
  activePath = '/',
  userGreeting = 'Olá, Usuário!',
  breakpoint = '(min-width: 1024px)',
}: HeaderProps) {
  const isDesktop = useMediaQuery(breakpoint);
  const isNotMobile = useMediaQuery('(min-width: 400px)')
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isDesktop && open) setOpen(false);
  }, [isDesktop, open]);

  return (
    <header className="tco-app-header" role="banner">
      <div className="tco-left-group">
        {
          !isDesktop ? (<IconButton Icon={<Menu size={36} />} onClick={() => setOpen(true)} />) : null
        }

        <Logo />
      </div> 

      {isDesktop ? (
          <DesktopMenu items={items} activePath={activePath} />
        ) : null
      }
      
      {
        isNotMobile ? (
          <span className="tco-greeting">{userGreeting}</span>
        ) : null
      }
      

      {!isDesktop && (
        <MobileDrawer open={open} onClose={() => setOpen(false)} items={items} activePath={activePath} />
      )}
    </header>
  );
}

export default Header;