import { execFile } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import dayjs from "dayjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// this allows the execFile function use async/await
const execFileAsync = promisify(execFile);

export async function getBinDays(postcode, houseNumber, uprn) {
  const scriptPath = path.resolve(
    __dirname,
    "../UKBinCollectionData/uk_bin_collection/uk_bin_collection/collect_data.py",
  );

  const args = [
    scriptPath,
    "LeedsCityCouncil",
    "https://www.leeds.gov.uk/residents/bins-and-recycling/your-bin-days",
    "-p",
    postcode,
    "-n",
    houseNumber,
  ];

  if (uprn) {
    args.push("-u", uprn);
  }

  try {
    let { stdout, stderr } = await execFileAsync("python", args);

    // console.log("RAW:", stdout);

    let string = "";
    let i = 2;
    while (stdout[i] !== "'") {
      string += stdout[i];
      i++;
    }

    const bins = JSON.parse(string);

    const formattedBins = bins.map((bin) => ({
      ...bin,
      date: dayjs(bin.date).format("YYYY-MM-DD"),
    }));

    return formattedBins;
  } catch (error) {
    // if (error instanceof SyntaxError) {
    //   throw new Error(`Failed to parse Python JSON output: ${error.message}`);
    // }
    throw new Error(`Execution error: ${error.message}`);
  }
}
