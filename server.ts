import express  from "express";
import type { Request, Response } from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import favicon from "serve-favicon";
import * as db from "./Util/db.js"
import type { Poem, BookmarkStatus } from "./Util/poem.js";
import { parseJsonOrCsv, migratePoemstoDb } from "./Util/migrate_tools/migratetools.js";

const app = express();
const port: number = Number(process.env.PORT) || 3000;
app.use(cors());
app.use(express.json())

//migrate from json
if (db.isEmpty()){
    const datasetRelativePath: string | undefined = process.argv[2];
    if (datasetRelativePath){
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
const __filename = fileURLToPath(import.meta.url);
const buildDir = path.join(path.dirname(__filename), 'build/dist');
if(fs.existsSync(buildDir)) {
    app.use(express.static(buildDir));
    app.use(favicon(path.join(buildDir, "vite.svg")));
    app.get("/", (req: Request, res: Response) => {
        res.sendFile(path.join(buildDir, "index.html"));
    })
}

app.get("/poem/:id", (req: Request, res: Response) => {
    const poemIDparam = req.params.id;
    if (poemIDparam){
        const poem = db.getSinglePoem(parseInt(poemIDparam))
        res.json(poem);
        res.status(200).end();
    }
    else {
        res.status(404).end("invalid input");
    }
})

app.get("/search", (req: Request, res: Response) => {
    const bookTerms: string[] | undefined = req.query.poem?.toString().split(" ");
    let results: Array<Poem> = [];
    if (bookTerms){
        results = db.searchForPoems(bookTerms);
    }
    res.json(results);
})


app.get("/random", (req: Request, res: Response) => {
    let randomNumbers: Array<number> = Array.from({ length: 10 }, () => Math.floor(Math.random() * db.getNoOfEntries()));
    const results: Array<Poem> = db.getPoemsWithID(randomNumbers);
    res.json(results);
})

app.get("/bookmark/:id", (req: Request, res: Response) => {
    const poemIDparam = req.params.id;
    let isBookmarked = undefined;
    if (poemIDparam){
        const poemID = parseInt(poemIDparam);
        isBookmarked = db.getIsBookmarked(poemID);
    }

    if (isBookmarked){
        res.json(isBookmarked);
        res.status(200).end();
    }
    else{
        res.status(404).end();
    }   
})

app.put("/bookmark/:id", (req: Request, res: Response) => {
    const poemIDparam = req.params.id;
    const bookmarkStatus: BookmarkStatus = req.body;
    if (poemIDparam){
        const poemID = parseInt(poemIDparam);
        db.setIsBookmarked(poemID, bookmarkStatus.isBookmarked)

        return res.status(200).end();
    }
    else{
        return res.status(400).end()
    }
})

app.get("/favourites", (req: Request, res: Response) => {
    let results: Poem[] = db.getFavouritePoems();
    if(results){
        res.json(results);
    }
    else{
        res.status(404)
        res.end();
    }
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
})