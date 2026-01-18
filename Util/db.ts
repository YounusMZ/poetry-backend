import BetterSqlite3 from "better-sqlite3";
import Database from "better-sqlite3";

const db : BetterSqlite3.Database = new Database('./../database/poems.db');

db.prepare(`
    CREATE TABLE IF NOT EXISTS poem (
        Index INTEGER PRIMARY KEY,
        Title TEXT NOT NULL,
        Poem TEXT NOT NULL,
        Tags TEXT
    )    
`).run();

export default db;
