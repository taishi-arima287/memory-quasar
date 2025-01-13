import { render, screen, fireEvent } from '@testing-library/react';
import { Textbox } from './Textbox';

describe('shared/ui/components/atoms/Textbox/index.tsx', () => {
  it('デフォルトのプロパティで正しくレンダリングされること', () => {
    render(<Textbox />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('textbox');
  });

  it('入力値の変更が正しく処理されること', () => {
    const handleChange = jest.fn();
    render(<Textbox onChange={e => handleChange(e.target.value)} />);
    
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'テスト' }
    });
    
    expect(handleChange).toHaveBeenCalledWith('テスト');
  });

  it('エラー状態が正しく反映されること', () => {
    render(<Textbox error />);
    expect(screen.getByRole('textbox')).toHaveClass('error');
  });

  it('無効化状態が正しく反映されること', () => {
    render(<Textbox disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('プレースホルダーが正しく表示されること', () => {
    const placeholder = 'テスト入力';
    render(<Textbox placeholder={placeholder} />);
    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
  });
}); 