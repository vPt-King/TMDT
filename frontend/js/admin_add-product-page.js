"use strict";

(function ($) {
  const getFileNameFromPath = function (filePath) {
    return filePath.replace(/^.*[\\\/]/, ""); // This regex extracts everything after the last slash or backslash
  };
  $("#product-image1").on("change", function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        $("#image-preview1").attr("src", e.target.result).show();
      };
      reader.readAsDataURL(file);
    }
    console.log(getFileNameFromPath($("#product-image1").val()));
  });

  $("#product-image2").on("change", function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        $("#image-preview2").attr("src", e.target.result).show();
      };
      reader.readAsDataURL(file);
    }
  });

  $("#add-product-form").on("submit", function (event) {
    event.preventDefault();
    const name = $("#product-name").val();
    const quantity = $("#quantity").val();
    const short_text = $("#short-text").val();
    const long_text = $("#long-text").val();
    const price = $("#product-price").val();
    const img_1 =
      "/frontend/cosmetic/" +
      name +
      "/" +
      getFileNameFromPath($("#product-image1").val());
    const img_2 =
      "/frontend/cosmetic/" +
      name +
      "/" +
      getFileNameFromPath($("#product-image2").val());
    const category = $("#category").val();

    const data = {
      name: name,
      quantity: quantity,
      short_text: short_text,
      long_text: long_text,
      price: price,
      status: "",
      img_1: img_1,
      img_2: img_2,
      id_category: category,
    };
    console.log(data);
    if (confirm("Are you sure you want to add new product?")) {
      $.ajax({
        url: "http://localhost:3000/api/add_product",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (res) {
          alert(res);
          window.location.href = "../frontend/admin_product-management.html";
        },
      });
    }
  });
})(jQuery);
