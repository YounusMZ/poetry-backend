import express from "express";
import cors from "cors";
import papa from "papaparse";
import fs from "fs";
const app = express();
app.use(cors());
const port = 3000;
let csvParsed = {};
const csvFile = fs.readFileSync("./PoetryFoundationData.csv", 'utf8');
papa.parse(csvFile, {
    header: true,
    dynamicTyping: true,
    complete: (results) => {
        csvParsed = results.data;
    }
});
app.get("/search", (req, res) => {
    const bookTerms = req.query.poem?.toString().split("%20");
    const results = [];
    for (const [key, value] of Object.entries(csvParsed)) {
        if (bookTerms) {
            const title = String(value["Title"]).toLowerCase();
            if (bookTerms.every(term => title.includes(term.toLowerCase()))) {
                results.push(value);
            }
            ;
        }
        ;
    }
    ;
    res.json(results);
});
app.get("/random", (req, res) => {
    let randomNumber = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10000));
    const results = [];
    for (const number of randomNumber) {
        const poem = csvParsed[number];
        if (poem) {
            results.push(poem);
        }
        ;
    }
    ;
    res.json(results);
});
app.listen(port, () => {
    console.log(`server listening on port ${port}`);
});
//# sourceMappingURL=server.js.map