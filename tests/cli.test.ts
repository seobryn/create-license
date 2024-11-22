import { Cli } from "../src/cli";
import fs from "fs";
import path from "path";

describe("CLI Test suite", () => {
  let cli: Cli;
  beforeAll(() => {
    cli = new Cli();
  });

  it("should create license", () => {
    cli.createLicense("agpl-3.0");
    const existsFile = fs.existsSync(path.join(process.cwd(), "LICENSE"));
    expect(existsFile).toBe(true);
  });

  it("should list licenses", () => {
    const licenses = cli.listLicenses();
    console.log(JSON.stringify(licenses, null, 2));
    expect(licenses.length).toBeGreaterThan(0);
  });
});
