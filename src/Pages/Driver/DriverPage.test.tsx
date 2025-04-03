import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
  act,
} from "@testing-library/react";
import DriverPage from "./DriverPage";
import { BrowserRouter } from "react-router-dom";
import * as api from "../../utils/api";

jest.mock("../../utils/api");

const mockDrivers = [
  { id: 1, name: "Driver 1", license_type: "B" },
  { id: 2, name: "Driver 2", license_type: "C" },
];

describe("DriverPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (api.getDrivers as jest.Mock).mockResolvedValue(mockDrivers);
    (api.createDriver as jest.Mock).mockImplementation((driver) => ({
      ...driver,
      id: Math.random(),
    }));
    (api.updateDriver as jest.Mock).mockImplementation((id, driver) => ({
      ...driver,
      id,
    }));
    (api.deleteDriver as jest.Mock).mockResolvedValue({});
  });

  afterEach(() => {
    cleanup();
  });

  test("renders DriverPage without errors", async () => {
    render(
      <BrowserRouter>
        <DriverPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/add driver/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(/driver list/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(/driver 1/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(/driver 2/i)).toBeInTheDocument();
    });
  });

  test("creates a new driver", async () => {
    render(
      <BrowserRouter>
        <DriverPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/driver list/i)).toBeInTheDocument();
    });

    const nameInput = screen.getByLabelText(/name/i);
    const licenseSelect = screen.getByLabelText(/license type/i);
    const submitButton = screen.getByText(/save driver/i);

    fireEvent.change(nameInput, { target: { value: "New Driver" } });
    fireEvent.change(licenseSelect, { target: { value: "A" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/driver created successfully/i)
      ).toBeInTheDocument();
    });
  });

  test("updates a driver", async () => {
    render(
      <BrowserRouter>
        <DriverPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/driver list/i)).toBeInTheDocument();
    });

    const editButtons = screen.getAllByLabelText("edit");
    expect(editButtons).toHaveLength(2);

    fireEvent.click(editButtons[0]);

    await waitFor(() => {
      expect(screen.getByText(/edit driver/i)).toBeInTheDocument();
    });

    const editNameInput = screen.getByLabelText(/new name/i);
    const editLicenseSelect = screen.getByTestId("editLicenseType");

    fireEvent.change(editNameInput, { target: { value: "Updated Driver" } });
    fireEvent.change(editLicenseSelect, { target: { value: "C" } });

    const updateButton = screen.getByText(/update driver/i);
    fireEvent.click(updateButton);

    await waitFor(() => {
      expect(screen.getByText(/Updated Driver/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(
        screen.getByText(/driver updated successfully/i)
      ).toBeInTheDocument();
    });
  });

  test("deletes a driver", async () => {
    render(
      <BrowserRouter>
        <DriverPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/driver list/i)).toBeInTheDocument();
    });

    const deleteButtons = screen.getAllByLabelText("delete");
    expect(deleteButtons).toHaveLength(2);

    fireEvent.click(deleteButtons[0]);
    fireEvent.click(screen.getByText(/yes/i));

    await waitFor(() => {
      expect(screen.queryByText(/driver 1/i)).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(
        screen.getByText(/driver deleted successfully/i)
      ).toBeInTheDocument();
    });
  });
});
