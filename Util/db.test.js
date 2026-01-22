import * as db from "./db.js";
import {} from "./poem.js";
import BetterSqlite3 from "better-sqlite3";
test('test isEmpty function', () => {
    if (db.isEmpty()) {
        expect(db.getNoOfEntries()).toEqual(0);
    }
    else {
        expect(db.getNoOfEntries()).toBeGreaterThan(0);
    }
});
test('test addPoem function', () => {
    const newPoemID = db.getNoOfEntries();
    const newPoem = {
        id: newPoemID,
        Title: "Traveller's Poem",
        Poem: "Poem",
        Poet: "Traveller",
        Tags: null,
        Is_bookmarked: false
    };
    db.addPoem(newPoem);
    expect(db.getPoem(newPoemID)).toEqual(newPoem);
});
test('test getPoemsWithID function', () => {
    const poemIDs = [0, 12, 14, 15, 16];
    const poems = db.getPoemsWithID(poemIDs);
    let errorFlag = false;
    for (const poem of poems) {
        if (!poemIDs.includes(poem.id)) {
            errorFlag = true;
        }
    }
    expect(errorFlag).toBe(false);
});
afterAll(() => {
    db.deleteAllPoems();
});
//# sourceMappingURL=db.test.js.map