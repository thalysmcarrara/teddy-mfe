import { type ReactNode } from "react"
import './styles.css'
import Header from "./components/Header"
import { usePathname } from "@src/routes/hooks/use-pathname"
import { useAuth } from "@src/auth/hooks/use-auth"
import { paths } from "@src/routes/paths"
import { House, LogOut, User } from "lucide-react"
import type { MenuItem } from "./components/Header/DesktopMenu"

type DashboardLayoutProps = {
  children: ReactNode
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const pathname = usePathname()
  const { userName, logout } = useAuth()

  const navList: MenuItem[] = [
  { label: 'Clientes', href: paths.customers, icon: <House size={28} /> },
  { label: 'Clientes selecionados', href: paths.selected, icon: <User size={28} />  },
  { label: 'Sair', href: paths.exit, action: logout ,icon: <LogOut size={28} /> },
]

  return (
    <div className="tco-dashboard-layout-container">
      <Header activePath={pathname} userGreeting={`Olá, ${userName}!`} items={navList} />
      {children}
    </div>
  )
}