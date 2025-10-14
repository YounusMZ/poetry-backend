import express from "express";
import cors from "cors";
import type { Request, Response } from "express";
import papa from "papaparse";
import fs from "fs";
import type { Poem, SearchResult } from "./util/poem.js";

const app = express();
app.use(cors());
const port : number = 3000;

let csvParsed : SearchResult = {};
const csvFile : string = fs.readFileSync("./PoetryFoundationData.csv", 'utf8');
papa.parse(csvFile, {
    header: true,
    dynamicTyping: true,
    complete: (results) => {
        csvParsed = results.data as SearchResult;
    }
});

app.get("/search", (req: Request, res: Response) => {
    const bookTerms : string[] | undefined = req.query.poem?.toString().split("%20");
    const results : Array<Poem> = [];
    
    for (const [key, value] of Object.entries(csvParsed)){
        if(bookTerms){
            const title : string = String(value["Title"]).toLowerCase();
            if(bookTerms.every(term => title.includes(term.toLowerCase()))){
                results.push(value);
            };
        };
    };
    res.json(results);
});

app.get("/random", (req: Request, res: Response) => {
    let randomNumber: Array<number> = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10000));
    const results : Array<Poem> = [];

    for (const number of randomNumber){
        const poem: Poem | undefined = csvParsed[number];
        if(poem){
            results.push(poem);
        };
    };
    res.json(results);
});

app.listen(port);