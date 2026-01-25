import { Router } from "express";
import * as db from "./Util/db.js";
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
    const bookTerms = req.query.poem?.toString().split(" ");
    let results = [];
    if (bookTerms) {
        results = db.searchForPoems(bookTerms);
    }
    res.json(results);
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
        res.status(404).end();
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
        return res.status(400).end();
    }
});
apiRouter.get("/favourites", (req, res) => {
    let results = db.getFavouritePoems();
    if (results) {
        res.json(results);
    }
    else {
        res.status(404).end();
    }
});
//# sourceMappingURL=apiRouter.js.map