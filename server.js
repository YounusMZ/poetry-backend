import express from "express";
import cors from "cors";
import fs from "fs";
import papa from "papaparse";
const app = express();
app.use(cors());
const port = 3000;
const datasetRelativePath = process.argv[2];
let dataParsed = {};
if (datasetRelativePath && fs.existsSync(datasetRelativePath)) {
    if (datasetRelativePath.endsWith(".csv")) {
        const csvFile = fs.readFileSync(datasetRelativePath, 'utf8');
        papa.parse(csvFile, {
            header: true,
            dynamicTyping: true,
            complete: (results) => {
                dataParsed = results.data;
            }
        });
    }
    else if (datasetRelativePath.endsWith(".json")) {
        fs.readFile(datasetRelativePath, 'utf8', (err, data) => {
            if (err) {
                console.error("error loading data. Please enter the correct path and check if the file exists.", err);
            }
            else {
                dataParsed = JSON.parse(data);
            }
        });
    }
}
app.get("/search", (req, res) => {
    const bookTerms = req.query.poem?.toString().split("%20");
    const results = [];
    for (const [key, value] of Object.entries(dataParsed)) {
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
        const poem = dataParsed[number];
        if (poem) {
            results.push(poem);
        }
        ;
    }
    ;
    res.json(results);
});
app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
});
//# sourceMappingURL=server.js.map