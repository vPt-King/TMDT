"use strict";

(function ($) {
  $(document).ready(function () {
    // Define an array of products
    let products = JSON.parse(localStorage.getItem("AllProducts"));
    console.log(products);
    var productsPerLoad = 16;
    var currentIndex = 16;
    var category = "*";
    var categories = [
      {
        name: "Dresses",
      },
      {
        name: "Bags",
      },
      {
        name: "Shoes",
      },
    ];
    // AJAX request to get the products
    $.ajax({
      url: "http://localhost:3000/api/category",
      method: "GET",
      datacategory: "json",
      success: function (data) {
        // Assuming the response is an array of products
        categories = data;
      },
      error: function (error) {
        console.error("Error fetching products:", error);
      },
    });

    function displayCategory() {
      var sidebarList = $("#sidebar-list");
      sidebarList.empty(); // Clear any existing items

      categories.forEach(function (item) {
        var listItem = $("<li></li>");
        var link = $("<a></a>")
          .attr("href", "#")
          .addClass("category")
          .text(item.name);

        listItem.append(link);
        sidebarList.append(listItem);
      });
    }

    // Loop through products array and generate HTML
    // Function to display products based on selected category
    // function displayProducts(category) {
    //   $("#product-list").empty(); // Clear previous products

    //   var displayedProducts = 0;

    //   products.forEach(function (product, index) {
    //     displayedProducts++;
    //     if (displayedProducts > currentIndex) {
    //       return;
    //     }

    //     if (category === "*" || product.category.includes(category)) {
    //       var productHTML =
    //         '<div class="col-lg-3 col-sm-6 mix all ' +
    //         product.category.join(" ") +
    //         '">';
    //       productHTML +=
    //         '<div class="single-product-item" data-index="' + index + '">';
    //       productHTML +=
    //         '<figure><a href="product-page.html"><img src="' +
    //         product.image +
    //         '" alt="" /></a>';
    //       if (product.status) {
    //         productHTML +=
    //           '<div class="p-status ' +
    //           product.status +
    //           '">' +
    //           product.status +
    //           "</div>";
    //       }
    //       productHTML += '</figure><div class="product-text">';
    //       productHTML += "<h6>" + product.name + "</h6>";
    //       productHTML += "<p> $" + product.price + "</p>";
    //       productHTML += "</div></div></div>";

    //       $("#product-list").append(productHTML);
    //     }
    //   });
    // }

    // Display all initially
    displayCategory();
    displayProducts("*");

    // Attach click event listener to sidebar items
    $(".sidebar-list li a").on("click", function (e) {
      e.preventDefault();
      category = $(this).text();
      console.log(category);
      displayProducts(category);
    });

    // When a user clicks on a product
    $(".single-product-item").click(function () {
      var productIndex = $(this).data("index"); // Get the index of the clicked product
      console.log(productIndex);
      var product = products[productIndex]; // Get the product object from the products array
      localStorage.setItem("selectedProduct", JSON.stringify(product)); // Store the selected product in local storage
    });

    // Load more products when button is clicked
    $(".primary-btn").click(function (e) {
      e.preventDefault();
      currentIndex += productsPerLoad;
      displayProducts(category);

      //   Hide the "Load More" button if all products are displayed
      if (currentIndex >= products.length) {
        $(".primary-btn").hide();
      }
    });
  });
})(jQuery);
