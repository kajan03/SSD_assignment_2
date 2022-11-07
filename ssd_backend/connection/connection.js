const mysql = require("mysql2");

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "x9Vkm5_mbVj*wbce",
  database: "application",
});

module.exports = connection;
