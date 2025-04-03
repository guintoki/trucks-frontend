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

  await waitFor(() => {
    const navLinks = screen.getAllByRole("link");
    expect(navLinks[1]).toHaveTextContent(/motoristas/i);
  });

  await waitFor(() => {
    const navLinks = screen.getAllByRole("link");
    expect(navLinks[2]).toHaveTextContent(/caminhões/i);
  });

  await waitFor(() => {
    const navLinks = screen.getAllByRole("link");
    expect(navLinks[3]).toHaveTextContent(/atribuições/i);
  });
});

test("renders DriverPage when navigating to /", async () => {
  window.history.pushState({}, "Drivers Page", "/");

  render(<App />);

  await waitFor(() => {
    expect(
      screen.getByRole("heading", { level: 2, name: /adicionar motorista/i })
    ).toBeInTheDocument();
  });
});

test("renders TruckPage when navigating to /trucks", async () => {
  window.history.pushState({}, "Trucks Page", "/trucks");

  render(<App />);

  await waitFor(() => {
    expect(
      screen.getByRole("heading", { level: 2, name: /adicionar caminhão/i })
    ).toBeInTheDocument();
  });
});

test("renders AssignmentPage when navigating to /assignments", async () => {
  window.history.pushState({}, "Assignments Page", "/assignments");

  render(<App />);

  await waitFor(() => {
    expect(
      screen.getByRole("heading", { level: 2, name: /adicionar atribuição/i })
    ).toBeInTheDocument();
  });
});
