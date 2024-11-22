import fs from "fs";
import path from "path";

export type LicenseType =
  | "agpl-3.0"
  | "apache-2.0"
  | "bsd-2-clause"
  | "bsd-3-clause"
  | "bsl-1.0"
  | "cc0-1.0"
  | "epl-2.0"
  | "gpl-2.0"
  | "gpl-3.0"
  | "lgpl-2.1"
  | "mit"
  | "mpl-2.0";

export interface License {
  key: string;
  name: string;
  content: string;
}

export class Cli {
  private licenseDb: Map<LicenseType, License>;
  constructor() {
    const _db = JSON.parse(
      fs.readFileSync(
        path.join(__dirname, "..", "extras", "licenses.json"),
        "utf-8"
      )
    );
    this.licenseDb = new Map<LicenseType, License>();
    _db.forEach((license: License) => {
      this.licenseDb.set(license.key as LicenseType, license);
    });
  }
  createLicense(licenseType: LicenseType): void {
    if (this.licenseDb.has(licenseType)) {
      const license = this.licenseDb.get(licenseType)!;
      fs.writeFileSync(path.join(process.cwd(), "LICENSE"), license.content);
      console.log("License File Created successfully");
      return;
    }

    throw new Error(`License type [${licenseType}] not found`);
  }

  listLicenses(): string[] {
    const licenses = Array.from(this.licenseDb.keys());
    return licenses;
  }
}
