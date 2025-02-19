import { getExpirationStatus } from "./data/expiration.js";
import { saveProducts, loadProducts } from "./data/storage.js";

// making sure that the page content loads fully before executing any js 
document.addEventListener("DOMContentLoaded", () => {
    const productForm = document.getElementById("product-form"); // grabs the form element to listen for user input
    const productList = document.getElementById("products");    // grabs the unordered list where products will be displayed


    let products = JSON.parse(localStorage.getItem("products")) || [];   // this returns a saved list of products or an empty list if none have been saved
    updateProductList();   //calls this function to display the saved products.

    productForm.addEventListener("submit", (event) => {    //this listens for when the form is submitted
        event.preventDefault();                            // prevents the page from refreshing (Default behavior of form submission)

        
        // these next four lines grabs the values from input fields and are stored in variables to create one whole object.
        const productName = document.getElementById("product-name").value;    
        const brand = document.getElementById("brand").value;
        const category = document.getElementById("category").value;
        const purchaseDate = document.getElementById("purchase-date").value;

        if (category === "") {
            alert("Please select a category before submitting.");    // in case the user tries to submit a product form without adding the category
                   return;        
                }

        //now that we have all of the pieces of the user's input, we can create one whole object to represent a product

        const product = {
            name: productName,
            brand: brand,
            category: category,
            purchaseDate: purchaseDate
        };

        products.push(product);   // pushes a new product to the products array 
        localStorage.setItem("products", JSON.stringify(products));   // saves the updated array to LocalStorage using JSON.stringify() - Local storage can't store objects, so we make it into a string instead
        updateProductList();   // call a function to refresh the product list
        productForm.reset();   // resets the form so input fields are cleared
    });


    function updateProductList() {
        productList.innerHTML = "";    ;// clears the list before adding new items
        products.forEach((product, index) => {            // loops through the products array and creates a list item for each product
            const li = document.createElement("li");

            const container = document.createElement("div");
            container.classList.add("product-container");

            const info = document.createElement("div");
            info.classList.add("product-info");
            info.innerHTML = `<strong>${product.name}</strong> (${product.brand}) - ${product.category}`;  // uses template literals to display the product details

            const date = document.createElement("div");
            date.classList.add("product-date");
            date.textContent = `Purchase On: ${product.purchaseDate}`;

            const expiration = getExpirationStatus(product);
            const expirationLabel = document.createElement("span");
            expirationLabel.textContent = expiration.status;
            expirationLabel.style.backgroundColor = expiration.color;
            expirationLabel.style.color = "#fff";
            expirationLabel.style.padding = "4px 8px";
            expirationLabel.style.borderRadius = "8px";
            expirationLabel.style.fontWeight = "bold";
            expirationLabel.style.display = "inline-block";
            expirationLabel.style.marginLeft = "10px";

            container.appendChild(info);
            container.appendChild(date);
            container.appendChild(expirationLabel);
            li.appendChild(container);
         
            // this creates a delete button for each product as well as functionality for how to handle deleted products without refreshing the page
            const deleteBtn = document.createElement("button"); 
            deleteBtn.textContent = "❌"     
            deleteBtn.addEventListener("click", () => {         //listens for user to click the delete button
                const confirmDelete = confirm("Are you sure you want to delete this product?"); //built in js function with 'OK' and 'Cancel' buttons
                if (confirmDelete) {                                 // this checks for the condition to be true and if it is... then:
                    products.splice(index, 1);                      // removes the product from the array 
                    localStorage.setItem("products", JSON.stringify(products));  // saves the updated array back into LocalStorage
                    updateProductList();                                         // calls this function to refresh the displayed list
                } 
            });

            li.appendChild(deleteBtn);   // attaches the delete button to the list
            productList.appendChild(li); // adds the list item to the <ul> product list
        });
    }
});