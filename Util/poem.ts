export interface Poem {
    id: number,
    Title: string,
    Poem: string,
    Poet: string,
    Tags: string | null,
    Is_bookmarked: boolean
};

export interface PoemCollection {
    [index : number]: Poem;
};