export interface Poem {
    index: string;
    Title: string;
    Poem: string;
    Poet: string;
    Tags: string | null;
}
export interface SearchResult {
    [index: number]: Poem;
}
//# sourceMappingURL=poem.d.ts.map