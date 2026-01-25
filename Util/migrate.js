import { parseJsonOrCsv, migratePoemstoDb } from "./migrate_tools/migratetools.js";
import * as db from "./db.js";
export const migratefromJsonOrCsv = () => {
    if (db.isEmpty()) {
        const datasetRelativePath = process.argv[2];
        if (datasetRelativePath) {
            const parsedData = parseJsonOrCsv(datasetRelativePath);
            migratePoemstoDb(parsedData);
        }
        else {
            console.log("The poem database is empty. Use 'node server 'filename.json' or 'filename.csv' to migrate data. Read ReadMe.md for more details.");
            process.exitCode = 0;
        }
    }
    else {
        console.log("Database already setup. Continuing without migrating...");
    }
};
//# sourceMappingURL=migrate.js.map