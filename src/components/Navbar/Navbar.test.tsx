import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";

test("Renders Navbar without errors", () => {
  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
});

test("Renders links correctly", async () => {
  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
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

test("Links have correct href attributes", () => {
  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );

  const driversLink = screen.getByRole("link", { name: /motoristas/i });
  const trucksLink = screen.getByRole("link", { name: /caminhões/i });
  const assignmentsLink = screen.getByRole("link", { name: /atribuições/i });

  expect(driversLink).toHaveAttribute("href", "/");
  expect(trucksLink).toHaveAttribute("href", "/trucks");
  expect(assignmentsLink).toHaveAttribute("href", "/assignments");
});
