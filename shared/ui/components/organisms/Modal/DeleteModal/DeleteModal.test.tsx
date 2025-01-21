import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { DeleteModal } from "./DeleteModal";
import ReactModal from "react-modal";

const mockClientFetcher = jest.fn().mockResolvedValue({});
const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock(
  "@memory-quasar/shared/utils/repository/clientFetcher",
  () => ({
    clientFetcher: (...args: any[]) => Promise.resolve(mockClientFetcher(...args)),
  }),
  { virtual: true },
);

describe("shared/ui/components/organisms/Modal/DeleteModal/DeleteModal", () => {
  const mockProps = {
    isOpen: true,
    onClose: jest.fn(),
    id: "test-id",
  };

  beforeAll(() => {
    const modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "modal-root");
    document.body.appendChild(modalRoot);
    ReactModal.setAppElement("#modal-root");
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("モーダルが開いているとき、内容が表示される", () => {
    render(<DeleteModal {...mockProps} />);
    expect(screen.getByText("ドキュメントを削除しますか？")).toBeInTheDocument();
  });

  test("モーダルが閉じているとき、内容が表示されない", () => {
    render(<DeleteModal {...mockProps} isOpen={false} />);
    expect(screen.queryByText("ドキュメントを削除しますか？")).not.toBeInTheDocument();
  });

  test("閉じるボタンをクリックするとonCloseが呼ばれる", () => {
    render(<DeleteModal {...mockProps} />);
    fireEvent.click(screen.getByText("閉じる"));
    expect(mockProps.onClose).toHaveBeenCalled();
  });

  test("削除ボタンをクリックすると削除処理が実行される", async () => {
    render(<DeleteModal {...mockProps} />);
    fireEvent.click(screen.getByText("削除"));

    await waitFor(() => {
      expect(mockClientFetcher).toHaveBeenCalledWith({
        uri: `/document/test-id`,
        method: "DELETE",
      });
      expect(mockPush).toHaveBeenCalledWith("/document");
    });
  });
});
