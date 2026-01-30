export interface Poem {
    id: number;
    Title: string;
    Poem: string;
    Poet: string;
    Tags: string | null;
    isBookmarked: number;
}
export interface PoemCollection {
    [index: number]: Poem;
}
export interface SearchResults extends Poem {
    totalCount: number;
}
export interface BookmarkStatus {
    isBookmarked: number;
}
//# sourceMappingURL=poem.d.ts.map