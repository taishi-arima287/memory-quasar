import { forwardRef, InputHTMLAttributes } from "react";
import styles from "./Textbox.module.css";

export interface TextboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  error?: boolean;
  className?: string;
}

export const Textbox = forwardRef<HTMLInputElement, TextboxProps>(
  ({ type = "text", error, className, ...props }, ref) => {
    return (
      <input
        {...props}
        ref={ref}
        type={type}
        className={`${styles.textbox} ${error ? styles.error : ""} ${className ?? ""}`}
      />
    );
  },
);

Textbox.displayName = "Textbox";
