import express from "express";
import cors from "cors";
import type { Request, Response } from "express";
import fs from "fs";
import papa from "papaparse";
import type { Poem, SearchResult } from "./Util/poem.js";

const app = express();
app.use(cors());
const port: number = 3000;

const datasetRelativePath: string | undefined = process.argv[2];
let dataParsed: SearchResult = {};

if (datasetRelativePath && fs.existsSync(datasetRelativePath)){
    if (datasetRelativePath.endsWith(".csv")){
        const csvFile: string = fs.readFileSync(datasetRelativePath, 'utf8');
        papa.parse(csvFile, {
            header: true,
            dynamicTyping: true,
            complete: (results) => {
                dataParsed = results.data as SearchResult;
            }
        });
    }
    else if (datasetRelativePath.endsWith(".json")){
        fs.readFile(datasetRelativePath, 'utf8', (err, data) => {
            if (err){
                console.error("error loading data. Please enter the correct path and check if the file exists.", err);
            }
            else {
                dataParsed = JSON.parse(data) as SearchResult;
            }
        })
    }
}

app.get("/search", (req: Request, res: Response) => {
    const bookTerms: string[] | undefined = req.query.poem?.toString().split("%20");
    const results: Array<Poem> = [];
    
    for (const [key, value] of Object.entries(dataParsed)){
        if(bookTerms){
            const title: string = String(value["Title"]).toLowerCase();
            if(bookTerms.every(term => title.includes(term.toLowerCase()))){
                results.push(value);
            };
        };
    };
    res.json(results);
});

app.get("/random", (req: Request, res: Response) => {
    let randomNumber: Array<number> = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10000));
    const results: Array<Poem> = [];

    for (const number of randomNumber){
        const poem: Poem | undefined = dataParsed[number];
        if(poem){
            results.push(poem);
        };
    };
    res.json(results);
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
});