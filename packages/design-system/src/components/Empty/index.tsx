export type EmptyProps = {
  title: string;
  subTitle?: string;
  className?: string;
}

export const Empty = ({ title, subTitle, className = '' }: EmptyProps) => (
  <div className={`empty-container ${className}`.trim()}>
    <div className="empty-icon">📋</div>
    <h4 className="empty-title">{title}</h4>
    {subTitle && (
      <p className="empty-subtitle">
        {subTitle}
      </p>
    )}
  </div>
);