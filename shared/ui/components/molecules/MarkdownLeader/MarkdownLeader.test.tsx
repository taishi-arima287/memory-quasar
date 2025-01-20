import { render, screen } from "@testing-library/react";
import { MarkdownLeader } from "./MarkdownLeader";
import { marked } from "marked";

jest.mock("marked", () => ({
  marked: jest.fn(),
}));

describe("shared/ui/components/molecules/MarkdownLeader/index.tsx", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("マークダウンがHTMLに正しく変換されること", () => {
    const mockContent = "# Hello\n\nThis is a test";
    const mockHtml = "<h1>Hello</h1><p>This is a test</p>";
    (marked as unknown as jest.Mock).mockReturnValue(mockHtml);

    const { container } = render(<MarkdownLeader content={mockContent} />);
    const markdownContainer = container.querySelector(".container");

    expect(markdownContainer).toHaveClass("container");
    expect(markdownContainer?.innerHTML).toBe(mockHtml);
    expect(marked).toHaveBeenCalledWith(mockContent);
  });

  it("空のコンテンツが渡された場合も正しくレンダリングされること", () => {
    const emptyContent = "";
    (marked as unknown as jest.Mock).mockReturnValue("");

    const { container } = render(<MarkdownLeader content={emptyContent} />);
    const markdownContainer = container.querySelector(".container");

    expect(markdownContainer).toBeEmptyDOMElement();
  });
});
