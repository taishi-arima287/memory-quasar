import styles from './Textbox.module.css';

export interface TextboxProps {
  type?: 'text' | 'password' | 'email';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  className?: string;
  id?: string;
}

export const Textbox = ({
  id,
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
      id={id}
      type={type}
      className={`${styles.textbox} ${error ? styles.error : ''} ${className ?? ''}`}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
    />
  );
}; 