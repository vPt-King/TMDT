"use strict";

(function ($) {
  $(document).ready(function () {
    // Retrieve cart items from localStorage
    let cartItems = JSON.parse(localStorage.getItem("cart_products"));
    console.log(cartItems);
    // Reference to the table body where cart items will be displayed
    let $tableBody = $(".cart-table tbody");

    // References to total, subtotal, shipping, and total-cart elements
    let $subtotalElem = $(".sub-total");
    let $shippingElem = $(".shipping");
    let $totalCartElem = $(".total-cart-p");

    // Clear previous cart items
    $tableBody.empty();

    let shipping = [
      {
        id: 1,
        name: "Free",
        value: 0,
      },
      {
        id: 2,
        name: "Fast",
        value: 10,
      },
      {
        id: 3,
        name: "Rocket",
        value: 20,
      },
    ];
    let shippingCost = 0;

    // $.ajax({
    //   url: "https://api.example.com/products",
    //   method: "GET",
    //   dataType: "json",
    //   success: function (data) {
    //     // Assuming the response is an array of products
    //     shipping = data;
    //   },
    //   error: function (error) {
    //     console.error("Error fetching products:", error);
    //   },
    // });

    // Function to update localStorage and table display
    function updateCartDisplay() {
      localStorage.setItem("cart_products", JSON.stringify(cartItems));
      $tableBody.empty();

      let subtotal = 0;

      // Loop through each cart item and display it in the table
      $.each(cartItems, function (index, item) {
        let $row = $("<tr>");

        // Product image and title
        let $productCol = $('<td class="product-col">').html(`
        <img src="${item.img_2}" alt="${item.name}" />
        <div class="p-title">
          <h5>${item.name}</h5>
        </div>
      `);

        // Product price
        let $priceCol = $('<td class="price-col">').text(`${item.price}`);

        // Product quantity
        let $quantityCol = $('<td class="quantity-col">').html(`
        <div class="product-quantity">
          <div class="pro-qty">
            <input id="quantity-${item.id}" type="text" value="${item.product_quantity}" />
          </div>
        </div>
      `);

        // Total price
        let $totalCol = $('<td class="total">').text(
          `${(item.price * item.product_quantity).toFixed(0)}`
        );

        // Add to subtotal
        subtotal += item.price * item.product_quantity;

        // Product close (remove from cart)
        let $closeCol = $('<td class="product-close">')
          .text("x")
          .css("cursor", "pointer");

        // Append all columns to the row
        $row.append($productCol, $priceCol, $quantityCol, $totalCol, $closeCol);

        // Append row to the table body
        $tableBody.append($row);

        $closeCol.on("click", function () {
          cartItems.splice(index, 1); // Remove the item from cartItems array
          updateCartDisplay(); // Update the localStorage and table display
        });
      });

      // Calculate the total cart value
      let totalCart = subtotal + shippingCost;

      // Update the subtotal, shipping, and total cart values in the HTML
      $subtotalElem.text(`${subtotal.toFixed(0)}`);
      $shippingElem.text(`${shippingCost.toFixed(0)}`);
      $totalCartElem.text(`${totalCart.toFixed(0)}`);
    }

    // Clear cart function
    function clearCart() {
      cartItems = [];
      updateCartDisplay();
    }

    function displayShipping() {
      let $shippingContainer = $(".chose-shipping");
      $shippingContainer.empty();

      shipping.forEach(function (option) {
        let id = `${option.id}`;
        let $csItem = $("<div>").addClass("cs-item");
        let $input = $("<input>")
          .attr("type", "radio")
          .attr("name", "cs")
          .attr("id", id)
          .attr("value", option.value);
        let $label = $("<label>")
          .attr("for", id)
          .text(`${option.name} $${option.value}`);
        if (option.id === 1) {
          $label.addClass("active"); // Add 'active' class to the first option
        }
        $csItem.append($input).append($label);
        $shippingContainer.append($csItem);
      });
      $("input[name='cs']").on("change", function () {
        shippingCost = parseFloat($(this).val());
        updateCartDisplay();

        // Remove 'active' class from all labels
        $(".chose-shipping label").removeClass("active");
        // Add 'active' class to the selected label
        $(this).next("label").addClass("active");
      });
    }

    // Add click event handler for Clear Cart button
    $(".clear-btn").on("click", function () {
      clearCart();
    });
    $(".update-btn").on("click", function () {
      let canUpdate = true;

      $.each(cartItems, function (index, product) {
        const new_quantity = parseInt($("#quantity-" + product.id).val());
        if (new_quantity > product.product_quantity) {
          canUpdate = false;
          alert("Sản phẩm không đủ số lượng");
          return false; // break out of the loop
        } else if (new_quantity <= 0) {
          canUpdate = false;
          alert("Sản phẩm không hợp lệ");
          return false; // break out of the loop
        } else {
          product.product_quantity = new_quantity;
        }
      });

      if (canUpdate) {
        localStorage.setItem("cart_products", JSON.stringify(cartItems));
        window.location.reload();
      }
    });

    // Initial display of cart items
    displayShipping();
    updateCartDisplay();
  });
})(jQuery);
