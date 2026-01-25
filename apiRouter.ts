import { Router } from "express";
import type { Request, Response } from "express";
import type { Poem, BookmarkStatus } from "./Util/poem.js";
import * as db from "./Util/db.js"

export const apiRouter = Router();

apiRouter.get("/poem/:id", (req: Request, res: Response) => {
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

apiRouter.get("/search", (req: Request, res: Response) => {
    const bookTerms: string[] | undefined = req.query.poem?.toString().split(" ");
    let results: Array<Poem> = [];
    if (bookTerms){
        results = db.searchForPoems(bookTerms);
    }
    res.json(results);
})


apiRouter.get("/random", (req: Request, res: Response) => {
    let randomNumbers: Array<number> = Array.from({ length: 10 }, () => Math.floor(Math.random() * db.getNoOfEntries()));
    const results: Array<Poem> = db.getPoemsWithID(randomNumbers);
    res.json(results);
})

apiRouter.get("/bookmark/:id", (req: Request, res: Response) => {
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

apiRouter.put("/bookmark/:id", (req: Request, res: Response) => {
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

apiRouter.get("/favourites", (req: Request, res: Response) => {
    let results: Poem[] = db.getFavouritePoems();
    if(results){
        res.json(results);
    }
    else{
        res.status(404).end()
    }
})