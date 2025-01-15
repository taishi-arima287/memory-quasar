import { forwardRef, TextareaHTMLAttributes } from "react";
import styles from "./TextArea.module.css";

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ error, rows = 4, className = "", ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        rows={rows}
        className={`${styles.textarea} ${error ? styles.error : ""} ${className}`}
        {...props}
      />
    );
  },
);

TextArea.displayName = "TextArea";
