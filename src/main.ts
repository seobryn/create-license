import { Cli, LicenseType } from "./cli";

const cli = new Cli();

function printUsage(): void {
  console.log("Usage: create-license [command] [licenseType]");
  console.log("Commands:");
  console.log("  create-license [licenseType] -- create license file");
  console.log("  list-licenses -- list all available licenses");
}

const args = process.argv.slice(2);
if (args.length === 0) {
  console.log("Missing arguments");
  printUsage();
  process.exit(1);
}

const commandType = args[0];

if (commandType === "create-license") {
  if (args.length < 2) {
    console.log("Missing arguments");
    printUsage();
    process.exit(1);
  }

  const licenseType = args[1] as LicenseType;
  cli.createLicense(licenseType);
  process.exit(0);
} else if (commandType === "list-licenses") {
  const licenses = cli.listLicenses();
  console.log("Available Licenses:");
  licenses.forEach((license) => {
    console.log(`- ${license}`);
  });
} else {
  console.log("Unknown command");
  printUsage();
  process.exit(1);
}
