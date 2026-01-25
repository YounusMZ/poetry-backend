import BetterSqlite3 from "better-sqlite3";
import Database from "better-sqlite3";
import fs, { mkdirSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import type { Poem } from "./poem.js";
import { migratefromJsonOrCsv } from "./migrate.js";

interface CountResult{
    NoOfEntries : number;
}

interface BookmarkStatus {
    isBookmarked: number;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname + "/database");
if (!fs.existsSync(dbPath)) {
    mkdirSync(dbPath);
}

export const poemDb : BetterSqlite3.Database = new Database(dbPath + '/poems.db');
poemDb.prepare(`
    CREATE TABLE IF NOT EXISTS poems (
        id INTEGER PRIMARY KEY,
        Title TEXT NOT NULL,
        Poem TEXT NOT NULL,
        Poet TEXT NOT NULL,
        Tags TEXT,
        isBookmarked BOOLEAN DEFAULT FALSE
    )
`).run();

migratefromJsonOrCsv();

export function getNoOfEntries(){
    const count = poemDb.prepare(`SELECT COUNT(*) AS NoOfEntries FROM poems`).get() as CountResult;
    return count.NoOfEntries;
}

export function isEmpty(){
    const count = poemDb.prepare(`SELECT COUNT(*) AS NoOfEntries FROM poems`).get() as CountResult;
    const countNumber: boolean = count.NoOfEntries == 0 ? true : false;
    return countNumber;
}

export function addPoem(poem: Poem){
    const insertPoem = poemDb.prepare(`INSERT OR IGNORE INTO poems (id, Title, Poem, Poet, Tags) VALUES (?, ?, ?, ?, ?)`);
    insertPoem.run(poem.id, poem.Title, poem.Poem, poem.Poet, poem.Tags);
}

export function searchForPoems(searchTerms: string[]): Poem[]{
    const searchparams = searchTerms.map(term => `'%${term}%'`);
    const whereClause = searchparams.map(param => `title LIKE ${param}`).join(' AND ');
    const searchPoems = poemDb.prepare<[], Poem>(`SELECT * FROM poems WHERE ${whereClause}`).all();
    return searchPoems;
}

export function getSinglePoem(poemID: number): Poem | undefined {
    if(!isEmpty() && poemID != undefined){
        const getRandomQuery = poemDb.prepare<number, Poem>(`SELECT * FROM poems WHERE id = ?`);
        const poem = getRandomQuery.get(poemID);
        return poem;
    }
}

export function getPoemsWithID(poemIDs: number[]): Poem[] {
    if (!isEmpty()){
        const poemIDsString = poemIDs.join(", ");
        const getRandomQuery = poemDb.prepare<[], Poem>(`SELECT * FROM poems WHERE id IN (${poemIDsString})`);
        const randompoems = getRandomQuery.all();
        return randompoems;
    } else return [];
}

export function getFavouritePoems(): Poem[]{
    const getFavourites = poemDb.prepare<[], Poem>("SELECT * FROM poems WHERE isBookmarked = 1").all();
    return getFavourites;
}

export function getIsBookmarked(poemID: number): BookmarkStatus | undefined {
    const currentBookmarkStatus = poemDb.prepare<number, BookmarkStatus>("SELECT isBookmarked FROM poems WHERE id = ?").get(poemID);
    return currentBookmarkStatus;
}

export function setIsBookmarked(poemID: number, isBookmarked: number){
    const setQuery = poemDb.prepare("UPDATE poems SET isBookmarked = ? WHERE id = ?");
    setQuery.run(isBookmarked, poemID);
}

//for testing
export const getPoem = (index: number): Poem | undefined => {
    const getPoemQuery = poemDb.prepare<number, Poem>("SELECT * FROM poems WHERE id = ?")
    const poem = getPoemQuery.get(index);
    return poem;
}

export function deleteAllPoems(){
    poemDb.prepare(`DELETE FROM poems`).run();
    poemDb.prepare('DROP TABLE poems').run();
}
