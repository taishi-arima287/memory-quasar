import { forwardRef, TextareaHTMLAttributes } from "react";

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

const baseStyle =
  "w-full resize-none rounded-sm border p-2 text-base outline-none focus:border-secondary disabled:cursor-not-allowed disabled:bg-disabled";

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ error, rows = 4, className = "", ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        rows={rows}
        className={`${baseStyle} ${error ? "border-error" : "border-border"} ${className}`}
        {...props}
      />
    );
  },
);

TextArea.displayName = "TextArea";
