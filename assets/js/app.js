const productContainer = document.getElementById("productContainer");

// Iterate over the products array and create the product cards
products.forEach((product) => {
    // Create the elements for the product card
    const productCard = document.createElement("div");
    productCard.classList.add(
        "col-12",
        "col-sm-8",
        "col-md-6",
        "col-lg-4",
        "mt-3"
    );
    productCard.innerHTML = `
    <div class="card product-card">
      <img class="card-img product-image" src="${product.image}" alt="${product.name}">
      <div class="card-img-overlay d-flex justify-content-end">
        <a href="#" class="card-link text-danger like">
          <i class="fas fa-heart"></i>
        </a>
      </div>
      <div class="card-body">
        <h4 class="card-title">${product.name}</h4>

        <p class="card-text">${product.description}</p>
        <div class="buy d-flex justify-content-between align-items-center">
          <div class="price text-success">
            <h5 class="mt-4">${product.price}</h5>
          </div>
          <a href="#" class="btn btn-danger mt-3 add_to_cart" id="${product.id}"><i class="fas fa-shopping-cart"></i> Add to Cart</a>
        </div>
      </div>
    </div>
  `;

    // Append the product card to the product container
    productContainer.appendChild(productCard);
});
