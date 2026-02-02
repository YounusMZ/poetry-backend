export interface Poem {
    id: number;
    title: string;
    poem: string;
    poet: string;
    tags: string | null;
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