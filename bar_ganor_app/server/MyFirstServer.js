const express = require("express");
const bodyParser = require("body-parser");
const sql = require('./db');
const path = require("path");

const app = express();
// parse requests of contenttype: application/json
app.use(bodyParser.json());
// parse requests of contenttype: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true
}));
// simple route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/CV.html'));
    });


// set port, listen for requests
app.listen(3000, () => {
        console.log("Server is running on port 3000."
        );
});

// Create a route for getting all customers
app.get("/users", function(req, res){
    sql.query("SELECT * FROM users", (err, mysqlres) => {
        if (err) {
            console.log("error: ", err);
            res.status(400).send({message: "error in getting all customers: " + err});
            return;
        }
        console.log("got all customers...");
        res.send(mysqlres);

    });
});