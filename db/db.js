import BetterSqlite3 from "better-sqlite3";
import Database from "better-sqlite3";
import fs, { mkdirSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { migratefromJsonOrCsv } from "./../scripts/migrate/migrate.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname + "/database");
if (!fs.existsSync(dbPath)) {
    mkdirSync(dbPath);
}
export const poemDb = new Database(dbPath + '/poems.db');
poemDb.prepare(`
    CREATE TABLE IF NOT EXISTS poems (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        poem TEXT NOT NULL,
        poet TEXT NOT NULL,
        tags TEXT,
        isBookmarked BOOLEAN DEFAULT FALSE
    )
`).run();
migratefromJsonOrCsv();
export function getNoOfEntries() {
    const count = poemDb.prepare(`SELECT COUNT(*) AS NoOfEntries FROM poems`).get();
    return count.NoOfEntries;
}
export function isEmpty() {
    const count = poemDb.prepare(`SELECT COUNT(*) AS NoOfEntries FROM poems`).get();
    const countNumber = count.NoOfEntries == 0 ? true : false;
    return countNumber;
}
export function addPoem(poem) {
    const insertPoem = poemDb.prepare(`INSERT OR IGNORE INTO poems (title, poem, poet, tags) VALUES (?, ?, ?, ?)`);
    insertPoem.run(poem.title, poem.poem, poem.poet, poem.tags);
}
export function searchForPoems(searchTerms, pageNumber) {
    const noOfItems = 10;
    const offset = (pageNumber - 1) * 10;
    const searchparams = searchTerms.map(term => `'%${term}%'`);
    const titleLikeClause = searchparams.map(param => `Title LIKE ${param}`).join(' AND ');
    const poetLikeClause = searchparams.map(param => `Poet LIKE ${param}`).join(' AND ');
    const results = poemDb.prepare(`SELECT *, COUNT(*) OVER() AS totalCount FROM poems WHERE ${titleLikeClause} OR ${poetLikeClause}
        ORDER BY id DESC LIMIT ${noOfItems} OFFSET ${offset}`).all();
    return results;
}
export function getSinglePoem(poemID) {
    if (!isEmpty() && poemID != undefined) {
        const getRandomQuery = poemDb.prepare(`SELECT * FROM poems WHERE id = ?`);
        const poem = getRandomQuery.get(poemID);
        return poem;
    }
}
export function getPoemsWithID(poemIDs) {
    if (!isEmpty()) {
        const poemIDsString = poemIDs.join(", ");
        const getRandomQuery = poemDb.prepare(`SELECT * FROM poems WHERE id IN (${poemIDsString})`);
        const randompoems = getRandomQuery.all();
        return randompoems;
    }
    else
        return [];
}
export function getFavouritePoems(pageNumber) {
    const offset = (pageNumber - 1) * 10;
    const getFavourites = poemDb.prepare("SELECT *, COUNT(*) OVER() AS totalCount FROM poems WHERE isBookmarked = 1 LIMIT 10 OFFSET ?").all(offset);
    return getFavourites;
}
export function getIsBookmarked(poemID) {
    const currentBookmarkStatus = poemDb.prepare("SELECT isBookmarked FROM poems WHERE id = ?").get(poemID);
    return currentBookmarkStatus;
}
export function setIsBookmarked(poemID, isBookmarked) {
    const setQuery = poemDb.prepare("UPDATE poems SET isBookmarked = ? WHERE id = ?");
    setQuery.run(isBookmarked, poemID);
}
//for testing
export const getPoem = (index) => {
    const getPoemQuery = poemDb.prepare("SELECT * FROM poems WHERE id = ?");
    const poem = getPoemQuery.get(index);
    return poem;
};
export function deleteAllPoems() {
    poemDb.prepare(`DELETE FROM poems`).run();
}
//# sourceMappingURL=db.js.map