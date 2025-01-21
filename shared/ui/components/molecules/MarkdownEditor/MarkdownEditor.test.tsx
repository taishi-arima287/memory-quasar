import { render, screen } from "@testing-library/react";
import { MarkdownEditor } from "./MarkdownEditor";

describe("shared/ui/components/molecules/MarkdownEditor/MarkdownEditor.tsx", () => {
  test.skip("デフォルトのプロパティで正しくレンダリングされること", () => {
    render(<MarkdownEditor label="テストラベル" />);
    expect(screen.getByLabelText("テストラベル")).toBeInTheDocument();
  });
});
