var mysql = require("mysql");
require("dotenv").config();
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "coviddb",
});
connection.connect(function (error) {
  if (!!error) {
    console.log(error);
  } else {
    console.log("Connected!:)");
  }
});
module.exports = connection;
