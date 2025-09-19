import express from "express";
import cors from "cors";
import type { Request, Response } from "express";
import papa from "papaparse";
import fs from "fs";
import type { Poem } from "./Util/poem.js";

const app = express();
app.use(cors());
const port : number = 3000;

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

    const bookTerms : string[] | undefined = req.query.book?.toString().split("%20");
    console.log(bookTerms);

    const results : Array<Poem> = [];
    //console.log(Object.entries(csvParsed));
    for (const [key, value] of Object.entries(csvParsed)){
        //console.log(key, value["Title"])
        if(bookTerms){
            for (const term of bookTerms){
                const title : string = String(value["Title"]);
                //console.log(key, title, typeof value, title.includes(term))
                if((title.includes(term)))
                    results.push(value);
            }
        }
    }
    //console.log(results[0]!["Title"]);
    res.json(results);
})

app.listen(port);