import { render, screen } from "@testing-library/react";
import { Modal } from "./Modal";
import ReactModal from "react-modal";

beforeAll(() => {
  const modalRoot = document.createElement("div");
  modalRoot.setAttribute("id", "modal-root");
  document.body.appendChild(modalRoot);
  ReactModal.setAppElement("#modal-root");
});

describe("Modal", () => {
  const defaultProps = {
    isOpen: true,
    onClose: () => {},
    title: "テストモーダル",
    children: <div>モーダルの中身</div>,
  };

  it("モーダルが開いているときに内容が表示されること", () => {
    render(<Modal {...defaultProps} />);

    expect(screen.getByText("テストモーダル")).toBeInTheDocument();
    expect(screen.getByText("モーダルの中身")).toBeInTheDocument();
  });

  it("モーダルが閉じているときに内容が表示されないこと", () => {
    render(<Modal {...defaultProps} isOpen={false} />);

    expect(screen.queryByText("テストモーダル")).not.toBeInTheDocument();
    expect(screen.queryByText("モーダルの中身")).not.toBeInTheDocument();
  });
});
