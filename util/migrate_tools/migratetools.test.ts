import { parseJsonOrCsv, migratePoemstoDb} from "./migratetools.js";
import * as db from "./../../db/db.js";
import { type PoemCollection } from "./../../types/poem/poem.js";

beforeAll(() => {
    if(!db.isEmpty()){
        db.deleteAllPoems();
    }
})

let result: PoemCollection;

test('test initial condition of empty db', () => {
    expect(db.isEmpty()).toBe(true);
})

test('test if parsing returns non-null output', () => {
    result = parseJsonOrCsv('./PoetryData.csv');
    expect(result).toBeTruthy();
})

test('test if migration entries equal number of entries in input', () => {
    let slicedResult = Object.fromEntries(Object.entries(result).slice(0, 50));        //Move only the first 50 entries
    migratePoemstoDb(slicedResult);
    expect(db.getNoOfEntries()).toBe(50);
})

afterAll(() => {
    db.deleteAllPoems()
})