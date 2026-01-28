import { Router } from "express";
import * as db from "./../db/db.js";
export const apiRouter = Router();
apiRouter.get("/poem/:id", (req, res) => {
    const poemIDparam = req.params.id;
    if (poemIDparam) {
        const poem = db.getSinglePoem(parseInt(poemIDparam));
        res.json(poem);
        res.status(200).end();
    }
    else {
        res.status(404).end("invalid input");
    }
});
apiRouter.get("/search", (req, res) => {
    const bookTerms = req.query.poem?.toString().split("+");
    const pageNumberString = req.query.page?.toString();
    let results = [];
    if (bookTerms && pageNumberString) {
        const pageNumber = parseInt(pageNumberString);
        if (pageNumber) {
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
});
apiRouter.get("/random", (req, res) => {
    let randomNumbers = Array.from({ length: 10 }, () => Math.floor(Math.random() * db.getNoOfEntries()));
    const results = db.getPoemsWithID(randomNumbers);
    res.json(results);
});
apiRouter.get("/bookmark/:id", (req, res) => {
    const poemIDparam = req.params.id;
    let isBookmarked = undefined;
    if (poemIDparam) {
        const poemID = parseInt(poemIDparam);
        isBookmarked = db.getIsBookmarked(poemID);
    }
    if (isBookmarked) {
        res.json(isBookmarked);
        res.status(200).end();
    }
    else {
        res.status(404).end("Not Found");
    }
});
apiRouter.put("/bookmark/:id", (req, res) => {
    const poemIDparam = req.params.id;
    const bookmarkStatus = req.body;
    if (poemIDparam) {
        const poemID = parseInt(poemIDparam);
        db.setIsBookmarked(poemID, bookmarkStatus.isBookmarked);
        return res.status(200).end();
    }
    else {
        return res.status(400).end("Not Found");
    }
});
apiRouter.get("/favourites", (req, res) => {
    const pageNumberString = req.query.page?.toString();
    if (pageNumberString) {
        const pageNumber = parseInt(pageNumberString);
        const results = db.getFavouritePoems(pageNumber);
        res.json(results);
    }
    else {
        res.status(404).end("Not Found");
    }
});
//# sourceMappingURL=apiRouter.js.map