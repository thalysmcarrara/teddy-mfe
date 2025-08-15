import type { ReactNode } from "react"

export type CardProps = {
  footerSlotLeft?: ReactNode;
  footerSlotRight?: ReactNode;
  footerSlotCenter?: ReactNode;
  content?: ReactNode;
  title: string
}

export function Card({ footerSlotCenter, footerSlotLeft, footerSlotRight, title, content }: CardProps) {
  return (
    <div className="tds-card">
      <p className="tds-card-title">{title}</p>
      <div className="tds-card-content">{content}</div>
      <div className="tds-card-footer">
        <div className="tds-card-foot-slot tds-card-foot-slot-left">{footerSlotLeft}</div>
        <div className="tds-card-foot-slot tds-card-foot-slot-center">{footerSlotCenter}</div>
        <div className="tds-card-foot-slot tds-card-foot-slot-right">{footerSlotRight}</div>
      </div>
    </div>
  )
}