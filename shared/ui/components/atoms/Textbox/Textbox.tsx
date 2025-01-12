import styles from './Textbox.module.css';

export interface TextboxProps {
  type?: 'text' | 'password' | 'email';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  className?: string;
}

export const Textbox = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  disabled = false,
  error,
  className,
}: TextboxProps) => {
  return (
    <input
      type={type}
      className={`${styles.textbox} ${error ? styles.error : ''} ${className ?? ''}`}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
    />
  );
}; 