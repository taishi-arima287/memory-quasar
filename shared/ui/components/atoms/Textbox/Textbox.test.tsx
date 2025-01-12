import { render, screen, fireEvent } from '@testing-library/react';
import { Textbox } from './Textbox';

describe('shared/ui/components/atoms/Textbox/index.tsx', () => {
  it('デフォルトのプロパティで正しくレンダリングされること', () => {
    render(<Textbox value="" onChange={() => {}} />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('textbox');
  });

  it('入力値の変更が正しく処理されること', () => {
    const handleChange = jest.fn();
    render(<Textbox value="" onChange={handleChange} />);
    
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'テスト' },
    });
    
    expect(handleChange).toHaveBeenCalledWith('テスト');
  });

  it('エラー状態が正しく反映されること', () => {
    render(<Textbox value="" onChange={() => {}} error />);
    expect(screen.getByRole('textbox')).toHaveClass('error');
  });

  it('無効化状態が正しく反映されること', () => {
    render(<Textbox value="" onChange={() => {}} disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('プレースホルダーが正しく表示されること', () => {
    render(<Textbox value="" onChange={() => {}} placeholder="入力してください" />);
    expect(screen.getByPlaceholderText('入力してください')).toBeInTheDocument();
  });
}); 