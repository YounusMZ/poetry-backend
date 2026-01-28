export interface Poem {
    id: number;
    Title: string;
    Poem: string;
    Poet: string;
    Tags: string | null;
    isBookmarked: boolean;
}
export interface PoemCollection {
    [index: number]: Poem;
}
export interface BookmarkStatus {
    isBookmarked: number;
}
//# sourceMappingURL=poem.d.ts.map