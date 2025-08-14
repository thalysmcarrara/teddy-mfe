import { RouterLink } from "@src/routes/components";
import type { ReactElement } from "react";

export type MenuItem = { label: string; href: string, action?: () => void   ,icon?: ReactElement<{ color?: string }> };

interface DesktopMenuProps {
  items: MenuItem[];
  activePath?: string;
}

export function DesktopMenu({ items, activePath }: DesktopMenuProps) {
  return (
    <nav className="tco-desktop-nav" aria-label="Navegação principal">
      <ul className="tco-desktop-nav__list">
        {items.map((item) => {
          const isActive = activePath === item.href;
          return (
            <li key={item.href} className="tco-desktop-nav__item">
              <RouterLink href={item.href}
                className={`tco-desktop-nav__link${isActive ? ' tco-is-active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </RouterLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}