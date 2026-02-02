import fs from "fs";
import papa from "papaparse";
import * as db from "./../../db/db.js";
export const migratePoemstoDb = (parsedData) => {
    if (parsedData) {
        const poems = Object.entries(parsedData);
        const NoOfEntries = poems.length;
        if ((NoOfEntries - 1) > db.getNoOfEntries()) {
            for (const [key, value] of poems) {
                db.addPoem({
                    id: 0,
                    title: value.Title,
                    poem: value.Poem,
                    poet: value.Poet,
                    tags: value.Tags,
                    isBookmarked: 0
                });
                console.log("Progress: ", parseInt(key), "/", NoOfEntries, Math.round(parseInt(key) / NoOfEntries * 100), "%");
            }
        }
        console.log("Migration finished successfully.");
    }
    else {
        console.log("Coundn't load the file. Cancelling migrating...");
    }
};
export const parseJsonOrCsv = (datasetRelativePath) => {
    let parsedData = {};
    if (datasetRelativePath && fs.existsSync(datasetRelativePath)) {
        console.log("Migrating from ", datasetRelativePath, "...");
        if (datasetRelativePath.endsWith(".csv")) {
            const csvFile = fs.readFileSync(datasetRelativePath, 'utf8');
            papa.parse(csvFile, {
                header: true,
                dynamicTyping: true,
                complete: (results) => {
                    parsedData = results.data;
                }
            });
        }
        else if (datasetRelativePath.endsWith(".json")) {
            fs.readFile(datasetRelativePath, 'utf8', (err, data) => {
                if (err) {
                    console.error("Error loading data. Please enter the correct path and check if the file exists.", err);
                }
                else {
                    parsedData = JSON.parse(data);
                }
            });
        }
    }
    return parsedData;
};
//# sourceMappingURL=migratetools.js.map