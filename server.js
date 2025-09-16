import express from "express";
import papa from "papaparse";
import fs from "fs";
const app = express();
const port = 3001;
app.get("/search", (req, res) => {
    let csvParsed = {};
    const csvFile = fs.readFileSync("./PoetryFoundationData.csv", 'utf8');
    papa.parse(csvFile, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
            csvParsed = results.data;
        }
    });
    console.log(csvParsed);
});
app.listen(port);
//# sourceMappingURL=server.js.map