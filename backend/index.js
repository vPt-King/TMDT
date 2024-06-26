const express = require("express");
const app = express();
const port = 3000;

const cors = require("cors");
const bodyParser = require("body-parser");

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded

// const corsOptions = {
//   origin: "http://127.0.0.1:5500",
//   credentials: true,
//   //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };

// app.use(cors(corsOptions)); // Use this after the variable declaration

// Add Access Control Allow Origin headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const mysql2 = require("mysql2");

const connection = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "2112",
  database: "tmdt",
});

connection.connect(function (err) {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }

  console.log("Connected to MySQL database!");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/register", (req, res) => {
  const { email, name, password, phone, address, dob } = req.body;
  const query = `select * from tmdt.user where email ='${email}' `;
  connection.query(query, (err, result) => {
    if (err) {
      console.error("Error querying database:", err);
      return;
    }
    if (result.length !== 0) {
      return res.send(JSON.stringify("Email error"));
    }
    const query1 =
      "INSERT INTO `tmdt`.`user` (`password`, `name`, `phone`, `address`, `email`, `dob`) VALUES (" +
      `'${password}', '${name}', '${phone}', '${address}', '${email}', '${dob}');`;
    connection.query(query1, (err, results) => {
      if (err) {
        console.error("Error querying database:", err);
        return;
      }
      return res.send(JSON.stringify("Oke"));
    });
  });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const query = `select * from tmdt.user where email ='${email}' and password = '${password}'`;
  console.log(query);
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error querying database:", err);
      return;
    }
    console.log("here");
    if (results.length != 0) {
      results[0].password = "";
      return res.send(JSON.stringify(results[0]));
    } else {
      return res.send(JSON.stringify("Tài khoản hoặc mật khẩu không hợp lệ"));
    }
  });
});

app.get("/api/category", (req, res) => {
  const query = "select * from tmdt.category";
  console.log(query);
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error querying database:", err);
      return;
    }
    return res.send(JSON.stringify(results));
  });
});

app.get("/api/products_category", (req, res) => {
  const query =
    "select product.id as id_product, product.name as product_name, product.price as price, product.status as status from product, product_category, category where product.id = product_category.id_product and category.id=product_category.id_category";
  console.log(query);
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error querying database:", err);
      return;
    }
    return res.send(JSON.stringify(results));
  });
});

app.get("/api/products", (req, res) => {
  const query = "select * from product";
  console.log(query);
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error querying database:", err);
      return;
    }
    return res.send(JSON.stringify(results));
  });
});

app.get("/api/category_product", (req, res) => {
  const id = parseInt(req.query.id);

  const query = `select product.id as id, product.name as name, product.price as price, product.img_1 as img_1 from product,product_category where product_category.id_category = ${id} and product.id = product_category.id_product`;
  console.log(query);
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error querying database:", err);
      return;
    }
    return res.send(JSON.stringify(results));
  });
});

app.get("/api/product_by_id", (req, res) => {
  const id = parseInt(req.query.id);

  const query = `select product.id as id, product.name as name, product.price as price, product.img_1 as img_1, product.img_2 as img_2, product.quantity as quantity, product.short_text as short_text, product.long_text as long_text from product where product.id = ${id}`;
  console.log(query);
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error querying database:", err);
      return;
    }
    return res.send(JSON.stringify(results));
  });
});

app.get("/api/category_of_product", (req, res) => {
  const id = parseInt(req.query.id);

  const query = `select category.name as name from category,product_category where product_category.id_product = ${id} and category.id=product_category.id_category`;
  console.log(query);
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error querying database:", err);
      return;
    }
    return res.send(JSON.stringify(results));
  });
});

app.get("/api/comment_of_product", (req, res) => {
  const id = parseInt(req.query.id);
  const query = `select user.name as name, comment.content as content from user, comment where comment.id_product=${id} and user.id=comment.id_user`;
  connection.query(query, (err, result) => {
    if (err) {
      console.error("Error querying database:", err);
      return;
    }
    return res.send(JSON.stringify(result));
  });
});

app.post("/api/add_product", (req, res) => {
  const {
    name,
    quantity,
    short_text,
    long_text,
    price,
    status,
    img_1,
    img_2,
    id_category,
  } = req.body;
  const query =
    "INSERT INTO `tmdt`.`product` (`name`, `quantity`, `short_text`,`long_text`, `img_1`,`img_2`,`price`,`status`) VALUES (" +
    `'${name}', ${quantity}, '${short_text}','${long_text}','${img_1}','${img_2}', ${price}, '${status}');`;
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error querying database:", err);
      return;
    }
    const query1 = `select id from product where name='${name}' and quantity='${quantity}' and short_text='${short_text}' and long_text='${long_text}' and img_1='${img_1}' and img_2='${img_2}' and price='${price}' and status='${status}'`;
    connection.query(query1, (err, results1) => {
      if (err) {
        console.error("Error querying database:", err);
        return;
      }
      const id_product = results1[0].id;
      const query2 =
        "INSERT INTO `tmdt`.`product_category` (`id_product`,`id_category`) VALUES (" +
        `${id_product}, ${id_category});`;
      connection.query(query2, (err, results2) => {
        if (err) {
          console.error("Error querying database:", err);
          return;
        }
        return res.send(JSON.stringify("Thêm sản phẩm thành công"));
      });
    });
  });
});

