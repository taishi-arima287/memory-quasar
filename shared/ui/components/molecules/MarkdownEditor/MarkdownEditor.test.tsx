import { render, screen } from "@testing-library/react";
import { MarkdownEditor } from "./MarkdownEditor";

describe("MarkdownEditor", () => {
  it("デフォルトのプロパティで正しくレンダリングされること", () => {
    render(<MarkdownEditor label="テストラベル" />);
    expect(screen.getByLabelText("テストラベル")).toBeInTheDocument();
  });
});
