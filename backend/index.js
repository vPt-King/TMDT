const express = require('express')
const app = express()
const port = 3000

const cors=require("cors");
const bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded

  
const corsOptions ={  
   origin:'http://localhost', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration
const mysql2 = require('mysql2');

const connection = mysql2.createConnection({
  host: 'mysql',
  user: 'root',
  password: 'conbo2chan',
  database: 'tmdt',
  port:'3306'
});

connection.connect(function(err) {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }

  console.log('Connected to MySQL database!');
});

app.get('/', (req, res) => {
  res.send('Hello World! 2 hahah')
})

app.post("/api/register", (req,res)=>{
  const {email,name,password,phone,address,dob} = req.body
  const query = "INSERT INTO `tmdt`.`user` (`password`, `name`, `phone`, `address`, `email`, `dob`) VALUES (" +`'${password}', '${name}', '${phone}', '${address}', '${email}', '${dob}');`;
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      return;
    }
    const query3= "select * from `tmdt`.`user` where " + `email = '${email}'`
    console.log(query3)
    connection.query(query3, (err2, results2)=>{
      if (err2) {
        console.error('Error querying database:', err);
        return;
      }
      const id = results2[0].id;
      console.log(id)
      const query2 = "INSERT INTO `tmdt`.`user_shipment` (`name`, `phone`, `address`,`id_user`) VALUES (" + `'${name}', '${phone}', '${address}',${id});`;
       console.log(query2)
      connection.query(query2, (err3, result3)=>{

        if (err3) {
          console.error('Error querying database:', err);
          return;
        }
        return res.send(JSON.stringify("Oke")); 
      })
    })
  });
})

app.post("/api/login", (req,res)=>{
  const {email,password} = req.body
  
  const query = `select * from tmdt.user where email ='${email}' and password = '${password}'`;
  console.log(query)
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      return;
    }
    console.log("here")
    if(results.length != 0)
    {
        results[0].password = "";
        return res.send(JSON.stringify(results[0]))
    }
  });
})


app.get("/api/category", (req,res)=>{
  const query = "select * from tmdt.category";
  console.log(query)
  connection.query(query, (err,results)=>{
    
    if (err) {
      console.error('Error querying database:', err);
      return;
    }
    return res.send(JSON.stringify(results))
  })
})


app.get("/api/products_category", (req,res)=>{
  const query = "select product.id as id_product, product.name as product_name, product.price as price, product.status as status from product, product_category, category where product.id = product_category.id_product and category.id=product_category.id_category";
  console.log(query)
  connection.query(query, (err,results)=>{
    
    if (err) {
      console.error('Error querying database:', err);
      return;
    }
    return res.send(JSON.stringify(results))
  })
})

app.get("/api/products", (req,res)=>{
  const query = "select * from product";
  console.log(query)
  connection.query(query, (err,results)=>{
    
    if (err) {
      console.error('Error querying database:', err);
      return;
    }
    return res.send(JSON.stringify(results))
  })
})

app.get("/api/category_product", (req,res)=>{
  const id = parseInt(req.query.id)

  const query = `select product.id as id, product.name as name, product.price as price, product.img_1 as img_1 from product,product_category where product_category.id_category = ${id} and product.id = product_category.id_product`;
  console.log(query)
  connection.query(query, (err,results)=>{
    
    if (err) {
      console.error('Error querying database:', err);
      return;
    }
    return res.send(JSON.stringify(results))
  })
})

app.get("/api/product_by_id", (req,res)=>{
  const id = parseInt(req.query.id)

  const query = `select product.id as id, product.name as name, product.price as price, product.img_1 as img_1, product.img_2 as img_2, product.quantity as quantity, product.short_text as short_text, product.long_text as long_text from product where product.id = ${id}`;
  console.log(query)
  connection.query(query, (err,results)=>{
    
    if (err) {
      console.error('Error querying database:', err);
      return;
    }
    return res.send(JSON.stringify(results))
  })
})


app.get("/api/category_of_product", (req,res)=>{
  const id = parseInt(req.query.id)

  const query = `select category.name as name from category,product_category where product_category.id_product = ${id} and category.id=product_category.id_category`;
  console.log(query)
  connection.query(query, (err,results)=>{
    
    if (err) {
      console.error('Error querying database:', err);
      return;
    }
    return res.send(JSON.stringify(results))
  })
})

