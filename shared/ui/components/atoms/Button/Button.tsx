import { forwardRef, ButtonHTMLAttributes } from "react";

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
  label: string;
  variant?: "primary" | "secondary" | "tertiary";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "full";
  outline?: boolean;
  className?: string;
}

const baseStyle =
  "inline-flex h-10 cursor-pointer items-center justify-center rounded-sm font-medium leading-none transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50";

const solidVariantStyles = {
  primary: "bg-primary text-white enabled:hover:opacity-60",
  secondary: "bg-secondary text-white enabled:hover:opacity-60",
  tertiary: "bg-tertiary text-white enabled:hover:opacity-60",
} as const;

const outlineVariantStyles = {
  primary: "border border-primary bg-white text-primary enabled:hover:opacity-80",
  secondary: "border border-secondary bg-white text-secondary enabled:hover:opacity-80",
  tertiary: "border border-tertiary bg-white text-tertiary enabled:hover:opacity-80",
} as const;

// 幅・余白・文字サイズは同じプロパティ同士で競合するため、サイズごとにまとめて指定する
const sizeStyles = {
  xs: "w-40 px-2 py-1 text-sm",
  sm: "w-60 px-3 py-1 text-base",
  md: "w-80 px-3 py-2 text-base",
  lg: "w-120 px-4 py-3 text-base",
  xl: "w-160 px-5 py-3 text-lg",
  full: "w-full px-3 py-2 text-base",
} as const;

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
    const variantStyle = outline ? outlineVariantStyles[variant] : solidVariantStyles[variant];

    return (
      <button
        {...props}
        ref={ref}
        type={type}
        className={`${baseStyle} ${variantStyle} ${sizeStyles[size]} ${className}`}
      >
        {label}
      </button>
    );
  },
);

Button.displayName = "Button";
