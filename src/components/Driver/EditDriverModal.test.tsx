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

    expect(screen.getByLabelText("Nome do Motorista")).toHaveValue("John Doe");
    expect(screen.getByLabelText("Tipo de Carteira")).toHaveValue("A");
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

    fireEvent.change(screen.getByLabelText("Nome do Motorista"), {
      target: { value: "Jane Smith" },
    });
    fireEvent.change(screen.getByLabelText("Tipo de Carteira"), {
      target: { value: "B" },
    });
    fireEvent.click(screen.getByText(/salvar alterações/i));

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

    fireEvent.click(screen.getByText(/cancelar/i));
    expect(onRequestClose).toHaveBeenCalled();
  });
});
