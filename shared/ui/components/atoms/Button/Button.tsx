import styles from './Button.module.css';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const Button = ({
  variant = 'primary',
  size = 'medium',
  label,
  onClick,
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${styles[size]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}; 