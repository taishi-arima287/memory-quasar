import { render, screen, fireEvent } from "@testing-library/react";
import { TextArea } from "./TextArea";

describe("shared/ui/components/atoms/TextArea/index.tsx", () => {
  it("デフォルトのプロパティで正しくレンダリングされること", () => {
    render(<TextArea />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveClass("textarea");
  });

  it("入力値の変更が正しく処理されること", () => {
    const handleChange = jest.fn();
    render(<TextArea onChange={(e) => handleChange(e.target.value)} />);

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "テスト" },
    });

    expect(handleChange).toHaveBeenCalledWith("テスト");
  });

  it("エラー状態が正しく反映されること", () => {
    render(<TextArea error />);
    expect(screen.getByRole("textbox")).toHaveClass("error");
  });

  it("無効化状態が正しく反映されること", () => {
    render(<TextArea disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("プレースホルダーが正しく表示されること", () => {
    const placeholder = "テスト入力";
    render(<TextArea placeholder={placeholder} />);
    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
  });
});
