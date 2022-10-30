const connection = require("../connection/connection");

const queryExecute = (query) => {
  return new Promise((resolve, reject) => {
    try {
      connection.query(query, (err, row) => {
        if (err) reject(err);
        resolve(row);
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = queryExecute;