app.post("/api/add_category", (req, res) => {
  const { name } = req.body;
  const query =
    "INSERT INTO `tmdt`.`category` (`name`) VALUES (" + `'${name}');`;
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error querying database:", err);
      return;
    }
    return res.send(JSON.stringify("ok"));
  });
});

app.post("/api/add_product_to_category", (req, res) => {
  const { id_category, id_product } = req.body;
  const query =
    "INSERT INTO `tmdt`.`product_category` (`id_product`,`id_category`) VALUES (" +
    `${id_product}, ${id_category});`;
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error querying database:", err);
      return;
    }
    return res.send(JSON.stringify("ok"));
  });
});

app.post("/api/add_shipment", (req, res) => {
  const { name, price } = req.body;
  const query =
    "INSERT INTO `tmdt`.`shipment` (`name`,`price`) VALUES (" +
    `'${name}', ${price});`;
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error querying database:", err);
      return;
    }
    return res.send(JSON.stringify("ok"));
  });
});

app.post("/api/add_coupon", (req, res) => {
  const { code, price } = req.body;
  const query =
    "INSERT INTO `tmdt`.`coupon` (`name`,`price`) VALUES (" +
    `'${code}', ${price});`;
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error querying database:", err);
      return;
    }
    return res.send(JSON.stringify("ok"));
  });
});

app.post("/api/add_payment", (req, res) => {
  const { name } = req.body;
  const query =
    "INSERT INTO `tmdt`.`payment` (`name`) VALUES (" + `'${name}');`;
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error querying database:", err);
      return;
    }
    return res.send(JSON.stringify("ok"));
  });
});

app.post("/api/add_status_payment", (req, res) => {
  const { name } = req.body;
  const query =
    "INSERT INTO `tmdt`.`status_payment` (`name`) VALUES (" + `'${name}');`;
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error querying database:", err);
      return;
    }
    return res.send(JSON.stringify("ok"));
  });
});

app.post("/api/add_status_order", (req, res) => {
  const { name } = req.body;
  const query =
    "INSERT INTO `tmdt`.`status_order` (`name`) VALUES (" + `'${name}');`;
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error querying database:", err);
      return;
    }
    return res.send(JSON.stringify("ok"));
  });
});
app.post("/api/write_comment", (req, res) => {
  const { comment, id_user, id_product } = req.body;
  console.log(comment, id_user, id_product);
  const query =
    "INSERT INTO `tmdt`.`comment` (`content`, `id_user`, `id_product`) VALUES (" +
    `'${comment}', ${id_user}, ${id_product});`;
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error querying database:", err);
      return;
    }
    return res.send(JSON.stringify("Thêm bình luận thành công"));
  });
});

// user management

app.get("/api/users", (req, res) => {
  const query = `select * from user`;
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error querying database:", err);
      return;
    }
    return res.send(JSON.stringify(results));
  });
});

app.post("/api/delete_user", function (req, res) {
  const user = req.body;
  console.log("deleteUser", user.id);
  const query = `delete from user where id = ${user.id}`;
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error querying database:", err);
      return res.send(JSON.stringify("Can't delete database"));
    }
    return res.send(JSON.stringify("Delete successfully"));
  });
});

// Product management
app.post("/api/delete_product", function (req, res) {
  const product = req.body;
  console.log("deleteProduct", product.id);
  const query1 = `update product set status=0 where id = ${product.id}`;
  connection.query(query1, (err, results) => {
    if (err) {
      console.error("Error querying database:", err);
      return res.send(JSON.stringify("Can't delete database product"));
    }
    return res.send(JSON.stringify("Delete successfully"));
  });
});

// thống kê

app.post("/api/get-order-day", (req, res) => {
  const { formattedDate } = req.body;
  const query = `select count(*) as number from orders where time='${formattedDate}'`;
  connection.query(query, (err, reslt) => {
    if (err) {
      console.log(err);
      return res.send(JSON.stringify("Không thể tìm số lượng"));
    }
    return res.send(JSON.stringify(reslt));
  });
});

app.post("/api/get-order-month", (req, res) => {
  const { time } = req.body;
  const query = `SELECT count(*) as num FROM orders WHERE SUBSTRING(orders.time, 4, 9) LIKE '%${time}%';`;
  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
      return res.send(JSON.stringify("Không thể tìm số lượng"));
    }
    console.log(result);
    return res.send(JSON.stringify(result));
  });
});

