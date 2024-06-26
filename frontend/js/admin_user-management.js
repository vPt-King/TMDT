"use strict";

(function ($) {
  $(document).ready(function () {
    $.ajax({
      url: "http://localhost:3000/api/users",
      method: "GET",
      dataType: "json",
      success: function (data) {
        // Assuming the response is an array of products
        localStorage.setItem("users", JSON.stringify(data));
        console.log(data);
      },
      error: function (error) {
        console.error("Error fetching users's information:", error);
      },
    });
    let users = JSON.parse(localStorage.getItem("users"));

    // Reference to the table body where cart items will be displayed
    let $tableBody = $(".user-table tbody");
    $tableBody.empty();

    // Function to update localStorage and table display
    function updateTableDisplay() {
      $tableBody.empty();

      // Loop through each cart item and display it in the table
      $.each(users, function (index, user) {
        let $row = $("<tr>");

        // name
        let $nameCol = $("<td>").text(`${user.name}`);

        // phone
        let $phoneCol = $("<td>").text(`${user.phone}`);
        // address
        let $addressCol = $("<td>").text(`${user.address}`);
        //email
        let $emailCol = $("<td>").text(`${user.email}`);
        //password
        let $passwordCol = $("<td>").text(`${user.password}`);
        //remove user
        let $closeCol = $('<td class="user-close">')
          .text("x")
          .css("cursor", "pointer");

        // Append all columns to the row
        $row.append(
          $nameCol,
          $phoneCol,
          $addressCol,
          $emailCol,
          $passwordCol,
          $closeCol
        );

        // Append row to the table body
        $tableBody.append($row);

        $closeCol.on("click", function () {
          console.log(users[index]);
          if (confirm("Are you sure you want to delete this user?")) {
            $.ajax({
              url: "http://localhost:3000/api/delete_user",
              method: "POST",
              contentType: "application/json",
              data: JSON.stringify(users[index]),
              success: function (res) {
                alert(res);
                window.location.reload();
              },
            });
          }
          updateTableDisplay(); // Update the localStorage and table display
        });
      });
    }

    updateTableDisplay();
  });
})(jQuery);
("use strict");
