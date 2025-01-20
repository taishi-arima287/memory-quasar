import { forwardRef, ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
  label: string;
  variant?: "primary" | "secondary";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "full";
  outline?: boolean;
  className?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      label,
      variant = "primary",
      size = "md",
      className = "",
      type = "button",
      outline = false,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        {...props}
        ref={ref}
        type={type}
        className={`${styles.button} ${styles[variant]} ${styles[size]} ${className} ${outline ? styles.outline : ""}`}
      >
        {label}
      </button>
    );
  },
);

Button.displayName = "Button";
