const cartContainer = document.querySelector("#cartContainer");
let cartArray = [];
const addToCart = (productId) => {
    const product = products.find((product) => product.id == productId);
    const newCart = {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
    };

    cartArray.push(newCart);
    console.log(cartArray);

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item", "border-bottom", "mb-2", "border-dark");

    // Create the row element
    const row = document.createElement("div");
    row.classList.add("row");

    // Create the column for the image
    const imageCol = document.createElement("div");
    imageCol.classList.add("col-3");

    // Create the image element
    const image = document.createElement("img");
    image.classList.add("cart-item-img", "img-fluid");
    image.src = product.image;
    image.alt = product.name;

    // Append the image to the image column
    imageCol.appendChild(image);

    // Create the column for the product details
    const detailsCol = document.createElement("div");
    detailsCol.classList.add("col-9");

    // Create the product name element
    const productName = document.createElement("h5");
    productName.classList.add("cart-item-name", "fw-normal");
    productName.textContent = product.name;

    // Create the quantity element
    const quantity = document.createElement("div");
    quantity.classList.add("quantity", "py-2");

    // Create the minus button
    const minusButton = document.createElement("button");
    minusButton.classList.add("btn", "btn-sm", "btn-danger", "minus-btn");
    minusButton.innerHTML = '<i class="fas fa-minus"></i>';

    // Create the quantity text
    const quantityText = document.createElement("span");
    quantityText.classList.add("cart-item-quantity", "fs-", "px-4");
    quantityText.textContent = "1";

    // Create the plus button
    const plusButton = document.createElement("button");
    plusButton.classList.add("btn", "btn-sm", "btn-danger");
    plusButton.innerHTML = '<i class="fas fa-plus"></i>';

    // Append the quantity elements to the quantity container
    quantity.append(minusButton, quantityText, plusButton);

    // Create the price element
    const price = document.createElement("div");
    price.classList.add("price", "py-2");

    // Create the price text
    const priceText = document.createElement("span");
    priceText.classList.add(
        "cart-item-price",
        "fs-4",
        "text-success",
        "ml-4",
        "pl-2"
    );
    priceText.textContent = `$${product.price}`;

    // Create the delete button
    const deleteButton = document.createElement("button");
    deleteButton.classList.add(
        "btn",
        "btn-sm",
        "btn-danger",
        "delete-btn",
        "float-right"
    );
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';

    // Append the price elements to the price container
    price.append(priceText, deleteButton);

    // Append the product details elements to the details column
    detailsCol.append(productName, quantity, price);

    // Append the image column and details column to the row
    row.append(imageCol, detailsCol);

    // Append the row to the cart item
    cartItem.appendChild(row);

    // Append the cart item to the cart container
    cartContainer.appendChild(cartItem);
};

const addToCartButtons = document.querySelectorAll(".add_to_cart");
addToCartButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
        e.preventDefault();
        const productId = e.target.id;
        addToCart(productId);
        alert("Product added successfully!");
    });
});
