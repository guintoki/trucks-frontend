import { render, screen, fireEvent } from "@testing-library/react";
import DriverForm from "./DriverForm";

describe("DriverForm component", () => {
  test("renders the form correctly", () => {
    render(<DriverForm onSubmit={() => {}} />);
    expect(screen.getByLabelText("Nome do Motorista")).toBeInTheDocument();
    expect(screen.getByLabelText("Tipo de Carteira")).toBeInTheDocument();
    expect(screen.getByText(/adicionar motorista/i)).toBeInTheDocument();
  });

  test("calls onSubmit with correct data", () => {
    const onSubmit = jest.fn();
    render(<DriverForm onSubmit={onSubmit} />);

    fireEvent.change(screen.getByLabelText("Nome do Motorista"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText("Tipo de Carteira"), {
      target: { value: "B" },
    });
    fireEvent.click(screen.getByText(/adicionar motorista/i));

    expect(onSubmit).toHaveBeenCalledWith("John Doe", "B");
  });

  test("resets the form after submit", () => {
    render(<DriverForm onSubmit={() => {}} />);

    fireEvent.change(screen.getByLabelText("Nome do Motorista"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText("Tipo de Carteira"), {
      target: { value: "B" },
    });
    fireEvent.click(screen.getByText(/adicionar motorista/i));

    expect(screen.getByLabelText("Nome do Motorista")).toHaveValue("");
    expect(screen.getByLabelText("Tipo de Carteira")).toHaveValue("A");
  });
});
