import express from "express";
import type { Request, Response } from "express";
import papa from "papaparse";
import fs from "fs";

const app = express();
const port : number = 3001;

app.get("/search", (req: Request, res: Response) => {
    let csvParsed : Object = {};
    const csvFile : string = fs.readFileSync("./PoetryFoundationData.csv", 'utf8');
    papa.parse(csvFile, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
            csvParsed = results.data;
        }
    })
    console.log(csvParsed)
})

app.listen(port);