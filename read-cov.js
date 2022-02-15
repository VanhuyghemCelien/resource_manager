const fs = require("fs");
const { join } = require("path");

const [, , path, threshold] = process.argv;

const covPath = "./coverage/coverage-summary.json";

process.chdir(path);

if (fs.existsSync(join(process.cwd(), covPath))) {
    const out = JSON.parse(fs.readFileSync(join(process.cwd(), covPath)));

    const covResults = Object.entries(out.total);

    if (covResults.map(([, value]) => value.pct).some((e) => e < (threshold ?? 50))) {
        console.warn(`Code coverage must be over ${threshold} to pass in ${path}`);
        console.log(covResults);
        process.exit(1);
    }
    process.exit(0);
}
process.exit(0);