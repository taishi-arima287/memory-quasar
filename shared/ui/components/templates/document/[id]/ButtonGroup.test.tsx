import { render, screen, fireEvent } from "@testing-library/react";
import { ButtonGroup } from "./ButtonGroup";
import { useRouter } from "next/navigation";

// next/navigationのモック
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("shared/ui/components/templates/document/[id]/ButtonGroup.tsx", () => {
  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it("戻るボタンと削除ボタンが表示されること", () => {
    render(<ButtonGroup />);

    expect(screen.getByRole("button", { name: "戻る" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "削除" })).toBeInTheDocument();
  });
});
