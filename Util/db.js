import BetterSqlite3 from "better-sqlite3";
import Database from "better-sqlite3";
import fs, { mkdirSync } from "fs";
import path from "path";
const dbPath = path.join("./../database");
if (!fs.existsSync(dbPath)) {
    mkdirSync(dbPath);
}
export const poemDb = new Database(dbPath + '/poems.db');
poemDb.prepare(`
    CREATE TABLE IF NOT EXISTS poems (
        id INTEGER PRIMARY KEY,
        Title TEXT NOT NULL,
        Poem TEXT NOT NULL,
        Poet TEXT NOT NULL,
        Tags TEXT
    )
`).run();
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
    const insertPoem = poemDb.prepare(`INSERT OR IGNORE INTO poems (id, Title, Poem, Poet, Tags) VALUES (?, ?, ?, ?, ?)`);
    insertPoem.run(poem.id, poem.Title, poem.Poem, poem.Poet, poem.Tags);
}
export function searchForPoems(searchTerms) {
    const searchparams = searchTerms.map(term => `'%${term}%'`);
    const whereClause = searchparams.map(param => `title LIKE ${param}`).join(' AND ');
    const searchPoems = poemDb.prepare(`SELECT * FROM poems WHERE ${whereClause}`).all();
    return searchPoems;
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