import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import Toast from "./Toast";

describe("Toast component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    cleanup();
  });

  test("renders the Toast message correctly", () => {
    render(
      <Toast message="Success message" type="success" onClose={() => {}} />
    );
    expect(screen.getByText("Success message")).toBeInTheDocument();
  });

  test("renders the Toast with correct type", () => {
    render(<Toast message="Error message" type="error" onClose={() => {}} />);
    expect(screen.getByTestId("toast")).toHaveStyle(
      "background-color: #f44336"
    );
  });

  test("calls onClose after 5 seconds", () => {
    const onClose = jest.fn();
    render(
      <Toast message="Auto close message" type="success" onClose={onClose} />
    );
    jest.advanceTimersByTime(5000);
    expect(onClose).toHaveBeenCalled();
  });

  test("calls onClose when close button is clicked", () => {
    const onClose = jest.fn();
    render(
      <Toast message="Close button message" type="success" onClose={onClose} />
    );
    fireEvent.click(screen.getByText("×"));
    expect(onClose).toHaveBeenCalled();
  });
});
