import { render, screen, fireEvent } from "@testing-library/react";
import { TextAreaWithError } from "./TextAreaWithError";

describe("shared/ui/components/molecules/TextAreaWithError/TextAreaWithError.tsx", () => {
  const defaultProps = {
    label: "テストラベル",
    value: "",
    onChange: () => {},
  };

  it("デフォルトのプロパティで正しくレンダリングされること", () => {
    render(<TextAreaWithError {...defaultProps} />);
    expect(screen.getByLabelText("テストラベル")).toBeInTheDocument();
  });

  it("エラーメッセージが表示されること", () => {
    const error = "エラーメッセージ";
    render(<TextAreaWithError {...defaultProps} error={error} />);
    expect(screen.getByText(error)).toBeInTheDocument();
  });

  it("プレースホルダーが正しく表示されること", () => {
    const placeholder = "テスト入力";
    render(<TextAreaWithError {...defaultProps} placeholder={placeholder} />);
    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
  });

  it("サイズプロパティが正しく適用されること", () => {
    const { container } = render(<TextAreaWithError {...defaultProps} size="lg" />);
    expect(container.firstChild).toHaveClass("lg");
  });

  it("無効化状態が正しく反映されること", () => {
    render(<TextAreaWithError {...defaultProps} disabled />);
    expect(screen.getByLabelText("テストラベル")).toBeDisabled();
  });

  it("入力値の変更が正しく処理されること", () => {
    const handleChange = jest.fn();
    render(<TextAreaWithError {...defaultProps} onChange={handleChange} />);
    const textarea = screen.getByLabelText("テストラベル");

    fireEvent.change(textarea, { target: { value: "新しいテキスト" } });
    expect(handleChange).toHaveBeenCalled();
  });

  it("カスタムクラス名が適用されること", () => {
    const { container } = render(<TextAreaWithError {...defaultProps} className="custom-class" />);
    expect(container.firstChild).toHaveClass("custom-class");
  });
});
