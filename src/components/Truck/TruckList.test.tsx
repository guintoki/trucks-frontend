import { render, screen, fireEvent } from "@testing-library/react";
import TruckList from "./TruckList";
import { Truck } from "../../types/Truck";

const trucks: Truck[] = [
  { id: 1, plate: "ABC123", min_license_type: "B" },
  { id: 2, plate: "XYZ789", min_license_type: "C" },
];

test("Renders TruckList without errors", () => {
  render(<TruckList trucks={trucks} onEdit={jest.fn()} onDelete={jest.fn()} />);
  const plateElement = screen.getByText(/ABC123/i);
  expect(plateElement).toBeInTheDocument();
});

test("Calls onEdit when edit button is clicked", () => {
  const onEdit = jest.fn();
  render(<TruckList trucks={trucks} onEdit={onEdit} onDelete={jest.fn()} />);
  const editButton = screen.getAllByRole("button")[0];
  fireEvent.click(editButton);
  expect(onEdit).toHaveBeenCalledWith(trucks[0]);
});

test("Calls onDelete when delete button is clicked", () => {
  const onDelete = jest.fn();
  render(<TruckList trucks={trucks} onEdit={jest.fn()} onDelete={onDelete} />);
  const deleteButton = screen.getAllByRole("button")[1];
  fireEvent.click(deleteButton);
  expect(onDelete).toHaveBeenCalledWith(trucks[0]);
});
