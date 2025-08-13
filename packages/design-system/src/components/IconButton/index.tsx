import React from 'react';
// import './icon-button.css';

type IconElement = React.ReactElement<{ className?: string }>;

export type IconButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  Icon: IconElement;
  label?: string;
  iconClassName?: string;
};

export function IconButton({
  Icon,
  label,
  className,
  iconClassName,
  ...rest
}: IconButtonProps) {
  const iconClass = ['tds-icon', iconClassName].filter(Boolean).join(' ');

  const iconNode = React.isValidElement(Icon)
    ? React.cloneElement(Icon, {
        className: [iconClass, Icon.props?.className].filter(Boolean).join(' ')
      })
    : null;

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={['tds-icon-button', className].filter(Boolean).join(' ')}
      {...rest}
    >
      {iconNode}
    </button>
  );
}