export interface Poem {
    id: number,
    Title: string,
    Poem: string,
    Poet: string,
    Tags: string | null,
};

export interface PoemCollection {
    [index : number]: Poem;
};