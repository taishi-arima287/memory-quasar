import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./Button";

describe("shared/ui/components/atoms/Button/index.tsx", () => {
  it("デフォルトのプロパティで正しくレンダリングされること", () => {
    render(<Button label="クリック" />);
    const button = screen.getByText("クリック");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("inline-flex");
    expect(button).toHaveClass("bg-primary");
    expect(button).toHaveClass("w-80");
  });

  it("クリックイベントが正しく発火すること", () => {
    const handleClick = jest.fn();
    render(<Button label="クリック" onClick={handleClick} />);
    fireEvent.click(screen.getByText("クリック"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("無効化状態が正しく反映されること", () => {
    render(<Button label="クリック" disabled />);
    expect(screen.getByText("クリック")).toBeDisabled();
  });

  it("異なるバリアントが正しく適用されること", () => {
    render(<Button label="クリック" variant="secondary" />);
    expect(screen.getByText("クリック")).toHaveClass("bg-secondary");
  });

  it("異なるサイズが正しく適用されること", () => {
    render(<Button label="クリック" size="lg" />);
    expect(screen.getByText("クリック")).toHaveClass("w-120");
  });
});
