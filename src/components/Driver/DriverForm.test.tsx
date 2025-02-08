import { render, screen, fireEvent } from "@testing-library/react";
import DriverForm from "./DriverForm";

describe("DriverForm component", () => {
  test("renders the form correctly", () => {
    render(<DriverForm onSubmit={() => {}} />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/license type/i)).toBeInTheDocument();
    expect(screen.getByText(/add driver/i)).toBeInTheDocument();
  });

  test("calls onSubmit with correct data", () => {
    const onSubmit = jest.fn();
    render(<DriverForm onSubmit={onSubmit} />);

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/license type/i), {
      target: { value: "B" },
    });
    fireEvent.click(screen.getByText(/add driver/i));

    expect(onSubmit).toHaveBeenCalledWith("John Doe", "B");
  });

  test("resets the form after submit", () => {
    render(<DriverForm onSubmit={() => {}} />);

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/license type/i), {
      target: { value: "B" },
    });
    fireEvent.click(screen.getByText(/add driver/i));

    expect(screen.getByLabelText(/name/i)).toHaveValue("");
    expect(screen.getByLabelText(/license type/i)).toHaveValue("A");
  });
});
