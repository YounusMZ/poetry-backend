import express from "express";
import cors from "cors";
import papa from "papaparse";
import fs from "fs";
const app = express();
app.use(cors());
const port = 3000;
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
    const bookTerms = req.query.book?.toString().split("%20");
    console.log(bookTerms);
    const results = [];
    //console.log(Object.entries(csvParsed));
    for (const [key, value] of Object.entries(csvParsed)) {
        //console.log(key, value["Title"])
        if (bookTerms) {
            for (const term of bookTerms) {
                const title = String(value["Title"]);
                //console.log(key, title, typeof value, title.includes(term))
                if ((title.includes(term)))
                    results.push(value);
            }
        }
    }
    ;
    console.log(results[0]["Title"]);
    res.json(results);
});
app.listen(port);
//# sourceMappingURL=server.js.map