import { render, screen, fireEvent } from "@testing-library/react";
import DriverList from "./DriverList";
import { Driver } from "../../types/Driver";

const drivers: Driver[] = [
  { id: 1, name: "John Doe", license_type: "A" },
  { id: 2, name: "Jane Smith", license_type: "B" },
];

describe("DriverList component", () => {
  test("renders the list of drivers correctly", () => {
    render(
      <DriverList drivers={drivers} onEdit={() => {}} onDelete={() => {}} />
    );
    expect(screen.getByText(/john doe/i)).toBeInTheDocument();
    expect(screen.getByText(/jane smith/i)).toBeInTheDocument();
  });

  test("calls onEdit when edit button is clicked", () => {
    const onEdit = jest.fn();
    render(
      <DriverList drivers={drivers} onEdit={onEdit} onDelete={() => {}} />
    );

    fireEvent.click(screen.getAllByRole("button", { name: /edit/i })[0]);
    expect(onEdit).toHaveBeenCalledWith(drivers[0]);
  });

  test("calls onDelete when delete button is clicked", () => {
    const onDelete = jest.fn();
    render(
      <DriverList drivers={drivers} onEdit={() => {}} onDelete={onDelete} />
    );

    fireEvent.click(screen.getAllByRole("button", { name: /delete/i })[0]);
    expect(onDelete).toHaveBeenCalledWith(drivers[0]);
  });
});
