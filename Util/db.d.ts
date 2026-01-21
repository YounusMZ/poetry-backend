import BetterSqlite3 from "better-sqlite3";
import type { Poem } from "./poem.js";
export declare const poemDb: BetterSqlite3.Database;
export declare function getNoOfEntries(): number;
export declare function isEmpty(): Boolean;
export declare function addPoem(poem: Poem): void;
export declare function searchForPoems(searchTerms: string[]): Poem[];
export declare function getPoemsWithID(poemIDs: number[]): Poem[];
export declare const getPoem: (index: number) => Poem | undefined;
export declare function deleteAllPoems(): void;
//# sourceMappingURL=db.d.ts.map