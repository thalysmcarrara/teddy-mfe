import React from 'react';

export type NumberSelectProps = {
  items: number[];
  value: number;
  onChange: (value: number) => void;
  id?: string;
  name?: string;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
};

export const NumberSelect: React.FC<NumberSelectProps> = ({
  items,
  value,
  onChange,
  id,
  name,
  disabled,
  className,
  ariaLabel,
}) => {
  return (
    <div className={`tds-number-select ${className ?? ''}`}>
      <select
        id={id}
        name={name}
        className="tds-number-select__control"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        disabled={disabled}
        aria-label={ariaLabel}
      >
        {items.map((n) => (
          <option style={{ textAlign: "center"}} key={n} value={n}>
            {n}
          </option>
        ))}
      </select>
    </div>
  );
};