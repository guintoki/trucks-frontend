import { LicenseType } from "./LicenseType";

export interface Truck {
  id: number;
  plate: string;
  min_license_type: LicenseType;
}
