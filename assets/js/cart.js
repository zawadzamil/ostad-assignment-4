const cartContainer = document.querySelector("#cartContainer");
let cartArray = [];

let cartPrice = 0;
let cartDiscount = 0;
let cartTotal = 0;
let isAppliedCode = false;

const addToCart = (productId) => {
    const product = products.find((product) => product.id == productId);
    const newCart = {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
    };

    cartArray.push(newCart);
    addCartElement(product);
};

function updatePrice(productId) {
    const product = products.find((p) => p.id == productId);
    cartPrice += product.price;
    cartTotal += product.price;

    document.getElementById("cart_price").innerText = cartPrice.toFixed(2);
    document.getElementById("cart_total").innerText = cartTotal.toFixed(2);
}
function updateCartPrice() {
    cartPrice = 0;
    cartTotal = 0;
    cartArray.forEach((cartItem) => {
        const product = products.find((item) => item.id === cartItem.id);
        const itemPrice = product.price * cartItem.quantity;
        cartPrice += itemPrice;
        cartTotal += itemPrice;
    });

    setCartPrice(cartPrice, cartDiscount, cartTotal);
}
// Add to cart

document.addEventListener("DOMContentLoaded", function () {
    const addToCartButtons = document.querySelectorAll(".add_to_cart");
    addToCartButtons.forEach((button) => {
        button.addEventListener("click", function (e) {
            e.preventDefault();
            const productId = e.target.id;
            addToCart(productId);
            updatePrice(productId);
            alert("Product added successfully!");
        });
    });

    // Apply Coupon
    const applyCouponButton = document.getElementById("apply");

    applyCouponButton.addEventListener("click", (e) => {
        e.preventDefault();
        if (cartPrice > 50) {
            if (!isAppliedCode) {
                const code = document.getElementById("coupon").value;
                cartTotal = code == "OSTAD" ? cartTotal - 50 : cartTotal;
                document.getElementById("cart_total").innerText =
                    cartTotal.toFixed(2);
                document.getElementById("cart_discount").innerText = 50;
                cartDiscount = 50;
                isAppliedCode = true;
            }
        }
    });

    // Remove Cart Single Item
    cartContainer.addEventListener("click", function (e) {
        if (
            e.target.classList.contains("cart-delete-btn") ||
            e.target.closest(".cart-delete-btn")
        ) {
            const productString = e.target.id;
            const productId = parseInt(productString.match(/\d+/)[0]);

            // Remove the product from the cartArray
            cartArray = cartArray.filter((item) => item.id !== productId);

            // Update the cartPrice and cartTotal
            const productPrice = products.find((p) => p.id === productId).price;
            cartPrice -= productPrice;
            cartTotal -= productPrice;

            if (cartPrice < 50) {
                cartDiscount = 0;
                cartTotal = cartPrice;
            }

            // Update the displayed prices
            setCartPrice(cartPrice, cartDiscount, cartTotal);

            // // Remove the product element from the DOM
            // productDiv.remove();
            cartContainer.innerHTML = "";
            cartArray.forEach((product) => {
                addCartElement(product);
            });
        }

        // Plus Quantity
        if (e.target.classList.contains("plus-btn")) {
            const buttonId = e.target.id;
            const buttonIdNumber = parseInt(buttonId.match(/\d+/)[0]);
            const quantityElement = document.getElementById(
                `cart-item-quantity-${buttonIdNumber}`
            );

            const product = products.find((item) => item.id === buttonIdNumber);

            let currentQuantity = parseInt(quantityElement.textContent);
            currentQuantity++;
            quantityElement.textContent = currentQuantity;

            let currentCartItemPrice = document.getElementById(
                `cart-item-price-${buttonIdNumber}`
            );

            currentCartItemPrice.textContent = `$${(
                product.price * currentQuantity
            ).toFixed(2)}`;

            cartPrice += product.price;
            cartTotal += product.price;
            console.log(cartDiscount);

            setCartPrice(cartPrice, cartDiscount, cartTotal);
        }

        // Minus Quantity
        if (e.target.classList.contains("minus-btn")) {
            const buttonId = e.target.id;
            const buttonIdNumber = parseInt(buttonId.match(/\d+/)[0]);
            const quantityElement = document.getElementById(
                `cart-item-quantity-${buttonIdNumber}`
            );

            const product = products.find((item) => item.id === buttonIdNumber);

            let currentQuantity = parseInt(quantityElement.textContent);
            if (currentQuantity > 1) {
                currentQuantity--;
                quantityElement.textContent = currentQuantity;

                let currentCartItemPrice = document.getElementById(
                    `cart-item-price-${buttonIdNumber}`
                );

                currentCartItemPrice.textContent = `$${(
                    product.price * currentQuantity
                ).toFixed(2)}`;

                cartPrice -= product.price;
                cartTotal -= product.price;

                setCartPrice(cartPrice, cartDiscount, cartTotal);
            }
        }
    });

    // Clear Cart
    const clearCartButton = document.getElementById("remove_all");
    clearCartButton.addEventListener("click", () => {
        cartContainer.innerHTML = "";
        cartPrice = 0;
        cartDiscount = 0;
        cartTotal = 0;
        setCartPrice(cartPrice, cartDiscount, cartTotal);
    });
});

function addCartElement(product) {
    const cartItem = document.createElement("div");
    cartItem.classList.add(
        `cart-item-${product.id}`,
        "border-bottom",
        "mb-2",
        "border-dark"
    );

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
    minusButton.classList.add(
        "btn",
        "btn-sm",
        "btn-danger",
        "minus-btn",
        "px-2",
        "mx-2"
    );
    minusButton.id = `minusBtn-${product.id}`;
    minusButton.innerHTML = "-";

    // Create the quantity text
    const quantityText = document.createElement("span");
    quantityText.classList.add("cart-item-quantity", "fs-", "px-4");
    quantityText.id = `cart-item-quantity-${product.id}`;
    quantityText.textContent = "1";

    // Create the plus button
    const plusButton = document.createElement("button");
    plusButton.classList.add("btn", "btn-sm", "btn-danger", "plus-btn");
    plusButton.innerHTML = "+";
    plusButton.id = `plusButton-${product.id}`;

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
    priceText.id = `cart-item-price-${product.id}`;
    priceText.textContent = `$${product.price}`;

    // Create the delete button
    const deleteButton = document.createElement("button");
    deleteButton.classList.add(
        "btn",
        "btn-sm",
        "btn-danger",
        "cart-delete-btn",
        "float-right"
    );
    deleteButton.innerHTML = "Remove";
    deleteButton.id = `delete-btn-${product.id}`;

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
}

function setCartPrice(cartPrice, cartDiscount, cartTotal) {
    document.getElementById("cart_price").innerText = cartPrice.toFixed(2);
    document.getElementById("cart_total").innerText = cartTotal.toFixed(2);
    document.getElementById("cart_discount").innerHTML =
        cartDiscount.toFixed(2);
}
