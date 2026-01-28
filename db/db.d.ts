import BetterSqlite3 from "better-sqlite3";
import type { Poem } from "./../types/poem/poem.js";
interface BookmarkStatus {
    isBookmarked: number;
}
export interface SearchResults extends Poem {
    totalCount: number;
}
export declare const poemDb: BetterSqlite3.Database;
export declare function getNoOfEntries(): number;
export declare function isEmpty(): boolean;
export declare function addPoem(poem: Poem): void;
export declare function searchForPoems(searchTerms: string[], pageNumber: number): SearchResults[];
export declare function getSinglePoem(poemID: number): Poem | undefined;
export declare function getPoemsWithID(poemIDs: number[]): Poem[];
export declare function getFavouritePoems(pageNumber: number): SearchResults[];
export declare function getIsBookmarked(poemID: number): BookmarkStatus | undefined;
export declare function setIsBookmarked(poemID: number, isBookmarked: number): void;
export declare const getPoem: (index: number) => Poem | undefined;
export declare function deleteAllPoems(): void;
export {};
//# sourceMappingURL=db.d.ts.map