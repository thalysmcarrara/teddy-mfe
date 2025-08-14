
import { RouterLink } from '@src/routes/components';
import type { MenuItem } from '../DesktopMenu';
import { cloneElement, useEffect, useRef } from 'react';
import { Logo } from '../Logo';
import { RoundIconButton } from './RoundIconButton';

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  items: MenuItem[];
  activePath?: string;
}

export function MobileDrawer({ open, onClose, items, activePath }: MobileDrawerProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);
  useEffect(() => {
    if (open && firstLinkRef.current) firstLinkRef.current.focus();
  }, [open]);

  return (
    <>
      <div
        className={`tco-drawer-backdrop${open ? ' tco-is-open' : ''}`}
        onClick={onClose}
        aria-hidden={!open}
        data-testid="drawer-backdrop"
      />
      <aside
        className={`tco-drawer${open ? ' tco-is-open' : ''}`}
        aria-hidden={!open}
        aria-label="Menu lateral"
        role="dialog"
        id="mobile-drawer"
      >
        <div className="tco-drawer-banner">
          <Logo />
          <RoundIconButton className={ open ? '' : 'hidden' } onClick={onClose} />
        </div>
        <nav role="navigation" aria-label="Navegação móvel">
          <ul className="tco-drawer__list">
            {items.map((item, idx) => {
              const isActive = activePath === item.href;
              return (
                <li key={item.href} className="tco-drawer__item">
                  {item.icon && cloneElement(item.icon, { color: isActive ? 'var(--color-primary)' : undefined })}
                  <RouterLink
                    href={item.action ? '#' : item.href}
                    className={`tco-drawer__link${isActive ? ' tco-is-active' : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                    ref={idx === 0 ? firstLinkRef : undefined}
                    onClick={item?.action}
                  >
                    {item.label}
                  </RouterLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}