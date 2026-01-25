import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import favicon from "serve-favicon";
import * as db from "./Util/db.js";
import { parseJsonOrCsv, migratePoemstoDb } from "./Util/migrate_tools/migratetools.js";
import { apiRouter } from "./apiRouter.js";
const app = express();
const port = Number(process.env.PORT) || 3000;
app.use(cors());
app.use(express.json());
app.use("/api", apiRouter);
const __filename = fileURLToPath(import.meta.url);
const buildDir = path.join(path.dirname(__filename), 'dist');
if (fs.existsSync(buildDir)) {
    app.use(express.static(buildDir));
}
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
app.use((req, res) => {
    return res.sendFile(path.join(buildDir, 'index.html'));
});
app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
});
//# sourceMappingURL=server.js.map