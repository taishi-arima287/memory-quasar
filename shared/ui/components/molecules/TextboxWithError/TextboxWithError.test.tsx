import { render, screen, fireEvent } from '@testing-library/react';
import { TextboxWithError } from './TextboxWithError';

describe('shared/ui/components/molecules/TextboxWithError/index.tsx', () => {
  it('エラーなしで正しくレンダリングされること', () => {
    render(<TextboxWithError value="" onChange={() => {}} />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('入力値の変更が正しく処理されること', () => {
    const handleChange = jest.fn();
    render(<TextboxWithError value="" onChange={handleChange} />);
    
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'テスト' },
    });
    
    expect(handleChange).toHaveBeenCalledWith('テスト');
  });

  it('エラーメッセージが正しく表示されること', () => {
    const errorMessage = '必須項目です';
    render(<TextboxWithError value="" onChange={() => {}} error={errorMessage} />);
    const errorElement = screen.getByText(errorMessage);
    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveClass('errorMessage');
  });

  it('プレースホルダーが正しく表示されること', () => {
    render(
      <TextboxWithError 
        value="" 
        onChange={() => {}} 
        placeholder="入力してください" 
      />
    );
    expect(screen.getByPlaceholderText('入力してください')).toBeInTheDocument();
  });
}); 