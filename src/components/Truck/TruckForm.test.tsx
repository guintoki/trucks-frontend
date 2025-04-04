import { render, screen, fireEvent } from "@testing-library/react";
import TruckForm from "./TruckForm";

test("Renders TruckForm without errors", () => {
  render(<TruckForm onSubmit={jest.fn()} />);
  const plateInput = screen.getByPlaceholderText(/ABC1234/i);
  expect(plateInput).toBeInTheDocument();
});

test("Calls onSubmit with correct values", () => {
  const onSubmit = jest.fn();
  render(<TruckForm onSubmit={onSubmit} />);
  const plateInput = screen.getByPlaceholderText(/ABC1234/i);
  const selectInput = screen.getByLabelText(/Tipo de CNH Mínimo/i);
  const submitButton = screen.getByText(/Adicionar Caminhão/i);

  fireEvent.change(plateInput, { target: { value: "ABC123" } });
  fireEvent.change(selectInput, { target: { value: "B" } });
  fireEvent.click(submitButton);

  expect(onSubmit).toHaveBeenCalledWith("ABC123", "B");
});
