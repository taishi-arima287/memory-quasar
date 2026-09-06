import { forwardRef, InputHTMLAttributes } from "react";
import { Textbox } from "../../atoms/Textbox";

export interface TextboxWithErrorProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label: string;
  error?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "full";
}

const sizeStyles = {
  xs: "w-40",
  sm: "w-60",
  md: "w-80",
  lg: "w-120",
  xl: "w-160",
  full: "w-full",
} as const;

export const TextboxWithError = forwardRef<HTMLInputElement, TextboxWithErrorProps>(
  ({ label, error, size = "md", className = "", id, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className={`flex flex-col gap-1 max-[600px]:w-full ${sizeStyles[size]} ${className}`}>
        <label htmlFor={inputId} className="text-sm font-medium text-text">
          {label}
        </label>
        <div className="flex flex-col gap-1">
          <Textbox {...props} ref={ref} id={inputId} error={!!error} className="w-full" />
          {error && <p className="text-sm leading-[1.2] text-error">{error}</p>}
        </div>
      </div>
    );
  },
);

TextboxWithError.displayName = "TextboxWithError";
