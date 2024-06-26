"use strict";

(function ($) {
  $(document).ready(function () {
    const products = JSON.parse(localStorage.getItem("products"));

    const url = window.location.href.toString();
    const id = parseInt(url.split("?id=")[1]);

    const product = products.filter((obj) => {
      return obj.id === id;
    })[0];
    console.log(product);
    $("#product-name").text(product.name);
    $("#product-price").text(product.price);
    $(".product-img img").attr("src", product.img_2);
    $("#short_text").text(product.short_text);
    $("#long_text").text(product.long_text);
    $("#quantity").text(product.quantity);

    $.ajax({
      url: `http://localhost:3000/api/category_of_product?id=${id}`,
      method: "GET",
      dataType: "json",
      success: function (category) {
        $("#category").text(category[0].name);
      },
      error: function (error) {
        console.error("Error fetching category_of_product:", error);
      },
    });
  });
  // Enable editing
  $("#edit-btn").click(function () {
    $("#edit-btn").hide();
    $("#save-btn").show();

    $(
      "#product-name, #product-price, #short_text, #long_text, #quantity, #category"
    ).attr("contenteditable", "true");
  });

  // Save changes
  $("#save-btn").click(function () {
    $("#edit-btn").show();
    $("#save-btn").hide();

    $(
      "#product-name, #product-price, #short_text, #long_text, #quantity, #category"
    ).attr("contenteditable", "false");
    // localStorage.setItem("products", JSON.stringify(products));
  });
})(jQuery);
