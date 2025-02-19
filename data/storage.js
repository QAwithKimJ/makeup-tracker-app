// storage.js - Handles LocalStorage interactions.
// localStorage.setItem() is being used in the app.js file, but creating a function allows reusability.

export function saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products)); // Ensure it's only stringified ONCE
}


export function loadProducts() {
    return JSON.parse(localStorage.getItem("products")) || [];
}

