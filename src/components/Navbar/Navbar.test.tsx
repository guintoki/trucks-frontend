import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";

test("Renders Navbar without errors", () => {
  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
});

test("Renders links correctly", () => {
  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );

  const driversLink = screen.getByText(/drivers/i);
  const trucksLink = screen.getByText(/trucks/i);
  const assignmentsLink = screen.getByText(/assignments/i);

  expect(driversLink).toBeInTheDocument();
  expect(trucksLink).toBeInTheDocument();
  expect(assignmentsLink).toBeInTheDocument();
});

test("Links have correct href attributes", () => {
  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );

  const driversLink = screen.getByText(/drivers/i);
  const trucksLink = screen.getByText(/trucks/i);
  const assignmentsLink = screen.getByText(/assignments/i);

  expect(driversLink).toHaveAttribute("href", "/drivers");
  expect(trucksLink).toHaveAttribute("href", "/trucks");
  expect(assignmentsLink).toHaveAttribute("href", "/assignments");
});
