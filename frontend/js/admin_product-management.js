"use strict";

(function ($) {
  $(document).ready(function () {
    $.ajax({
      url: "http://localhost:3000/api/products",
      method: "GET",
      dataType: "json",
      success: function (data) {
        // Assuming the response is an array of products
        localStorage.setItem("products", JSON.stringify(data));
        console.log(data);
      },
      error: function (error) {
        console.error("Error fetching products's information:", error);
      },
    });
    let products = JSON.parse(localStorage.getItem("products"));

    // Reference to the table body where cart items will be displayed
    let $tableBody = $(".cart-table tbody");
    $tableBody.empty();

    // Function to update localStorage and table display
    function updateTableDisplay() {
      $tableBody.empty();

      // Loop through each cart item and display it in the table
      $.each(products, function (index, product) {
        if (product.status === 1) {
          let $row = $("<tr>");

          let $productCol = $('<td class="product-col">').html(
            `<img src="${product.img_2}" alt="${product.name}" />`
          );

          // name
          let $nameCol = $('<td class="phone-col">').text(`${product.name}`);

          // phone
          let $priceCol = $('<td class="quantity-col">').text(
            `${product.price}`
          );
          // address
          let $quantCol = $('<td class="quantity-col">').text(
            `${product.quantity}`
          );
          //remove product
          let $closeCol = $('<td class="product-close">')
            .text("x")
            .css("cursor", "pointer");

          // Append all columns to the row
          $row.append($productCol, $nameCol, $priceCol, $quantCol, $closeCol);

          // Append row to the table body
          $tableBody.append($row);

          $closeCol.on("click", function () {
            if (confirm("Are you sure you want to delete this product?")) {
              $.ajax({
                url: "http://localhost:3000/api/delete_product",
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(products[index]),
                success: function (res) {
                  alert(res);
                },
              });
              products.splice(index, 1); // Remove the item from
            }
            updateTableDisplay(); // Update the localStorage and table display
          });

          $productCol.on("click", function () {
            window.location.href = "./admin_product-page.html?id=" + product.id;
          });
        }
      });
    }

    updateTableDisplay();
  });
})(jQuery);
("use strict");
