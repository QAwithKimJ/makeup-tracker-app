// storage.js - Unit tests for storage.js

import { saveProducts, loadProducts } from "../data/storage.js";

// Mock LocalStorage before each test 
beforeEach(() => {
    global.localStorage = {
        store: {},
        setItem(key, value) {
            this.store[key] = JSON.stringify(value); // Mimics real LocalStorage by storing as a string 
        },
        getItem(key) {
            return this.store[key] ? this.store[key] : null; // returns stored string or null 
        },
        clear() {
            this.store = {}
        }
    };
});

// tests 

test("loadProducts retrieves stored products", () => {
    const products = [{ name: "Foundation", brand: "Fenty", category: "foundation", purchaseDate: "2024-01-01" }];
    global.localStorage.store["products"] = JSON.stringify(products);
    expect(loadProducts()).toEqual(products);
});

test("loadProducts returns an empty array when no data is stored", () => {
    global.localStorage.clear();
    expect(loadProducts()).toEqual([]);
});