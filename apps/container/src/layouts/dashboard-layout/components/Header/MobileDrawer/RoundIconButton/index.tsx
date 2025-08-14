import { ArrowLeft } from "lucide-react"
import './styles.css'

type RoundIconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export const RoundIconButton = ({ className, ...props }: RoundIconButtonProps) => {
  return (
    <button {...props} className={`tco-round-icon-button-container ${className}`}>
      <div className="tco-round-icon-button-inner-content">
        <ArrowLeft size={16} />
      </div>
    </button>
  )
}