import { render, screen, fireEvent } from "@testing-library/react";
import EditTruckModal from "./EditTruckModal";
import { Truck } from "../../types/Truck";

const truck: Truck = { id: 1, plate: "ABC123", min_license_type: "B" };

test("Renders EditTruckModal without errors", () => {
  render(
    <EditTruckModal
      isOpen={true}
      onRequestClose={jest.fn()}
      onSubmit={jest.fn()}
      truck={truck}
    />
  );
  const plateInput = screen.getByPlaceholderText(/Plate/i);
  expect(plateInput).toBeInTheDocument();
});

test("Calls onSubmit with correct values", () => {
  const onSubmit = jest.fn();
  render(
    <EditTruckModal
      isOpen={true}
      onRequestClose={jest.fn()}
      onSubmit={onSubmit}
      truck={truck}
    />
  );
  const plateInput = screen.getByPlaceholderText(/Plate/i);
  const selectInput = screen.getByLabelText(/Min License Type/i);
  const submitButton = screen.getByText(/Save update/i);

  fireEvent.change(plateInput, { target: { value: "XYZ789" } });
  fireEvent.change(selectInput, { target: { value: "C" } });
  fireEvent.click(submitButton);

  expect(onSubmit).toHaveBeenCalledWith("XYZ789", "C");
});
