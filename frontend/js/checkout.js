"use strict";

(function ($) {
  let cartItems = JSON.parse(localStorage.getItem("cart_products"));
  console.log(cartItems);
  let user = JSON.parse(localStorage.getItem("user"));
  let $tableBody = $(".cart-table tbody");

  function updateCartDisplay() {
    localStorage.setItem("cart_products", JSON.stringify(cartItems));
    $tableBody.empty();

    let subtotal = 0;

    // Loop through each cart item and display it in the table
    $.each(cartItems, function (index, item) {
      let $row = $("<tr>");

      // Product image and title
      let $productCol = $('<td class="product-col">').html(`
      <img src="${item.img_1}" alt="${item.name}" />
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
          <input id="quantity" type="text" disabled value="${item.product_quantity}" />
        </div>
      </div>
    `);

      // Total price
      let $totalCol = $('<td class="total">').text(
        `${(item.price * item.product_quantity).toFixed(0)}`
      );

      // Add to subtotal
      subtotal += item.price * item.product_quantity;

      // Append all columns to the row
      $row.append($productCol, $priceCol, $quantityCol, $totalCol);

      // Append row to the table body
      $tableBody.append($row);
    });
  }
  updateCartDisplay();

  $("#place-order").on("click", function () {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Add leading zero for single-digit months
    const day = String(today.getDate()).padStart(2, "0");
    const time = `${day}/${month}/${year}`;

    const name = $("#name_received").val();
    const phone = $("#phone_received").val();
    const place = $("#place_received").val();
    const products = JSON.parse(localStorage.getItem("cart_products"));
    const shipping = parseInt($('input[name="cs"]:checked').val());
    let total_sum = 0;
    $.each(products, function (index, e) {
      e.newQuantity = e.quantity - e.product_quantity;
      total_sum += e.product_quantity * e.price;
    });

    const status = 1;
    const data = {
      id_user: user.id,
      name: name,
      phone: phone,
      place: place,
      products: products,
      shipping: shipping,
      time: time,
      total_sum: total_sum,
      status: status,
    };
    console.log(data);

    $.ajax({
      url: "http://localhost:3000/api/handle-order",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: function (res) {
        alert(res);
        localStorage.removeItem("cart_products");
        window.location.href = "../frontend/order_history.html";
      },
    });
  });

  // $(document).ready(function () {
  //   // Open the modal
  //   $("#change-address-btn").click(function () {
  //     $("#address-modal").fadeIn();
  //   });

  //   // Close the modal when clicking on the cancel button
  //   $("#cancel-btn, .modal").click(function () {
  //     $("#address-modal").fadeOut();
  //   });

  //   // Prevent modal from closing when clicking inside the modal content
  //   $(".modal-content").click(function (event) {
  //     event.stopPropagation();
  //   });

  //   // Confirm button functionality (add your own logic)
  //   $("#confirm-btn").click(function () {
  //     // Add your confirmation logic here
  //     $("#address-modal").fadeOut();
  //   });
  //   updateCartDisplay();
  // });
})(jQuery);
