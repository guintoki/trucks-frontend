import { Driver } from "../types/Driver";

let drivers: Driver[] = [];

export const DriverService = {
  getAll: (): Driver[] => {
    return drivers;
  },
  getById: (id: number): Driver | undefined => {
    return drivers.find((driver) => driver.id === id);
  },
  create: (driver: Driver): void => {
    drivers.push(driver);
  },
  update: (id: number, updatedDriver: Driver): void => {
    const index = drivers.findIndex((driver) => driver.id === id);
    if (index !== -1) {
      drivers[index] = updatedDriver;
    }
  },
  delete: (id: number): void => {
    drivers = drivers.filter((driver) => driver.id !== id);
  },
};
