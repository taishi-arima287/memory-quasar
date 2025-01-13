import { forwardRef, InputHTMLAttributes } from "react";
import { Textbox } from "../../atoms/Textbox";
import styles from "./TextboxWithError.module.css";

export interface TextboxWithErrorProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label: string;
  error?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "full";
}

export const TextboxWithError = forwardRef<HTMLInputElement, TextboxWithErrorProps>(
  ({ label, error, size = "md", className = "", id, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className={`${styles.container} ${styles[size]} ${className}`}>
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
        <div className={styles.inputContainer}>
          <Textbox {...props} ref={ref} id={inputId} error={!!error} className={styles.textbox} />
          {error && <p className={styles.errorMessage}>{error}</p>}
        </div>
      </div>
    );
  },
);

TextboxWithError.displayName = "TextboxWithError";
