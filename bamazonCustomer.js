var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "nadia726!",
    database: "bamazon_DB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    console.log("Check Out Today's Specials");

});


connection.query("SELECT * FROM products WHERE stock > 0", function (err, results) {
    if (err) throw err;
    console.log("All of the following are on sale with your Price Plus Card:")
    for (var i = 0; i < results.length; i++) {
        console.log(
            "-----------------------------------",
            "\nProduct ID: " + results[i].item_id,
            "\nProduct Name:  " + results[i].product_name,
            "\nProduct Price: " + results[i].price,
            "\n-----------------------------------");
    }
    inquirer.prompt([
        {
            name: "selection",
            type: "input",
            message: "Enter a product ID to complete your purchase."
        },
        {
            name: "qty",
            type: "input",
            message: "How many would you like to buy?"
        }
    ]).then(function(answer) {
        var chosen;
        var orderQty = parseInt(answer.qty);
        for (var x = 0; x < results.length; x++) {
            if (results[x].item_id == answer.selection) {
                chosen = results[x];
            } 
        }
        if (chosen.stock < orderQty) {
            console.log("Sorry, Looks like we'll after to order more.");
            connection.end();
        } else {
            var stockQty = chosen.stock;
            stockQty -= orderQty;
            connection.query("UPDATE products SET ? WHERE ?", [{
                stock: stockQty
            }, {
                item_id: chosen.item_id
            }], function(error) {
                if (error) throw error;
                console.log(
                    
                    "\n\tYour total came to $" + chosen.price * orderQty + ". Thank you. Come Again!"
                    );
                    connection.end();
            }) 
        }

});
});