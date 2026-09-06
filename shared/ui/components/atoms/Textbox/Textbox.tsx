import { forwardRef, InputHTMLAttributes } from "react";

export interface TextboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  error?: boolean;
  className?: string;
}

const baseStyle =
  "h-10 w-full rounded-sm border p-2 text-base outline-none transition-all duration-200 focus:border-secondary disabled:cursor-not-allowed disabled:bg-disabled";

export const Textbox = forwardRef<HTMLInputElement, TextboxProps>(
  ({ type = "text", error, className, ...props }, ref) => {
    return (
      <input
        {...props}
        ref={ref}
        type={type}
        className={`${baseStyle} ${error ? "border-error" : "border-border"} ${className ?? ""}`}
      />
    );
  },
);

Textbox.displayName = "Textbox";
