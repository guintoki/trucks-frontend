import { LicenseType } from "./LicenseType";

export interface Driver {
  id: number;
  name: string;
  license_type: LicenseType;
}
