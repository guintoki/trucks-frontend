import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { getDrivers, getTrucks, getAssignments } from "./utils/api";

jest.mock("./utils/api");

beforeEach(() => {
  (getDrivers as jest.Mock).mockResolvedValue([]);
  (getTrucks as jest.Mock).mockResolvedValue([]);
  (getAssignments as jest.Mock).mockResolvedValue([]);
});

test("renders Navbar without errors", async () => {
  render(<App />);

  expect(screen.getByText(/drivers/i)).toBeInTheDocument();
  expect(screen.getByText(/trucks/i)).toBeInTheDocument();
  expect(screen.getByText(/assignments/i)).toBeInTheDocument();
});

test("renders DriverPage when navigating to /drivers", async () => {
  window.history.pushState({}, "Drivers Page", "/drivers");

  render(<App />);

  await waitFor(() => {
    expect(
      screen.getByRole("heading", { level: 2, name: /add driver/i })
    ).toBeInTheDocument();
  });
});

test("renders TruckPage when navigating to /trucks", async () => {
  window.history.pushState({}, "Trucks Page", "/trucks");

  render(<App />);

  await waitFor(() => {
    expect(
      screen.getByRole("heading", { level: 2, name: /add truck/i })
    ).toBeInTheDocument();
  });
});

test("renders AssignmentPage when navigating to /assignments", async () => {
  window.history.pushState({}, "Assignments Page", "/assignments");

  render(<App />);

  await waitFor(() => {
    expect(
      screen.getByRole("heading", { level: 2, name: /add assignment/i })
    ).toBeInTheDocument();
  });
});
