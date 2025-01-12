import { Textbox, TextboxProps } from '../../atoms/Textbox/Textbox';
import styles from './TextboxWithError.module.css';

interface TextboxWithErrorProps extends Omit<TextboxProps, 'error'> {
  error?: string;
}

export const TextboxWithError = ({
  error,
  ...textboxProps
}: TextboxWithErrorProps) => {
  return (
    <div className={styles.container}>
      <Textbox {...textboxProps} error={!!error} />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
}; 