app.post("/api/get-order-cancle", (req, res) => {
  const { time } = req.body;
  const query = `SELECT count(*) as num FROM orders WHERE SUBSTRING(orders.time, 4, 9) LIKE '%${time}%' and id_status=4;`;
  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
      return res.send(JSON.stringify("Không thể tìm số lượng"));
    }
    console.log(result);
    return res.send(JSON.stringify(result));
  });
});

app.post("/api/get-bar-chart", (req, res) => {
  const { time } = req.body;
  const query = `select sum(product_order.quantity)as quantity, product.name as name from product_order, orders,product where product.id = product_order.id_product and orders.id = product_order.id_order and SUBSTRING(orders.time, 4, 9) LIKE '%${time}%' group by name order by quantity desc limit 4;`;
  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
      return res.send(JSON.stringify("Không thể tìm số lượng"));
    }
    arr = [];
    result.forEach((pro) => {
      arr.push([pro.name, pro.quantity]);
    });
    console.log(arr);
    return res.send(JSON.stringify(arr));
  });
});

// check out

app.post("/api/handle-order", (req, res) => {
  const {
    id_user,
    name,
    phone,
    place,
    products,
    shipping,
    time,
    total_sum,
    status,
  } = req.body;
  const query =
    "INSERT INTO `tmdt`.`orders` (`id_user`, `name`, `phone`, `place`, `id_shipment`, `time`, `total_sum`, `id_status`) VALUES (" +
    `'${id_user}', '${name}', '${phone}', '${place}', ${shipping}, '${time}', ${total_sum}, ${status});`;
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error querying database:", err);
      return;
    }
    const query2 = `select id from orders where name='${name}' and phone='${phone}' and place='${place}' and time='${time}' and total_sum=${total_sum} and id_status=${status}`;
    connection.query(query2, (err2, res2) => {
      if (err2) {
        return res.send(JSON.stringify("Không thể thêm đơn hàng"));
      }
      const id = res2[0].id;
      console.log(id);
      addProductToTable(products, id);
      return res.send(JSON.stringify("Thêm đơn hàng thành công"));
    });
  });
});

function addProductToTable(products, id) {
  products.forEach((e) => {
    const query =
      "INSERT INTO `tmdt`.`product_order` (`id_order`, `id_product`, `quantity`) VALUES (" +
      `${id},${e.id}, ${e.product_quantity});`;
    connection.query(query, (err, res) => {
      if (err) {
        console.log("can not add");
      }
    });
  });
  products.forEach((e) => {
    console.log("hi");
    const query = `update product set quantity = ${e.newQuantity} where id = ${e.id}`;
    connection.query(query, (err, res) => {
      if (err) {
        console.log("can not add");
      }
    });
  });
}

// admin order list
app.get("/api/get-all-orders", (req, res) => {
  const query =
    "select orders.id as id, orders.name as name,orders.time as time,orders.total_sum as total_sum,status_order.name as status_order from orders,status_order where orders.id_status = status_order.id";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error querying database:", err);
      return;
    }
    return res.send(JSON.stringify(results));
  });
});

app.post("/api/get-detail-order", (req, res) => {
  const { id } = req.body;
  const query = `select orders.id as id, orders.name as name, orders.place as place, orders.phone as phone, orders.time as time, shipment.name as shipment, status_order.name as status from orders,shipment,status_order where orders.id = ${id} and orders.id_shipment = shipment.id and orders.id_status = status_order.id`;
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error querying database:", err);

      return;
    }
    return res.send(JSON.stringify(results));
  });
});

app.post("/api/del-order", (req, res) => {
  const { id } = req.body;
  const query = `update orders set id_status = 4 where id =${id}`;
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error querying database:", err);
      return;
    }
    return res.send(JSON.stringify("Hủy thành công"));
  });
});

app.post("/api/get-product-order", (req, res) => {
  const { id } = req.body;
  const query = `select product.name as name, product.price as price, product.img_1 as img_1, product_order.quantity as quantity from product, orders, product_order where orders.id = ${id} and product_order.id_order =${id} and product_order.id_product = product.id `;
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error querying database:", err);
      return;
    }
    console.log(results);
    return res.send(JSON.stringify(results));
  });
});

// get order by id user
app.post("/api/get-user-orders", (req, res) => {
  const user = req.body;
  console.log(user.id);
  const query = `select orders.id as id, orders.name as name,orders.time as time,orders.total_sum as total_sum,status_order.name as status_order from orders,status_order where id_user=${user.id} and orders.id_status = status_order.id`;
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error querying database:", err);
      return;
    }
    return res.send(JSON.stringify(results));
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
