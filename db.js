const mysql = require("mysql2");

const db_connection = mysql
  .createConnection({
    host: "studmysql01.fhict.local",
    user: "dbi380931",
    database: "dbi380931",
    password: "vaskicha123",
  })
  .on("error", (err) => {
    console.log("Failed to connect to Database - ", err);
  });

module.exports = db_connection;