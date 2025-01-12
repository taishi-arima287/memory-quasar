import { TextboxProps, Textbox } from '../../atoms/Textbox';
import styles from './TextboxWithError.module.css';

export interface TextboxWithErrorProps extends Omit<TextboxProps, 'error' | 'className'> {
  label: string;
  error?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
}

export const TextboxWithError = ({
  label,
  error,
  size = 'md',
  className = '',
  ...props
}: TextboxWithErrorProps) => {
  return (
    <div className={`${styles.container} ${styles[size]} ${className}`}>
      <label className={styles.label}>{label}</label>
      <div className={styles.inputContainer}>
        <Textbox
          {...props}
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