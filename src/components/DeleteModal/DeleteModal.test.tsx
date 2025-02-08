import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "react-modal";
import DeleteModal from "./DeleteModal";

describe("DeleteModal component", () => {
  beforeAll(() => {
    Modal.setAppElement(document.createElement("div"));
  });

  test("renders the DeleteModal message correctly", () => {
    render(
      <DeleteModal
        isOpen={true}
        onRequestClose={() => {}}
        onDelete={() => {}}
        itemType="assignment"
      />
    );
    expect(
      screen.getByText(/are you sure you want to delete this assignment\?/i)
    ).toBeInTheDocument();
  });

  test("calls onRequestClose when No button is clicked", () => {
    const onRequestClose = jest.fn();
    render(
      <DeleteModal
        isOpen={true}
        onRequestClose={onRequestClose}
        onDelete={() => {}}
        itemType="assignment"
      />
    );
    fireEvent.click(screen.getByText(/no/i));
    expect(onRequestClose).toHaveBeenCalled();
  });

  test("calls onDelete when Yes button is clicked", () => {
    const onDelete = jest.fn();
    render(
      <DeleteModal
        isOpen={true}
        onRequestClose={() => {}}
        onDelete={onDelete}
        itemType="assignment"
      />
    );
    fireEvent.click(screen.getByText(/yes/i));
    expect(onDelete).toHaveBeenCalled();
  });
});
