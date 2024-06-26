"use strict";

(function ($) {
  $(document).ready(function () {
    // Define an array of products
    var products = [];

    // AJAX request to get the products
    $.ajax({
      url: "http://localhost:3000/api/products",
      method: "GET",
      dataType: "json",
      success: function (data) {
        // Assuming the response is an array of products
        localStorage.setItem("products", JSON.stringify(data));
      },
      error: function (error) {
        console.error("Error fetching products:", error);
      },
    });

    products = JSON.parse(localStorage.getItem("products"));
    console.log(products);

    // Loop through products array and generate HTML
    // Function to display products based on selected category
    function displayProducts(category) {
      $("#product-list").empty(); // Clear previous products

      var displayedProducts = 0;

      products.forEach(function (product, index) {
        displayedProducts++;
        if (displayedProducts > 16) {
          return;
        }

        if (category === "*" || product.category.includes(category)) {
          var productHTML = '<div class="col-lg-3 col-sm-6 mix all">';
          productHTML +=
            '<div class="single-product-item" data-index="' + product.id + '">';
          productHTML +=
            '<figure><a href="product-page.html?id=' +
            product.id +
            '"><img src="' +
            product.img_1 +
            '" alt="" /></a>';
          productHTML +=
            '<div class="p-status">new</div></figure><div class="product-text">';
          productHTML += "<h6>" + product.name + "</h6>";
          productHTML += "<p> $" + product.price + "</p>";
          productHTML += "</div></div></div>";

          $("#product-list").append(productHTML);
        }
      });
    }

    // Display all products initially
    displayProducts("*");
  });
})(jQuery);
