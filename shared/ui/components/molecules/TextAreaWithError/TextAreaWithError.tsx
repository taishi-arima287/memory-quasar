import { forwardRef, TextareaHTMLAttributes } from "react";
import { TextArea } from "../../atoms/TextArea/TextArea";
import styles from "./TextAreaWithError.module.css";

export interface TextAreaWithErrorProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  label: string;
  error?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "full";
  rows?: number;
}

export const TextAreaWithError = forwardRef<HTMLTextAreaElement, TextAreaWithErrorProps>(
  ({ label, error, size = "md", rows = 4, className = "", id, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className={`${styles.container} ${styles[size]} ${className}`}>
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
        <TextArea ref={ref} id={inputId} rows={rows} error={!!error} {...props} />
        {error && <p className={styles.errorMessage}>{error}</p>}
      </div>
    );
  },
);

TextAreaWithError.displayName = "TextAreaWithError";
