import type { ReactNode } from "react"
import './styles.css'

type AuthLayoutProps = {
  children: ReactNode
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <main className="tco-auth-layout-container">
      {children}
    </main>
  )
}