app.get("/api/comment_of_product", (req,res)=>{
  const id = parseInt(req.query.id);
  const query = `select user.name as name, comment.content as content from user, comment where comment.id_product=${id} and user.id=comment.id_user`
  connection.query(query, (err, result)=> {
    if (err) {
      console.error('Error querying database:', err);
      return;
    }
    return res.send(JSON.stringify(result))
  })
})


app.post("/api/add_product", (req,res)=>{
  const {name,quantity,short_text,long_text,price,status,img_1,img_2} = req.body;
  const query = "INSERT INTO `tmdt`.`product` (`name`, `quantity`, `short_text`,`long_text`, `img_1`,`img_2`,`price`,`status`) VALUES (" + `'${name}', ${quantity}, '${short_text}','${long_text}','${img_1}','${img_2}', ${price}, '${status}');`;
  connection.query(query, (err,results)=>{
    
    if (err) {
      console.error('Error querying database:', err);
      return;
    }
    return res.send(JSON.stringify("ok"))
  })
})


app.post("/api/add_category", (req,res)=>{
  const {name} = req.body;
  const query = "INSERT INTO `tmdt`.`category` (`name`) VALUES (" + `'${name}');`;
  connection.query(query, (err,results)=>{
    
    if (err) {
      console.error('Error querying database:', err);
      return;
    }
    return res.send(JSON.stringify("ok"))
  })
})

app.post("/api/add_product_to_category", (req,res)=>{
  const {id_category, id_product} = req.body;
  const query = "INSERT INTO `tmdt`.`product_category` (`id_product`,`id_category`) VALUES (" + `${id_product}, ${id_category});`
  connection.query(query, (err,results)=>{
    if (err) {
      console.error('Error querying database:', err);
      return;
    }
    return res.send(JSON.stringify("ok"))
  })
})

app.post("/api/add_shipment", (req,res)=>{
  const {name, price} = req.body;
  const query = "INSERT INTO `tmdt`.`shipment` (`name`,`price`) VALUES (" + `'${name}', ${price});`
  connection.query(query, (err,results)=>{
    if (err) {
      console.error('Error querying database:', err);
      return;
    }
    return res.send(JSON.stringify("ok"))
  })
})

app.post("/api/add_coupon", (req,res)=>{
  const {code, price} = req.body;
  const query = "INSERT INTO `tmdt`.`coupon` (`name`,`price`) VALUES (" + `'${code}', ${price});`
  connection.query(query, (err,results)=>{
    if (err) {
      console.error('Error querying database:', err);
      return;
    }
    return res.send(JSON.stringify("ok"))
  })
})


app.post("/api/add_payment", (req,res)=>{
  const {name} = req.body;
  const query = "INSERT INTO `tmdt`.`payment` (`name`) VALUES (" + `'${name}');`
  connection.query(query, (err,results)=>{
    if (err) {
      console.error('Error querying database:', err);
      return;
    }
    return res.send(JSON.stringify("ok"))
  })
})


app.post("/api/add_status_payment", (req,res)=>{
  const {name} = req.body;
  const query = "INSERT INTO `tmdt`.`status_payment` (`name`) VALUES (" + `'${name}');`
  connection.query(query, (err,results)=>{
    if (err) {
      console.error('Error querying database:', err);
      return;
    }
    return res.send(JSON.stringify("ok"))
  })
})

app.post("/api/add_status_order", (req,res)=>{
  const {name} = req.body;
  const query = "INSERT INTO `tmdt`.`status_order` (`name`) VALUES (" + `'${name}');`
  connection.query(query, (err,results)=>{
    if (err) {
      console.error('Error querying database:', err);
      return;
    }
    return res.send(JSON.stringify("ok"))
  })
})
app.post("/api/write_comment", (req,res)=>{
  const {comment, id_user, id_product} = req.body;
  console.log(comment, id_user, id_product)
  const query = "INSERT INTO `tmdt`.`comment` (`content`, `id_user`, `id_product`) VALUES (" + `'${comment}', ${id_user}, ${id_product});`
  connection.query(query, (err,results)=>{
    if (err) {
      console.error('Error querying database:', err);
      return;
    }
    return res.send(JSON.stringify("Thêm bình luận thành công"))
  })
})




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})