import { render, screen, fireEvent } from "@testing-library/react";
import TruckForm from "./TruckForm";

test("Renders TruckForm without errors", () => {
  render(<TruckForm onSubmit={jest.fn()} />);
  const plateInput = screen.getByPlaceholderText(/Plate/i);
  expect(plateInput).toBeInTheDocument();
});

test("Calls onSubmit with correct values", () => {
  const onSubmit = jest.fn();
  render(<TruckForm onSubmit={onSubmit} />);
  const plateInput = screen.getByPlaceholderText(/Plate/i);
  const selectInput = screen.getByLabelText(/Min License Type/i);
  const submitButton = screen.getByText(/Add Truck/i);

  fireEvent.change(plateInput, { target: { value: "ABC123" } });
  fireEvent.change(selectInput, { target: { value: "B" } });
  fireEvent.click(submitButton);

  expect(onSubmit).toHaveBeenCalledWith("ABC123", "B");
});
