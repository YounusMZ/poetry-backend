import { Router } from "express";
import type { Request, Response } from "express";
import type { Poem, SearchResults, BookmarkStatus } from "./../types/poem/poem.js";
import * as db from "./../db/db.js";

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
    const bookTerms: string[] | undefined = req.query.poem?.toString().split("+");
    const pageNumberString: string | undefined = req.query.page?.toString();
    let results: Array<SearchResults> = [];
    if (bookTerms && pageNumberString){
        const pageNumber = parseInt(pageNumberString);
        if (pageNumber){
            results = db.searchForPoems(bookTerms, pageNumber);
            res.json(results);
        }
        else {
            res.status(404).end("Not Found");
        }
    }
    else {
        res.status(404).end("invalid input");
    }
})


apiRouter.get("/random", (req: Request, res: Response) => {
    let randomNumbers: Array<number> = Array.from({ length: 10 }, () => Math.floor(Math.random() * db.getNoOfEntries()));
    const results: Array<Poem> = db.getPoemsWithID(randomNumbers);
    if (results){
        res.json(results);
        res.status(200).end();
    }
    else {
        res.status(404).end()
    }
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
    else {
        res.status(404).end("Not Found");
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
    else {
        return res.status(400).end("Not Found");
    }
})

apiRouter.get("/favourites", (req: Request, res: Response) => {
    const pageNumberString: string | undefined = req.query.page?.toString();
    if(pageNumberString){
        const pageNumber = parseInt(pageNumberString);
        const results = db.getFavouritePoems(pageNumber);
        res.json(results);
    }
    else {
        res.status(404).end("Not Found");
    }
})

apiRouter.get("/poems", (req: Request, res: Response) => {
    const poemsIDparam: string[] | undefined = req.query.id?.toString().split("+");
    if (poemsIDparam){
        const poemIDs = poemsIDparam.map(poemID => parseInt(poemID))
        const results: Array<Poem> = db.getPoemsWithID(poemIDs);
        res.json(results);
        res.status(200).end();
    }
    else {
        res.status(404).end("Not Found");
    }
})