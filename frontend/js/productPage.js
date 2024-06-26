"use strict";

(function ($) {
  $(document).ready(function () {
    const user = JSON.parse(localStorage.getItem("user"));
    $("#commentbtn").click(function () {
      if (user) {
        const comment = $("#comment").val();
        if (comment == "") {
          alert("Bạn phải nhập nội dung bình luận");
        } else {
          let url = window.location.href.toString();
          let product_id = parseInt(url.split("?id=")[1]);
          const data = {
            comment,
            id_user: user.id,
            id_product: product_id,
          };
          $.ajax({
            url: "http://localhost:3000/api/write_comment",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function (res) {
              alert("Thêm bình luận thành công");
              window.location.reload();
            },
          });
        }
      } else {
        alert("Bạn phải đăng nhập để bình luận");
      }
    });

    const products = JSON.parse(localStorage.getItem("products"));

    function displayProducts(category) {
      $("#product-list").empty(); // Clear previous products

      var displayedProducts = 0;

      products.forEach(function (product, index) {
        displayedProducts++;
        if (displayedProducts > 4) {
          return;
        }

        if (category === "*" || product.category.includes(category)) {
          var productHTML = '<div class="col-lg-3 col-sm-6 mix all">';
          productHTML +=
            '<div class="single-product-item" data-index="' + index + '">';
          productHTML +=
            '<figure><a href="product-page.html"><img src="' +
            product.img_1 +
            '" alt="" /></a>';
          if (product.status) {
            productHTML +=
              '<div class="p-status ' +
              product.status +
              '">' +
              product.status +
              "</div>";
          }
          productHTML += '</figure><div class="product-text">';
          productHTML += "<h6>" + product.name + "</h6>";
          productHTML += "<p> $" + product.price + "</p>";
          productHTML += "</div></div></div>";

          $("#product-list").append(productHTML);
        }
      });
    }

    // Display all products initially
    displayProducts("*");

    const url = window.location.href.toString();
    const id = parseInt(url.split("?id=")[1]);

    const product = products.filter((obj) => {
      return obj.id === id;
    })[0];
    console.log(product);
    $("#product-name").text(product.name);
    $("#product-price").text("$" + product.price);
    $(".product-img img").attr("src", product.img_2);
    $("#short_text").text(product.short_text);
    $("#long_text").text(product.long_text);
    $("#product_quantity").append(product.quantity);
    var quantity = product.quantity;

    $.ajax({
      url: `http://localhost:3000/api/category_of_product?id=${id}`,
      method: "GET",
      dataType: "json",
      success: function (category) {
        $("#category_show").append(` ${category[0].name},`);
      },
      error: function (error) {
        console.error("Error fetching category_of_product:", error);
      },
    });

    $.ajax({
      url: `http://localhost:3000/api/comment_of_product?id=${id}`,
      method: "GET",
      dataType: "json",
      success: function (comments) {
        $("#show_comment").empty();
        comments.forEach(function (comment) {
          $("#show_comment").append(`
          <li>
            <div class="name"><strong>${comment.name}</strong></div>
            <div class="comment">${comment.content}</div>
          </li>
        `);
        });
      },
      error: function (error) {
        console.error("Error fetching category_of_product:", error);
      },
    });

    $("#add-to-cart").click(function (event) {
      event.preventDefault();
      if (user) {
        const id = parseInt(window.location.href.split("?id=")[1]);
        var quantityInp = parseInt($("#quantity").val());
        if (quantityInp <= 0 || !quantityInp) {
          alert("Số lượng không hợp lệ");
        } else if (quantityInp > quantity) {
          alert("Số lượng hàng không đủ");
        } else {
          product.product_quantity = quantityInp;
          let cart_products =
            JSON.parse(localStorage.getItem("cart_products")) || [];
          let isExist = false;
          let canPush = true;
          cart_products.forEach(function (prod) {
            if (prod.id === product.id) {
              if (prod.product_quantity + product.product_quantity > quantity) {
                canPush = false;
                alert("Sản phẩm không đủ số lượng");
              } else {
                isExist = true;
                prod.product_quantity += product.product_quantity;
              }
            }
          });
          if (!isExist && canPush) {
            cart_products.push(product);
          }
          localStorage.setItem("cart_products", JSON.stringify(cart_products));
          if (canPush) alert("Thêm sản phẩm thành công");
          $(".header-right a[href='./shopping-cart.html'] span").text(
            cart_products.length
          );
        }
      } else {
        alert("Bạn cần đăng nhập để thêm vào giỏ hàng");
      }
    });
  });
})(jQuery);
