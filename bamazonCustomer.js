var mysql = require("mysql");
var inquirer = require("inquirer");
var columnify = require('columnify')

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "arthurdoelp",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  displayItems();
});

function displayItems() {
    var query = "SELECT * FROM products";
    connection.query(query, function(err, res) {
        var headers = columnify([{
            ID: "",
            Name: "",
            Price: ""
          }]);
          console.log(headers);
        for (var i = 0; i < res.length; i++) {
        var columns = columnify([{
            ID: res[i].item_id,
            Name: res[i].product_name,
            Price: res[i].price
          }], {
              showHeaders: false,
              columnSplitter: ' | ',
              widths: {
                Name: {
                  maxLineWidth: 5
                }
              }
          });
          console.log(columns);
        }
        askID();
    });
}

function askID() {
    inquirer
    .prompt([
        {
            name: "id",
            type: "input",
            message: "What is the ID of the product you would like to buy?",
            validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              }
        },
        {
            name: "quantity",
            type: "input",
            message: "How many units of the product would you like to buy?",
            validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              }
        }])
    .then(function(answer) {
        function placeOrder() {
            var query = "SELECT * FROM products WHERE ?";
            connection.query(query, { item_id: answer.id }, function(err, res) {
              for (var i = 0; i < res.length; i++) {
                  if (parseInt(answer.quantity) < res[i].stock_quantity) {
                      console.log("Order Placed!");
                      console.log("You have purchased " + answer.quantity + " " + res[i].product_name + "(s)");
                      var quantityResult = res[i].stock_quantity - answer.quantity;
                      connection.query(
                          "UPDATE products SET ? WHERE ?",
                          [
                            {
                              stock_quantity: quantityResult
                            },
                            {
                              item_id: answer.id
                            }
                          ],
                          function(err, result) {
                              console.log(result.affectedRows + " Record has been updated!");
                          }
                      );
                      console.log(res[i].product_name + " quantity remaining: " + quantityResult);
                      console.log("Total purchase price: $" + (answer.quantity * res[i].price));
                  }
                  else {
                      console.log("Insufficient quantity! Please try again.");
                  }
              }
        
              displayItems();
            });
        }
        placeOrder();
    });
}

