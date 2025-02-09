import { render, screen, fireEvent } from "@testing-library/react";
import AssignmentList from "./AssignmentList";
import { BrowserRouter } from "react-router-dom";
import { LicenseType } from "../../types/LicenseType";

const assignments = [
  {
    id: 1,
    driver: { id: 1, name: "Driver 1", license_type: "A" as LicenseType },
    truck: { id: 1, plate: "ABC123", min_license_type: "A" as LicenseType },
    date: "2023-10-10",
  },
  {
    id: 2,
    driver: { id: 2, name: "Driver 2", license_type: "B" as LicenseType },
    truck: { id: 2, plate: "XYZ789", min_license_type: "B" as LicenseType },
    date: "2023-10-11",
  },
];

test("Renders AssignmentList without errors", () => {
  render(
    <BrowserRouter>
      <AssignmentList
        assignments={assignments}
        onEdit={jest.fn()}
        openDeleteModal={jest.fn()}
      />
    </BrowserRouter>
  );

  expect(screen.getByText(/driver 1/i)).toBeInTheDocument();
  expect(screen.getByText(/driver 2/i)).toBeInTheDocument();
});

test("Calls onEdit when edit button is clicked", () => {
  const onEdit = jest.fn();
  render(
    <BrowserRouter>
      <AssignmentList
        assignments={assignments}
        onEdit={onEdit}
        openDeleteModal={jest.fn()}
      />
    </BrowserRouter>
  );

  fireEvent.click(screen.getAllByRole("button")[0]);

  expect(onEdit).toHaveBeenCalledWith(assignments[0]);
});

test("Calls openDeleteModal when delete button is clicked", () => {
  const openDeleteModal = jest.fn();
  render(
    <BrowserRouter>
      <AssignmentList
        assignments={assignments}
        onEdit={jest.fn()}
        openDeleteModal={openDeleteModal}
      />
    </BrowserRouter>
  );

  fireEvent.click(screen.getAllByRole("button")[1]);

  expect(openDeleteModal).toHaveBeenCalledWith(assignments[0].id);
});
