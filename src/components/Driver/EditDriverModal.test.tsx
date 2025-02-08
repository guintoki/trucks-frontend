import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "react-modal";
import EditDriverModal from "./EditDriverModal";

describe("EditDriverModal component", () => {
  beforeAll(() => {
    Modal.setAppElement(document.createElement("div"));
  });

  test("renders the modal with initial values", () => {
    render(
      <EditDriverModal
        isOpen={true}
        onRequestClose={() => {}}
        onSubmit={() => {}}
        initialName="John Doe"
        initialLicenseType="A"
      />
    );

    expect(screen.getByLabelText(/name/i)).toHaveValue("John Doe");
    expect(screen.getByLabelText(/license type/i)).toHaveValue("A");
  });

  test("calls onSubmit with updated values", () => {
    const onSubmit = jest.fn();
    render(
      <EditDriverModal
        isOpen={true}
        onRequestClose={() => {}}
        onSubmit={onSubmit}
        initialName="John Doe"
        initialLicenseType="A"
      />
    );

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "Jane Smith" },
    });
    fireEvent.change(screen.getByLabelText(/license type/i), {
      target: { value: "B" },
    });
    fireEvent.click(screen.getByText(/update driver/i));

    expect(onSubmit).toHaveBeenCalledWith("Jane Smith", "B");
  });

  test("calls onRequestClose when cancel button is clicked", () => {
    const onRequestClose = jest.fn();
    render(
      <EditDriverModal
        isOpen={true}
        onRequestClose={onRequestClose}
        onSubmit={() => {}}
        initialName="John Doe"
        initialLicenseType="A"
      />
    );

    fireEvent.click(screen.getByText(/cancel/i));
    expect(onRequestClose).toHaveBeenCalled();
  });
});
