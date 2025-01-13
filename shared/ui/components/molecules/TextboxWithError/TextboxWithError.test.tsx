import { render, screen } from "@testing-library/react";
import { TextboxWithError } from "./TextboxWithError";

describe("shared/ui/components/molecules/TextboxWithError/index.tsx", () => {
  const defaultProps = {
    label: "テストラベル",
    value: "",
    onChange: () => {},
  };

  it("デフォルトのプロパティで正しくレンダリングされること", () => {
    render(<TextboxWithError {...defaultProps} />);
    expect(screen.getByLabelText("テストラベル")).toBeInTheDocument();
  });

  it("エラーメッセージが表示されること", () => {
    const error = "エラーメッセージ";
    render(<TextboxWithError {...defaultProps} error={error} />);
    expect(screen.getByText(error)).toBeInTheDocument();
  });

  it("プレースホルダーが正しく表示されること", () => {
    const placeholder = "テスト入力";
    render(<TextboxWithError {...defaultProps} placeholder={placeholder} />);
    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
  });

  it("サイズプロパティが正しく適用されること", () => {
    render(<TextboxWithError {...defaultProps} size="lg" />);
    const container = screen.getByLabelText("テストラベル").parentElement?.parentElement;
    expect(container).toHaveClass("lg");
  });

  it("無効化状態が正しく反映されること", () => {
    render(<TextboxWithError {...defaultProps} disabled />);
    expect(screen.getByLabelText("テストラベル")).toBeDisabled();
  });

  it("type属性が正しく設定されること", () => {
    render(<TextboxWithError {...defaultProps} type="password" />);
    expect(screen.getByLabelText("テストラベル")).toHaveAttribute("type", "password");
  });

  it("カスタムクラス名が適用されること", () => {
    render(<TextboxWithError {...defaultProps} className="custom-class" />);
    const container = screen.getByLabelText("テストラベル").parentElement?.parentElement;
    expect(container).toHaveClass("custom-class");
  });
});
