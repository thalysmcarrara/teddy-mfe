import { forwardRef, type InputHTMLAttributes } from "react";

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  errorMessage?: string;
  error?: boolean;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ errorMessage, error = false, id, className = "", ...props }, ref) => {
    const inputId = id || `tf-${Math.random().toString(36).slice(2)}`;

    return (
      <div className={`tf-wrapper tf-full ${className}`}>

        <input
          id={inputId}
          ref={ref}
          className={`tf-input ${error ? "tf-error" : ""}`}
          {...props}
        />
        {error && errorMessage && (
          <div className={`tf-helper ${error ? "tf-helper-error" : ""}`}>{errorMessage}</div>
        )}
      </div>
    );
  }
);
