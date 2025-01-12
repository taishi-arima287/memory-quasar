import { TextboxProps, Textbox } from '../../atoms/Textbox';
import styles from './TextboxWithError.module.css';

export interface TextboxWithErrorProps extends Omit<TextboxProps, 'error' | 'className' | 'id'> {
  label: string;
  error?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
  id?: string;
}

export const TextboxWithError = ({
  label,
  error,
  size = 'md',
  className = '',
  id,
  ...props
}: TextboxWithErrorProps) => {
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className={`${styles.container} ${styles[size]} ${className}`}>
      <label 
        htmlFor={inputId}
        className={styles.label}
      >
        {label}
      </label>
      <div className={styles.inputContainer}>
        <Textbox
          {...props}
          id={inputId}
          error={!!error}
          className={styles.textbox}
        />
        {error && (
          <p className={styles.errorMessage}>
            {error}
          </p>
        )}
      </div>
    </div>
  );
}; 