import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with default props', () => {
    render(<Button label="Click me" />);
    const button = screen.getByText('Click me');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('button');
    expect(button).toHaveClass('primary');
    expect(button).toHaveClass('medium');
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button label="Click me" onClick={handleClick} />);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button label="Click me" disabled />);
    expect(screen.getByText('Click me')).toBeDisabled();
  });
}); 