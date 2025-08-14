import type { ReactNode } from "react"
import './styles.css'

type DashboardLayoutProps = {
  children: ReactNode
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="tco-dashboard-layout-container">
      {children}
    </div>
  )
}