import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import favicon from "serve-favicon";
import * as db from "./Util/db.js";
import { parseJsonOrCsv, migratePoemstoDb } from "./Util/migrate_tools/migratetools.js";
const app = express();
const port = Number(process.env.PORT) || 3000;
const __filename = fileURLToPath(import.meta.url);
const buildDir = path.join(__filename, 'build/dist');
app.use(cors());
//migrate from json
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
//APIs
if (fs.existsSync(buildDir)) {
    app.use(express.static(buildDir));
    app.use(favicon(path.join(buildDir, "vite.svg")));
    app.get("/", (req, res) => {
        res.sendFile(path.join(buildDir, "index.html"));
    });
}
app.get("/search", (req, res) => {
    const bookTerms = req.query.poem?.toString().split("%20");
    let results = [];
    if (bookTerms) {
        results = db.searchForPoems(bookTerms);
    }
    res.json(results);
});
app.get("/random", (req, res) => {
    let randomNumbers = Array.from({ length: 10 }, () => Math.floor(Math.random() * db.getNoOfEntries()));
    const results = db.getPoemsWithID(randomNumbers);
    res.json(results);
});
app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
});
//# sourceMappingURL=server.js.map