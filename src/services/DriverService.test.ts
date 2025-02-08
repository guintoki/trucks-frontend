import { DriverService } from "./DriverService";
import { Driver } from "../types/Driver";

describe("DriverService", () => {
  beforeEach(() => {
    DriverService.create({ id: 1, name: "John Doe", license_type: "A" });
    DriverService.create({ id: 2, name: "Jane Smith", license_type: "B" });
  });

  afterEach(() => {
    DriverService.delete(1);
    DriverService.delete(2);
  });

  test("should get all drivers", () => {
    const drivers = DriverService.getAll();
    expect(drivers.length).toBe(2);
  });

  test("should get driver by id", () => {
    const driver = DriverService.getById(1);
    expect(driver).toEqual({ id: 1, name: "John Doe", license_type: "A" });
  });

  test("should create a new driver", () => {
    const newDriver: Driver = {
      id: 3,
      name: "Alice Johnson",
      license_type: "C",
    };
    DriverService.create(newDriver);
    const driver = DriverService.getById(3);
    expect(driver).toEqual(newDriver);
    DriverService.delete(3);
  });

  test("should update a driver", () => {
    const updatedDriver: Driver = {
      id: 1,
      name: "John Updated",
      license_type: "A",
    };
    DriverService.update(1, updatedDriver);
    const driver = DriverService.getById(1);
    expect(driver).toEqual(updatedDriver);
  });

  test("should delete a driver", () => {
    DriverService.delete(1);
    const driver = DriverService.getById(1);
    expect(driver).toBeUndefined();
  });
});
