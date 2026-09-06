import { forwardRef, TextareaHTMLAttributes } from "react";
import { TextArea } from "../../atoms/TextArea/TextArea";

export interface TextAreaWithErrorProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  label: string;
  error?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "full";
  rows?: number;
}

const sizeStyles = {
  xs: "w-40",
  sm: "w-60",
  md: "w-80",
  lg: "w-120",
  xl: "w-160",
  full: "w-full",
} as const;

export const TextAreaWithError = forwardRef<HTMLTextAreaElement, TextAreaWithErrorProps>(
  ({ label, error, size = "md", rows = 4, className = "", id, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className={`flex flex-col gap-1 ${sizeStyles[size]} ${className}`}>
        <label htmlFor={inputId} className="text-sm font-medium text-text">
          {label}
        </label>
        <TextArea ref={ref} id={inputId} rows={rows} error={!!error} {...props} />
        {error && <p className="text-sm text-error">{error}</p>}
      </div>
    );
  },
);

TextAreaWithError.displayName = "TextAreaWithError";
